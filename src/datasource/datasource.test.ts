import { DataFrame, dateTime, OrgProps } from '@grafana/data';
import { DataSourceTestStatus, Messages, RequestType } from '../constants';
import { Health } from '../types';
import { DataSource } from './datasource';

/**
 * Response
 */
let frames: DataFrame = [] as any;
const response: any = {};
let getHealthResult: Health = { version: '1.0.0', commit: '', database: 'ok' };
let getOrgResult: OrgProps = { id: 1, name: 'Test' };

/**
 * Api
 */
const apiMock = {};
jest.mock('../api', () => ({
  Api: jest.fn().mockImplementation(() => apiMock),
  getAlertRulesFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  getAnnotations: jest.fn().mockImplementation(() => Promise.resolve(response)),
  getAnnotationsFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  getDataSourcesFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  getHealth: jest.fn().mockImplementation(() => Promise.resolve(getHealthResult)),
  getHealthFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  getOrg: jest.fn().mockImplementation(() => Promise.resolve(getOrgResult)),
}));

/**
 * Data Source
 */
describe('DataSource', () => {
  const instanceSettings: any = {};
  const dataSource = new DataSource(instanceSettings);

  /**
   * Time Range
   */
  const range = {
    from: dateTime(),
    to: dateTime(),
    raw: {
      from: dateTime(),
      to: dateTime(),
    },
  };

  /**
   * Query
   */
  describe('Query', () => {
    it('Should return correct data for MUTABLE frame', async () => {
      const targets = [{ refId: 'A', requestType: RequestType.ANNOTATIONS }];

      const response = (await dataSource.query({ targets, range } as any)) as any;
      const frames = response.data;
      expect(frames.length).toEqual(0);
    });

    it('Should return correct data for Alert rules frame', async () => {
      const targets = [{ refId: 'A', requestType: RequestType.ALERT_RULES }];

      const response = (await dataSource.query({ targets, range } as any)) as any;
      const frames = response.data;
      expect(frames.length).toEqual(0);
    });

    it('Should return correct data for Data Sources frame', async () => {
      const targets = [{ refId: 'A', requestType: RequestType.DATASOURCES }];

      const response = (await dataSource.query({ targets, range } as any)) as any;
      const frames = response.data;
      expect(frames.length).toEqual(0);
    });

    it('Should return correct data for Health frame', async () => {
      const targets = [{ refId: 'A', requestType: RequestType.HEALTH }];

      const response = (await dataSource.query({ targets, range } as any)) as any;
      const frames = response.data;
      expect(frames.length).toEqual(0);
    });
  });

  /**
   * Health Check
   */
  describe('testDatasource', () => {
    it('Should handle Success state', async () => {
      const result = await dataSource.testDatasource();
      expect(result).toEqual({
        status: DataSourceTestStatus.SUCCESS,
        message: `${Messages.connectedToOrg} ${getOrgResult.name}. ${Messages.version} ${getHealthResult.version}`,
      });
    });

    it('Should handle Error state', async () => {
      getHealthResult = {} as any;
      getOrgResult = {} as any;

      const result = await dataSource.testDatasource();
      expect(result).toEqual({
        status: DataSourceTestStatus.ERROR,
        message: Messages.connectionError,
      });
    });
  });
});
