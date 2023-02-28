import { lastValueFrom } from 'rxjs';
import { DataSourceInstanceSettings } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages } from '../constants';
import { DataSourceOptions, Health } from '../types';

/**
 * API
 */
export class Api {
  /**
   * Constructor
   */
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {}

  /**
   * Get Health
   */
  async getHealth(): Promise<boolean> {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        method: 'GET',
        url: `${this.instanceSettings.url}/api/health`,
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      console.error(Messages.api.getHealthFailed, response);
      return false;
    }

    /**
     * Data received
     */
    const health = response.data as Health;
    if (health.version) {
      return true;
    }

    return false;
  }
}
