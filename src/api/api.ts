import { DataSourceInstanceSettings } from '@grafana/data';
import { DataSourceOptions } from '../types';
import { Annotations } from './annotations';
import { Provisioning } from './provisioning';
import { DataSources } from './datasources';
import { Health } from './health';
import { Org } from './org';
import { createFeatureMethod } from '../utils';

type FeatureApi<TApi> = Omit<TApi, 'api'>;

/**
 * API
 */
export class Api {
  /**
   * All
   * @protected
   */
  private all = {
    /**
     * Provisioning Api
     */
    provisioning: new Provisioning(this),

    /**
     * Annotations Api
     */
    annotations: new Annotations(this),

    /**
     * Data Sources Api
     */
    datasources: new DataSources(this),

    /**
     * Health Api
     */
    health: new Health(this),

    /**
     * Org Api
     */
    org: new Org(this),
  };

  features: {
    provisioning: FeatureApi<Provisioning>;
    annotations: FeatureApi<Annotations>;
    datasources: FeatureApi<DataSources>;
    health: FeatureApi<Health>;
    org: FeatureApi<Org>;
  };

  /**
   * Constructor
   */
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
    this.features = {
      provisioning: {
        getAlertRules: createFeatureMethod(this.all.provisioning.getAlertRules, true),
        getAlertRulesFrame: createFeatureMethod(this.all.provisioning.getAlertRulesFrame, true),
      },
      annotations: {
        getAll: createFeatureMethod(this.all.annotations.getAll, true),
        getFrame: createFeatureMethod(this.all.annotations.getFrame, true),
      },
      datasources: {
        getAll: createFeatureMethod(this.all.datasources.getAll, true),
        getFrame: createFeatureMethod(this.all.datasources.getFrame, true),
      },
      health: {
        get: createFeatureMethod(this.all.health.get, true),
        getFrame: createFeatureMethod(this.all.health.getFrame, true),
      },
      org: {
        get: createFeatureMethod(this.all.org.get, true),
        getUsers: createFeatureMethod(this.all.org.getUsers, true),
        getUsersFrame: createFeatureMethod(this.all.org.getUsersFrame, true),
      },
    };
  }
}
