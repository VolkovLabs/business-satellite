import { lastValueFrom } from 'rxjs';
import { DataSourceInstanceSettings } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { DataSourceOptions, Health } from '../types';
import * as annotations from './annotations';

/**
 * API
 */
export class Api {
  /**
   * Constructor
   */
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {}

  /**
   * Ping
   */
  async ping(): Promise<boolean> {
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
      console.error('Get Health: API Request failed', response);
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

  /**
   * Annotations
   */
  getAnnotations = annotations.getAnnotations;
  getAnnotationsFrame = annotations.getAnnotationsFrame;
}
