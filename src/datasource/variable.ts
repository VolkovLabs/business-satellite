import { DataSourceVariableSupport } from '@grafana/data';

import { Query } from '../types';
import { DataSource } from './datasource';

/**
 * Variable Support
 */
export class VariableSupport extends DataSourceVariableSupport<DataSource, Query> {
  constructor() {
    super();
  }
}
