import { DataSourceInstanceSettings } from '@grafana/data';
import { RequestType } from '../constants';
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

  availableRequestTypes: RequestType[];

  /**
   * Constructor
   */
  constructor(public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
    const requestTypes = [RequestType.HEALTH, RequestType.DATASOURCES, RequestType.ANNOTATIONS, RequestType.ORG_USERS];

    if (instanceSettings.jsonData.targetVersion >= 10) {
      requestTypes.push(RequestType.ALERT_RULES);
    }

    this.availableRequestTypes = requestTypes;

    this.features = {
      provisioning: {
        getAlertRules: createFeatureMethod(
          this.all.provisioning.getAlertRules,
          instanceSettings.jsonData.targetVersion >= 10
        ),
        getAlertRulesFrame: createFeatureMethod(
          this.all.provisioning.getAlertRulesFrame,
          instanceSettings.jsonData.targetVersion >= 10
        ),
      },
      annotations: {
        getAll: createFeatureMethod(this.all.annotations.getAll),
        getFrame: createFeatureMethod(this.all.annotations.getFrame),
      },
      datasources: {
        getAll: createFeatureMethod(this.all.datasources.getAll),
        getFrame: createFeatureMethod(this.all.datasources.getFrame),
      },
      health: {
        get: createFeatureMethod(this.all.health.get),
        getFrame: createFeatureMethod(this.all.health.getFrame),
      },
      org: {
        get: createFeatureMethod(this.all.org.get),
        getUsers: createFeatureMethod(this.all.org.getUsers),
        getUsersFrame: createFeatureMethod(this.all.org.getUsersFrame),
      },
    };
  }
}
