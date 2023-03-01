import { Query } from '../types';
import { AnnotationDashboard, AnnotationRange, AnnotationType } from './annotations';
import { RequestType } from './request';

/**
 * Defaults for Query
 */
export const DefaultQuery: Partial<Query> = {
  requestType: RequestType.NONE,
  annotationType: AnnotationType.ALL,
  annotationRange: AnnotationRange.NONE,
  annotationDashboard: AnnotationDashboard.ALL,
};
