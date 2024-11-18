import { Observable } from 'rxjs';

import { AlertingQuery, Query, RequestType } from '../types';
import { Api } from './api';

/**
 * Response
 *
 * @param response
 */
const getResponse = (response: any) =>
  new Observable((subscriber) => {
    subscriber.next(response);
    subscriber.complete();
  });

/**
 * Throw Exception Response
 */
const getErrorResponse = () =>
  new Observable(() => {
    throw new TypeError('Error');
  });

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
 * Alerting API
 */
describe('Alerting Api', () => {
  const instanceSettings: any = {};

  /**
   * Api
   */
  const api = new Api(instanceSettings, { version: '11.1.0', alertingEnabled: true });

  /**
   * Has support
   */
  describe('hasSupport', () => {
    it('Should be enabled', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({}));
      const result = await api.features.alerting.hasSupport();
      expect(result).toBeTruthy();
    });

    it('Should be disabled', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse());
      const result = await api.features.alerting.hasSupport();
      expect(result).toBeFalsy();
    });
  });

  /**
   * Get All Meta
   */
  describe('getAlerts', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: {
        data: {
          groups: [
            {
              rules: [
                {
                  alerts: [
                    {
                      labels: {},
                      activeAt: '',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      headers: {},
      url: 'http://localhost:3000/api/prometheus/grafana/api/v1/rules',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/prometheus/grafana/api/v1/rules',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
        },
        hideFromInspector: false,
      },
    };

    const alertingQuery: AlertingQuery = { state: [], limit: 10 };

    const query: Query = { refId: 'A', requestType: RequestType.ALERTING_ALERTS, alerting: alertingQuery };

    it('Should make request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      const result = await api.features.alerting.getAlerts(alertingQuery);
      expect(result).toBeTruthy();
    });

    it('Should not make request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(undefined));

      const result = await api.features.alerting.getAlerts(alertingQuery);
      expect(result).toBeTruthy();
      expect(result.length).toBe(0);
    });

    it('Should throw exception', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse());

      try {
        const result = await api.features.alerting.getAlerts(alertingQuery);
        expect(result).toThrow(TypeError);
      } catch {}
    });

    it('Should return dataFrame', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      const result = await api.features.alerting.getAlertsFrame(query);
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(6);
    });

    it('Should handle request without query', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() =>
        getResponse({
          ...response,
          data: {
            data: {
              groups: [],
            },
          },
        })
      );

      const result = await api.features.alerting.getAlertsFrame({} as any);
      expect(result?.length).toEqual(0);
    });

    it('Should handle request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() =>
        getResponse({
          ...response,
          data: {
            data: {
              groups: [],
            },
          },
        })
      );

      const result = await api.features.alerting.getAlertsFrame(query);
      expect(result?.length).toEqual(0);
    });
  });
});
