import {
  DataFrame,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
} from '@grafana/data';
import { Api } from '../api';
import { DataSourceTestStatus, Messages, RequestMode, RequestType } from '../constants';
import { DataSourceOptions, Query } from '../types';
import { VariableSupport } from './variable';

/**
 * Data Source
 */
export class DataSource extends DataSourceApi<Query, DataSourceOptions> {
  /**
   * Api
   *
   * @type {Api} api
   */
  api: Api;

  /**
   * Constructor
   */
  constructor(instanceSettings: DataSourceInstanceSettings<DataSourceOptions>) {
    super(instanceSettings);
    this.api = new Api({
      ...instanceSettings,
      jsonData: {
        ...instanceSettings.jsonData,
        targetVersion: 10,
      },
      url: instanceSettings.jsonData.requestMode === RequestMode.LOCAL ? '' : instanceSettings.url,
    });
    this.annotations = {};
    this.variables = new VariableSupport();
  }

  /**
   * Query
   */
  async query(options: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const data: DataFrame[] = [];
    const { range, dashboardUID } = options;

    /**
     * Process targets
     */
    await Promise.all(
      options.targets.map(async (target) => {
        let frames: MutableDataFrame[] = [];

        /**
         * Request Types
         */
        switch (target.requestType) {
          case RequestType.ALERT_RULES:
            frames = await this.api.features.provisioning.getAlertRulesFrame(target);
            break;
          case RequestType.ANNOTATIONS:
            frames = await this.api.features.annotations.getFrame(target, range, dashboardUID, options.scopedVars);
            break;
          case RequestType.DATASOURCES:
            frames = await this.api.features.datasources.getFrame(target);
            break;
          case RequestType.HEALTH:
            frames = await this.api.features.health.getFrame(target);
            break;
          case RequestType.ORG_USERS:
            frames = await this.api.features.org.getUsersFrame(target);
            break;
        }

        if (!frames || !frames.length) {
          return;
        }

        /**
         * Add Frames
         */
        data.push(...frames);
      })
    );

    /**
     * Return data
     */
    return { data };
  }

  /**
   * Health Check
   */
  async testDatasource() {
    /**
     * Check Health
     */
    const health = await this.api.features.health.get();
    const org = await this.api.features.org.get();

    /**
     * Connected
     */
    if (health?.version && org?.name) {
      return {
        status: DataSourceTestStatus.SUCCESS,
        message: `${Messages.connectedToOrg} ${org.name}. ${Messages.version} ${health.version}`,
      };
    }

    /**
     * Return
     */
    return {
      status: DataSourceTestStatus.ERROR,
      message: Messages.connectionError,
    };
  }
}
