import { DataQuery } from '@grafana/data';
import { RequestTypeValue } from '../constants';

/**
 * Query
 */
export interface Query extends DataQuery {
  /**
   * Request Type
   *
   * @type {RequestTypeValue}
   */
  requestType?: RequestTypeValue;
}
