import { DataSourceJsonData } from '@grafana/data';

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
