import {
  DataFrame,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
} from '@grafana/data';
import { Api, getAnnotationsFrame, getOrg } from '../api';
import { DataSourceTestStatus, Messages, RequestTypeValue } from '../constants';
import { DataSourceOptions, Query } from '../types';

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
    this.api = new Api(instanceSettings);
  }

  /**
   * Annotations
   */
  annotations = {};

  /**
   * Query
   */
  async query(options: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const data: DataFrame[] = [];

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
          case RequestTypeValue.ANNOTATIONS:
            frames = await getAnnotationsFrame(this.api, target);
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
    const isStatusOk = await this.api.getHealth();
    const org = await getOrg(this.api);

    /**
     * Connected
     */
    if (isStatusOk && org?.name) {
      return {
        status: DataSourceTestStatus.SUCCESS,
        message: `${Messages.connectedTo} ${org.name}.`,
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
