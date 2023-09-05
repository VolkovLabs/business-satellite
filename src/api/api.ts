import { DataSourceInstanceSettings } from '@grafana/data';
import { DataSourceOptions } from '../types';
import { Annotations } from './annotations';
import { Provisioning } from './provisioning';
import { DataSources } from './datasources';
import { Health } from './health';
import { Org } from './org';

/**
 * API
 */
export class Api {
  /**
   * Constructor
   */
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {}

  /**
   * Provisioning Api
   */
  provisioning = new Provisioning(this);

  /**
   * Annotations Api
   */
  annotations = new Annotations(this);

  /**
   * Data Sources Api
   */
  datasources = new DataSources(this);

  /**
   * Health Api
   */
  health = new Health(this);

  /**
   * Org Api
   */
  org = new Org(this);
}
