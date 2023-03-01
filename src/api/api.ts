import { lastValueFrom } from 'rxjs';
import { DataSourceInstanceSettings } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages } from '../constants';
import { DataSourceOptions, Health } from '../types';
import { notifyError } from '../utils';

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
  async getHealth(): Promise<Health | null> {
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
      notifyError([Messages.error, Messages.api.getHealthFailed]);
      console.error(response);
      return null;
    }

    /**
     * Data received
     */
    const health = response.data as Health;
    if (health.version) {
      return health;
    }

    return null;
  }
}
