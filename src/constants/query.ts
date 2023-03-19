import { Query } from '../types';
import { AnnotationDashboard, AnnotationRange, AnnotationState, AnnotationType } from './annotations';
import { RequestType } from './request';

/**
 * Defaults for Query
 */
export const DefaultQuery: Partial<Query> = {
  annotationDashboard: AnnotationDashboard.ALL,
  annotationLimit: 100,
  annotationNewState: AnnotationState.ALL,
  annotationPattern: '',
  annotationPrevState: AnnotationState.ALL,
  annotationRange: AnnotationRange.NONE,
  annotationType: AnnotationType.ALL,
  requestType: RequestType.NONE,
};
