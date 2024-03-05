import { DataSourceJsonData } from '@grafana/data';

/**
 * Data Source test status
 */
export enum DataSourceTestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Request Mode
 */
export enum RequestMode {
  LOCAL = 'local',
  REMOTE = 'remote',
}

/**
 * JSON Options
 */
export interface DataSourceOptions extends DataSourceJsonData {
  /**
   * URL to access Grafana API
   *
   * @type {string}
   */
  url: string;

  /**
   * Request Mode
   */
  requestMode: RequestMode;
}

/**
 * Secure JSON Data
 */
export interface SecureJsonData {
  /**
   * Token
   *
   * @type {string}
   */
  token?: string;
}
