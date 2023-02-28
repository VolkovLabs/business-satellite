import { DataFrame, dateTime } from '@grafana/data';
import { DataSourceTestStatus, RequestTypeValue } from '../constants';
import { DataSource } from './datasource';

/**
 * Response
 */
let frames: DataFrame = [] as any;
const response: any = {};
let pingResult = true;

/**
 * Api
 */
const apiMock = {
  getAnnotations: jest.fn().mockImplementation(() => Promise.resolve(response)),
  getAnnotationsFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
  ping: jest.fn().mockImplementation(() => Promise.resolve(pingResult)),
};

jest.mock('../api', () => ({
  Api: jest.fn().mockImplementation(() => apiMock),
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
      const targets = [{ refId: 'A', requestType: RequestTypeValue.ANNOTATIONS }];

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
        message: `Connected...`,
      });
    });

    it('Should handle Error state', async () => {
      pingResult = false;

      const result = await dataSource.testDatasource();
      expect(result).toEqual({
        status: DataSourceTestStatus.ERROR,
        message: `Error. Can't connect.`,
      });
    });
  });
});
