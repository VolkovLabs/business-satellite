import { DataSourceInstanceSettings } from '@grafana/data';
import { DataSourceOptions } from '../types';

/**
 * API
 */
export class Api {
  /**
   * Constructor
   */
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {}
}
