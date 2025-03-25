import { DataFrame, FieldType } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';

import { MESSAGES } from '../constants';
import { DashboardMeta, FavoritesType, Query, RequestType } from '../types';
import { convertToFrame, notifyError } from '../utils';
import { BaseApi } from './base';

/**
 * Dashboards Api
 */
export class Dashboards extends BaseApi {
  /**
   * Get Dashboards Meta
   */
  getMeta = async (params: Record<string, unknown>): Promise<DashboardMeta[]> => {
    /**
     * Fetch
     */
    const response = await lastValueFrom(
      getBackendSrv().fetch<DashboardMeta[]>({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/search`,
        params,
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      notifyError([MESSAGES.error, MESSAGES.api.getDashboardsMetaFailed]);
      return [];
    }

    return response.data;
  };

  /**
   * Get All Meta Frame
   */
  getAllMetaFrame = async (query: Query): Promise<DataFrame[]> => {
    /**
     * Define result
     */
    let dashboardMetas = [];

    /**
     * Configure starred parameter
     */
    const starred =
      query.dashboardFavorites === FavoritesType.FAVORITES_ONLY ||
      query.dashboardFavorites === FavoritesType.FAVORITES_WITH_DEFAULT;

    /**
     * Configure tags parameter
     */
    const tags = query.dashboardTags && !!query.dashboardTags?.length ? query.dashboardTags : [];

    /**
     * Define params
     */
    const params: Record<string, unknown> = {
      type: 'dash-db',
      starred: starred,
      tag: tags,
    };

    /**
     * Fetch meta
     */
    dashboardMetas = await this.getMeta(params);

    /**
     * If dashboardMetas return empty results we need get new request without starred dashboards
     */
    if (query.dashboardFavorites === FavoritesType.FAVORITES_WITH_DEFAULT && !dashboardMetas.length) {
      dashboardMetas = await this.getMeta({
        ...params,
        starred: false,
      });
    }

    if (!dashboardMetas.length) {
      return [];
    }

    /**
     * Create Frame
     */
    const frame = convertToFrame<DashboardMeta>({
      name: RequestType.DASHBOARDS_META,
      refId: query.refId,
      fields: [
        {
          name: 'Id',
          type: FieldType.number,
          getValue: (item) => item.id,
        },
        {
          name: 'Starred',
          type: FieldType.boolean,
          getValue: (item) => item.isStarred,
        },
        {
          name: 'UID',
          type: FieldType.string,
          getValue: (item) => item.uid,
        },
        {
          name: 'Slug',
          type: FieldType.string,
          getValue: (item) => item.slug,
        },
        {
          name: 'Sort',
          type: FieldType.number,
          getValue: (item) => item.sortMeta,
        },
        {
          name: 'Tags',
          type: FieldType.string,
          getValue: (item) => item.tags.join(','),
        },
        {
          name: 'Title',
          type: FieldType.string,
          getValue: (item) => item.title,
        },
        {
          name: 'Uri',
          type: FieldType.string,
          getValue: (item) => item.uri,
        },
        {
          name: 'URL',
          type: FieldType.string,
          getValue: (item) => item.url,
        },
      ],
      items: dashboardMetas,
    });

    return [frame];
  };
}
