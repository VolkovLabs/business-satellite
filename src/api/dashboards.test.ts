import { Observable } from 'rxjs';

import { FavoritesType, Query, RequestType } from '../types';
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
 * Dashboards API
 */
describe('Dashboards Api', () => {
  const instanceSettings: any = {};

  /**
   * Api
   */
  const api = new Api(instanceSettings);

  /**
   * Default params
   */
  const defaultParams = {
    type: 'dash-db',
    starred: false,
    tag: [],
  };

  /**
   * Get All Meta
   */
  describe('getAllMeta', () => {
    const response = {
      status: 200,
      statusText: 'OK',
      ok: true,
      data: [
        {
          id: 2,
          uid: 'Rcb6nob4k',
          title: 'Metrics',
          uri: 'db/metrics',
          url: '/d/Rcb6nob4k/metrics',
          slug: '',
          type: 'dash-db',
          tags: [],
          isStarred: false,
          sortMeta: 0,
        },
        {
          id: 3,
          uid: 'O4tc_E6Gz',
          title: 'Panels',
          uri: 'db/panels',
          url: '/d/O4tc_E6Gz/panels',
          slug: '',
          type: 'dash-db',
          tags: [],
          isStarred: false,
          sortMeta: 0,
        },
      ],
      headers: {},
      url: 'http://localhost:3000/api/datasources/proxy/1/api/search',
      type: 'basic',
      redirected: false,
      config: {
        method: 'GET',
        url: 'api/datasources/proxy/1/api/search',
        retry: 0,
        headers: {
          'X-Grafana-Org-Id': 1,
        },
        hideFromInspector: false,
      },
    };

    const query: Query = { refId: 'A', requestType: RequestType.DASHBOARDS_META };

    it('Should make request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      const result = await api.features.dashboards.getMeta(defaultParams);
      expect(result).toBeTruthy();
    });

    it('Should not make request', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(undefined));

      const result = await api.features.dashboards.getMeta(defaultParams);
      expect(result).toBeTruthy();
      expect(result.length).toBe(0);
    });

    it('Should throw exception', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getErrorResponse());

      try {
        const result = await api.features.dashboards.getMeta(defaultParams);
        expect(result).toThrow(TypeError);
      } catch {}
    });

    it('Should return dataFrame', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));
      const result = await api.features.dashboards.getAllMetaFrame(query);
      expect(result?.length).toEqual(1);
      expect(result[0].fields.length).toEqual(9);
      expect(result[0].fields[0].values).toEqual([2, 3]);
    });

    it('Should handle request with no data', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() =>
        getResponse({
          ...response,
          data: [],
        })
      );

      const result = await api.features.dashboards.getAllMetaFrame(query);
      expect(result?.length).toEqual(0);
    });

    it('Should handle query with dashboardTags', async () => {
      fetchRequestMock = jest.fn().mockImplementation(() => getResponse(response));

      const queryWithTags: Query = {
        refId: 'A',
        requestType: RequestType.DASHBOARDS_META,
        dashboardTags: ['tag1', 'tag2'],
      };

      const result = await api.features.dashboards.getAllMetaFrame(queryWithTags);

      expect(fetchRequestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            tag: ['tag1', 'tag2'],
          }),
        })
      );

      expect(result?.length).toEqual(1);
    });

    it('Should retry request without starred dashboards if first request returns empty', async () => {
      fetchRequestMock = jest
        .fn()
        /**
         * First empty req
         */
        .mockImplementationOnce(() => getResponse({ ...response, data: [] }))
        /**
         * Second req
         */
        .mockImplementationOnce(() => getResponse(response));

      const queryWithFavorites: Query = {
        refId: 'A',
        requestType: RequestType.DASHBOARDS_META,
        dashboardFavorites: FavoritesType.FAVORITES_WITH_DEFAULT,
      };

      const result = await api.features.dashboards.getAllMetaFrame(queryWithFavorites);

      /**
       * Check request with starred:true
       */
      expect(fetchRequestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            starred: true,
          }),
        })
      );

      /**
       * Check request with starred:false
       */
      expect(fetchRequestMock).toHaveBeenCalledWith(
        expect.objectContaining({
          params: expect.objectContaining({
            starred: false,
          }),
        })
      );

      expect(result?.length).toEqual(1);
    });
  });
});
