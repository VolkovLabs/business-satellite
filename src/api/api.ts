import { DataSourceInstanceSettings } from '@grafana/data';
import { satisfies } from 'compare-versions';

import { DataSourceOptions, FeatureApi, RequestType } from '../types';
import { createFeatureMethod } from '../utils';
import { Annotations } from './annotations';
import { Dashboards } from './dashboards';
import { DataSources } from './datasources';
import { Health } from './health';
import { Org } from './org';
import { Provisioning } from './provisioning';

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

    /**
     * Dashboards Api
     */
    dashboards: new Dashboards(this),
  };

  features: {
    provisioning: FeatureApi<Provisioning>;
    annotations: FeatureApi<Annotations>;
    datasources: FeatureApi<DataSources>;
    health: FeatureApi<Health>;
    org: FeatureApi<Org>;
    dashboards: FeatureApi<Dashboards>;
  };

  availableRequestTypes: RequestType[];

  /**
   * Constructor
   */
  constructor(
    public instanceSettings: DataSourceInstanceSettings<DataSourceOptions>,
    private targetInfo?: { version?: string }
  ) {
    /**
     * Available Request Types
     */
    const requestTypes = [
      RequestType.HEALTH,
      RequestType.DATASOURCES,
      RequestType.ANNOTATIONS,
      RequestType.ORG_USERS,
      RequestType.DASHBOARDS_META,
    ];

    /**
     * Target Grafana Version
     */
    const version = this.targetInfo?.version || '0.0.0';

    /**
     * Grafana Versions
     */
    const isGrafana10AndHigher = satisfies(version, '>=10.*');
    if (isGrafana10AndHigher) {
      requestTypes.push(RequestType.ALERT_RULES);
    }

    /**
     * Set Available Request Types
     */
    this.availableRequestTypes = requestTypes;

    /**
     * Available Features
     */
    this.features = {
      provisioning: {
        getAlertRules: createFeatureMethod(
          this.all.provisioning.getAlertRules,
          isGrafana10AndHigher,
          'Alert Rules are supported since Grafana 10.'
        ),
        getAlertRulesFrame: createFeatureMethod(
          this.all.provisioning.getAlertRulesFrame,
          isGrafana10AndHigher,
          'Alert Rules are supported since Grafana 10.'
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
        /**
         * Get Health should be always enabled to pass health check
         */
        get: createFeatureMethod(this.all.health.get),
        getFrame: createFeatureMethod(this.all.health.getFrame),
      },
      org: {
        get: createFeatureMethod(this.all.org.get),
        getUsers: createFeatureMethod(this.all.org.getUsers),
        getUsersFrame: createFeatureMethod(this.all.org.getUsersFrame),
      },
      dashboards: {
        getAllMeta: createFeatureMethod(this.all.dashboards.getAllMeta),
        getAllMetaFrame: createFeatureMethod(this.all.dashboards.getAllMetaFrame),
      },
    };
  }
}
