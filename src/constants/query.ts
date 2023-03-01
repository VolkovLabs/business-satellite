import { Query } from '../types';
import { AnnotationType } from './annotations';
import { RequestType } from './request';

/**
 * Defaults for Query
 */
export const DefaultQuery: Partial<Query> = {
  requestType: RequestType.NONE,
  annotationType: AnnotationType.ALL,
};
