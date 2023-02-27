import { Query } from './types';

/**
 * Datasource test status
 */
export enum DataSourceTestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Defaults for Query
 */
export const defaultQuery: Partial<Query> = {
  queryText: 'test',
};
