import { lastValueFrom } from 'rxjs';
import { getBackendSrv } from '@grafana/runtime';
import { Messages } from '../constants';
import { AuthKey } from '../types';
import { Api } from './api';

/**
 * Get Keys
 */
export const getKeys = async (api: Api): Promise<AuthKey[]> => {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${api.instanceSettings.url}/api/auth/keys`,
    })
  );

  /**
   * Check Response
   */
  if (!response || !response.data) {
    console.error(Messages.api.getKeysFailed, response);
    return [];
  }

  /**
   * Data received
   */
  const keys = response.data as AuthKey[];
  if (keys.length) {
    return keys;
  }

  return [];
};
