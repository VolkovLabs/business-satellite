import { DataFrame, dateTime, OrgProps } from '@grafana/data';
import { Observable } from 'rxjs';
import { DataSourceTestStatus, Messages, RequestMode, RequestType } from '../constants';
import { Health as HealthType } from '../types';
import { DataSource } from './datasource';
import { Health } from '../api/health';

/**
 * Response
 */
let frames: DataFrame = [] as any;
const response: any = {};
let getHealthResult: HealthType = { version: '1.0.0', commit: '', database: 'ok' };
let getOrgResult: OrgProps = { id: 1, name: 'Test' };

const getResponse = (response: any) =>
  new Observable((subscriber) => {
    subscriber.next(response);
    subscriber.complete();
  });

/**
 * Api
 */
const apiMock = {
  health: {
    get: jest.fn().mockImplementation(() => Promise.resolve(getHealthResult)),
    getFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  },
  org: {
    get: jest.fn().mockImplementation(() => Promise.resolve(getOrgResult)),
    getUsersFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  },
  datasources: {
    getFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  },
  annotations: {
    getAll: jest.fn().mockImplementation(() => Promise.resolve(response)),
    getFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  },
  provisioning: {
    getAlertRulesFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  },
  users: {
    getFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  },
};

jest.mock('../api', () => ({
  Api: jest.fn().mockImplementation((api: any) => {
    const health = new Health({ instanceSettings: api } as any);
    return {
      ...apiMock,
      features: {
        ...apiMock,
        health: {
          ...health,
          getFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
        },
      },
    };
  }),
}));

/**
 * Fetch request Mock
 */
let fetchRequestMock = jest.fn().mockImplementation(() => getResponse({}));

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getBackendSrv: () => ({
    fetch: fetchRequestMock,
  }),
  getAppEvents: () => ({
    publish: jest.fn().mockImplementation(() => {}),
  }),
}));

/**
 * Data Source
 */
describe('DataSource', () => {
  const instanceSettings: any = {
    jsonData: {
      requestMode: RequestMode.REMOTE,
    },
    url: '/api/grapi',
  };
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

  beforeAll(() => {
    fetchRequestMock.mockImplementation(() =>
      getResponse({
        data: getHealthResult,
      })
    );
  });

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

    it('Should return correct data for Org Users frame', async () => {
      const targets = [{ refId: 'A', requestType: RequestType.ORG_USERS }];

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
      fetchRequestMock.mockImplementationOnce(() =>
        getResponse({
          data: getHealthResult,
        })
      );
      const result = await dataSource.testDatasource();

      expect(result).toEqual({
        status: DataSourceTestStatus.SUCCESS,
        message: `${Messages.connectedToOrg} ${getOrgResult.name}. ${Messages.version} ${getHealthResult.version}`,
      });
      expect(fetchRequestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          url: instanceSettings.url + '/api/health',
        })
      );
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

    it('Should use local url', async () => {
      const localDataSource = new DataSource({
        jsonData: {
          requestMode: RequestMode.LOCAL,
          url: '',
        },
      } as any);

      await localDataSource.testDatasource();

      expect(fetchRequestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/health',
        })
      );
    });
  });
});
