import { lastValueFrom } from 'rxjs';
import { OrgProps } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages } from '../constants';
import { notifyError } from '../utils';
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
      console.error(response);
      return;
    }

    /**
     * Data received
     */
    return response.data as OrgProps;
  };
}
