import { DataFrame, dateTime, OrgProps } from '@grafana/data';
import { Observable } from 'rxjs';

import { Api } from '../api';
import { Health } from '../api/health';
import { MESSAGES } from '../constants';
import { DataSourceTestStatus, Health as HealthType, RequestMode, RequestType } from '../types';
import { DataSource } from './datasource';

/**
 * Response
 */
const frames: DataFrame = [] as any;
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
const createApiMock = () => {
  const all = {
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
    dashboards: {
      getAllMetaFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
    },
    alerting: {
      getAlertsFrame: jest.fn().mockImplementation(() => Promise.resolve(frames)),
    },
  };

  return {
    all,
    features: all,
  };
};

jest.mock('../api', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Api: jest.fn().mockImplementation(() => {
    return createApiMock();
  }),
}));

/**
 * Fetch request Mock
 */
const fetchRequestMock = jest.fn().mockImplementation(() => getResponse({}));

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
    describe('API initialization', () => {
      it('Should request target info once', async () => {
        const apiMock = createApiMock();
        jest.mocked(Api).mockImplementationOnce(() => apiMock as any);

        const targets = [{ refId: 'A', requestType: RequestType.ANNOTATIONS }];

        const datasource = new DataSource(instanceSettings);
        const promise1 = datasource.query({ targets, range } as any);
        const promise2 = datasource.query({ targets, range } as any);

        await promise1;
        await promise2;
        expect(apiMock.features.health.get).toHaveBeenCalledTimes(1);
      });

      it('Should not make query if initialization failed', async () => {
        const apiMock = createApiMock();
        jest.mocked(Api).mockImplementationOnce(() => apiMock as any);

        apiMock.features.health.get.mockResolvedValue(null);

        const datasource = new DataSource(instanceSettings);
        const targets = [{ refId: 'A', requestType: RequestType.ANNOTATIONS }];

        await datasource.query({ targets, range } as any).catch(() => null);

        expect(apiMock.features.annotations.getFrame).not.toHaveBeenCalled();
      });
    });

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

    it('Should return correct data for Dashboards Meta frame', async () => {
      const targets = [{ refId: 'A', requestType: RequestType.DASHBOARDS_META }];

      const response = (await dataSource.query({ targets, range } as any)) as any;
      const frames = response.data;
      expect(frames.length).toEqual(0);
    });

    it('Should return correct data for Alerting alerts frame', async () => {
      const targets = [{ refId: 'A', requestType: RequestType.ALERTING_ALERTS }];

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
        message: `${MESSAGES.connectedToOrg} ${getOrgResult.name}. ${MESSAGES.version} ${getHealthResult.version}`,
      });
    });

    it('Should handle Error state', async () => {
      getHealthResult = {} as any;
      getOrgResult = {} as any;

      const result = await dataSource.testDatasource();
      expect(result).toEqual({
        status: DataSourceTestStatus.ERROR,
        message: MESSAGES.connectionError,
      });
    });

    it('Should use local url', async () => {
      const instanceSettings = {
        jsonData: {
          requestMode: RequestMode.LOCAL,
          url: '',
        },
      };

      jest.mocked(Api).mockImplementationOnce((api: any) => {
        const health = new Health({ instanceSettings: api } as any);
        const apiMock = createApiMock();
        return {
          ...apiMock,
          features: {
            ...apiMock.features,
            health: {
              ...health,
            },
          },
        } as any;
      });

      const localDataSource = new DataSource(instanceSettings as any);

      await localDataSource.testDatasource();

      expect(fetchRequestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/health',
        })
      );
    });
  });
});
