import { Observable } from 'rxjs';
import { dateTime } from '@grafana/data';
import { RequestType } from '../constants';
import { getAnnotations, getAnnotationsFrame } from './annotations';
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
const getErrorResponse = (response: any) =>
  new Observable((subscriber) => {
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
 * API
 */
describe('Api', () => {
  const instanceSettings: any = {};

  /**
   * Api
   */
  const api = new Api(instanceSettings);

  /**
   * Get Annotations
   */
  describe('GetAnnotations', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: [
        {
          id: 5,
          alertId: 0,
          alertName: '',
          dashboardId: 1,
          dashboardUID: 'Rcb6nob4k',
          panelId: 2,
          userId: 0,
          newState: '',
          prevState: '',
          created: 1677686602468,
          updated: 1677686602468,
          time: 1677686216907,
          timeEnd: 1677686216907,
          text: 'Sus value',
          tags: ['value'],
          login: 'admin',
          email: 'admin@localhost',
          avatarUrl: '/avatar/46d229b033af06a191ff2267bca9ae56',
          data: {},
        },
      ],
      headers: {},
      url: 'http://localhost:3000/api/datasources/proxy/1/api/annotations',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/datasources/proxy/1/api/annotations',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
        },
        hideFromInspector: false,
      },
    };

    const query = { refId: 'A', requestType: RequestType.ANNOTATIONS };

    it('Should make getAnnotations request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      let result = await getAnnotations(api, query, range, '');
      expect(result).toBeTruthy();
    });

    it('Should not make getAnnotations request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(undefined));
      jest.spyOn(console, 'error').mockImplementation();

      let result = await getAnnotations(api, query, range, '');
      expect(result).toBeTruthy();
      expect(result.length).toBe(0);
    });

    it('Should throw exception getAnnotations request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse(response));

      try {
        let result = await getAnnotations(api, query, range, '');
        expect(result).toThrow(TypeError);
      } catch (e) {}
    });

    it('Should make getAnnotationsFrame request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      let result = await getAnnotationsFrame(api, query, range, '');
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(17);
      expect(result[0].fields[0].values.toArray()).toEqual([5]);
    });

    it('Should handle getAnnotationsFrame request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      response.data = [];
      jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(console, 'log').mockImplementation();

      let result = await getAnnotationsFrame(api, query, range, '');
      expect(result?.length).toEqual(0);
    });
  });
});
