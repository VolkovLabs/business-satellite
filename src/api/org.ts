import { lastValueFrom } from 'rxjs';
import { MutableDataFrame, OrgProps } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages, RequestType } from '../constants';
import { OrgUser, Query } from '../types';
import { convertToFrame, getFieldsForItem, notifyError } from '../utils';
import { BaseApi } from './base';

/**
 * Org Api
 */
export class Org extends BaseApi {
  /**
   * Get Org
   */
  get = async (): Promise<OrgProps | undefined> => {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/org`,
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      notifyError([Messages.error, Messages.api.getOrgFailed]);
      return;
    }

    /**
     * Data received
     */
    return response.data as OrgProps;
  };

  /**
   * Get Users
   */
  getUsers = async (): Promise<OrgUser[]> => {
    const response = await lastValueFrom(
      getBackendSrv().fetch<OrgUser[]>({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/org/users`,
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      notifyError([Messages.error, Messages.api.getUsersFailed]);
      return [];
    }

    /**
     * Data received
     */
    return response.data;
  };

  /**
   * Get Users Frame
   */
  getUsersFrame = async (query: Query): Promise<MutableDataFrame[]> => {
    const items = await this.getUsers();
    if (!items.length) {
      return [];
    }

    const frame = convertToFrame<OrgUser>({
      name: RequestType.GET_ORG_USERS,
      refId: query.refId,
      fields: getFieldsForItem(items[0]),
      items,
    });

    return [frame];
  };
}
