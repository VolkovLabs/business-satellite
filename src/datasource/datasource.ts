import {
  DataFrame,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
} from '@grafana/data';
import { Api } from '../api';
import { DataSourceTestStatus, RequestTypeValue } from '../constants';
import { DataSourceOptions, Query } from '../types';

/**
 * Datasource
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
            frames = await this.api.getAnnotationsFrame(target);
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
     * Check Ping and A
     */
    const isStatusOk = await this.api.ping();

    /**
     * Return
     */
    return {
      status: isStatusOk ? DataSourceTestStatus.SUCCESS : DataSourceTestStatus.ERROR,
      message: isStatusOk ? `Connected...` : "Error. Can't connect.",
    };
  }
}
