import { lastValueFrom } from 'rxjs';
import { OrgProps } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages } from '../constants';
import { Api } from './api';

/**
 * Get Org
 */
export const getOrg = async (api: Api): Promise<OrgProps | null> => {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${api.instanceSettings.url}/api/org`,
    })
  );

  /**
   * Check Response
   */
  if (!response || !response.data) {
    console.error(Messages.api.getOrgFailed, response);
    return null;
  }

  /**
   * Data received
   */
  return response.data as OrgProps;
};
