import { Query } from '../types';
import { RequestTypeValue } from './request';

/**
 * Defaults for Query
 */
export const DefaultQuery: Partial<Query> = {
  requestType: RequestTypeValue.NONE,
};
