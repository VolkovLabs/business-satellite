import { DataSourceJsonData } from '@grafana/data';
import { RequestMode } from '../constants';

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

  /**
   * Target Version
   */
  targetVersion: number;
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
