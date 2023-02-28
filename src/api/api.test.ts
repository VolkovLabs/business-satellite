import { Observable } from 'rxjs';
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
}));

/**
 * API
 */
describe('Api', () => {
  const instanceSettings: any = {};

  /**
   * Api
   */
  const api = new Api(instanceSettings);

  /**
   * Ping
   */
  describe('ping', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: {
        commit: '978237e7cb',
        database: 'ok',
        version: '9.3.6',
      },
      headers: {},
      url: 'http://localhost:3000/api/datasources/proxy/1/api/health',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/datasources/proxy/1/api/health',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
          'X-Grafana-NoCache': 'true',
        },
        hideFromInspector: false,
      },
    };

    it('Should make ping request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      let result = await api.ping();
      expect(result).toBeTruthy();
    });

    it('Should handle ping failed request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({ ...response, data: 'failed' }));

      let result = await api.ping();
      expect(result).toBeFalsy();
    });

    it('Should handle ping request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse({ ...response, data: '' }));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await api.ping();
      expect(result).toBeFalsy();
    });
  });
});
