import {
  AnnotationDashboard,
  AnnotationRange,
  AnnotationState,
  AnnotationType,
  FavoritesType,
  Query,
  RequestType,
} from '../types';

/**
 * Defaults for Query
 */
export const DEFAULT_QUERY: Partial<Query> = {
  annotationDashboard: AnnotationDashboard.ALL,
  annotationLimit: 100,
  annotationNewState: AnnotationState.ALL,
  annotationPattern: '',
  annotationPrevState: AnnotationState.ALL,
  annotationRange: AnnotationRange.NONE,
  annotationRules: true,
  annotationType: AnnotationType.ALL,
  datasourceHealth: false,
  dashboardFavorites: FavoritesType.DISABLED,
  requestType: RequestType.NONE,
  annotationTags: [],
  dashboardTags: [],
};
