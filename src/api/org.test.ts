import { Observable } from 'rxjs';

import { RequestType } from '../types';
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
 * Org API
 */
describe('Org Api', () => {
  const instanceSettings: any = {};

  /**
   * Api
   */
  const api = new Api(instanceSettings);

  /**
   * Get Org
   */
  describe('GetOrg', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: {
        id: 1,
        name: 'VolkovOrg',
        address: {
          address1: '',
          address2: '',
          city: '',
          zipCode: '',
          state: '',
          country: '',
        },
      },
      headers: {},
      url: 'http://localhost:3000/api/datasources/proxy/1/api/org',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/datasources/proxy/1/api/org',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
          'X-Grafana-NoCache': 'true',
        },
        hideFromInspector: false,
      },
    };

    it('Should make getOrg request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      const result = await api.features.org.get();
      expect(result).toBeTruthy();
    });

    it('Should not make getOrg request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(undefined));

      const result = await api.features.org.get();
      expect(result).toBeFalsy();
    });

    it('Should throw exception getOrg request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse());

      try {
        const result = await api.features.org.get();
        expect(result).toThrow(TypeError);
      } catch (e) {}
    });
  });

  /**
   * Get Org Users
   */
  describe('Get Org Users', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: [
        {
          id: 1,
          name: '',
          login: 'admin',
          email: 'admin@localhost',
          avatarUrl: '/avatar/46d229b033af06a191ff2267bca9ae56',
          isAdmin: true,
          isDisabled: false,
          lastSeenAt: '2023-09-05T09:10:29Z',
          lastSeenAtAge: '1 minute',
          authLabels: ['label1', 'label2'],
        },
      ],
      headers: {},
      url: 'http://localhost:3000/api/datasources/proxy/1/api/users',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/datasources/proxy/1/api/users',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
        },
        hideFromInspector: false,
      },
    };

    const query = { refId: 'A', requestType: RequestType.ORG_USERS };

    it('Should make getUsers request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      const result = await api.features.org.getUsers();
      expect(result).toBeTruthy();
    });

    it('Should not make getUsers request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(undefined));

      const result = await api.features.org.getUsers();
      expect(result).toBeTruthy();
      expect(result.length).toBe(0);
    });

    it('Should throw exception getUsers request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse());

      try {
        const result = await api.features.org.getUsers();
        expect(result).toThrow(TypeError);
      } catch (e) {}
    });

    it('Should make getUsersFrame request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      const result = await api.features.org.getUsersFrame(query);
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(10);
    });

    it('Should handle getUsersFrame request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() =>
        getResponse({
          ...response,
          data: [],
        })
      );

      const result = await api.features.org.getUsersFrame(query);
      expect(result?.length).toEqual(0);
    });
  });
});
