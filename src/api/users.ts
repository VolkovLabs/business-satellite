import { lastValueFrom } from 'rxjs';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages, RequestType } from '../constants';
import { Query, User } from '../types';
import { convertToFrame, notifyError } from '../utils';
import { BaseApi } from './base';

/**
 * Users Api
 */
export class Users extends BaseApi {
  /**
   * Get Users
   */
  getAll = async (): Promise<User[]> => {
    const response = await lastValueFrom(
      getBackendSrv().fetch<User[]>({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/users`,
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
  getFrame = async (query: Query): Promise<MutableDataFrame[]> => {
    const items = await this.getAll();
    if (!items.length) {
      return [];
    }

    const frame = convertToFrame<User>({
      name: RequestType.USERS,
      refId: query.refId,
      fields: [
        {
          name: 'Id',
          type: FieldType.number,
          getValue: (item) => item.id,
        },
        {
          name: 'Email',
          type: FieldType.string,
          getValue: (item) => item.email,
        },
        {
          name: 'Login',
          type: FieldType.string,
          getValue: (item) => item.login,
        },
        {
          name: 'Name',
          type: FieldType.string,
          getValue: (item) => item.name,
        },
        {
          name: 'Is Admin',
          type: FieldType.boolean,
          getValue: (item) => item.isAdmin,
        },
        {
          name: 'Is Disabled',
          type: FieldType.boolean,
          getValue: (item) => item.isDisabled,
        },
        {
          name: 'Last Seen At',
          type: FieldType.time,
          getValue: (item) => item.lastSeenAt,
        },
        {
          name: 'Last Seen At Age',
          type: FieldType.string,
          getValue: (item) => item.lastSeenAtAge,
        },
        {
          name: 'Auth Labels',
          type: FieldType.string,
          getValue: (item) => item.authLabels.join(', '),
        },
        {
          name: 'Avatar Url',
          type: FieldType.string,
          getValue: (item) => item.avatarUrl,
        },
      ],
      items,
    });

    return [frame];
  };
}
