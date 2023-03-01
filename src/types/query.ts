import { DataQuery } from '@grafana/data';
import { AnnotationDashboard, AnnotationRange, AnnotationType, RequestType } from '../constants';

/**
 * Query
 */
export interface Query extends DataQuery {
  /**
   * Request Type
   *
   * @type {RequestType}
   */
  requestType?: RequestType;

  /**
   * Annotation Type
   *
   * @type {AnnotationType}
   */
  annotationType?: AnnotationType;

  /**
   * Annotation Dashboard
   *
   * @type {AnnotationDashboard}
   */
  annotationDashboard?: AnnotationDashboard;

  /**
   * Annotation Range
   *
   * @type {AnnotationRange}
   */
  annotationRange?: AnnotationRange;

  /**
   * Annotation Pattern
   *
   * @type {string}
   */
  annotationPattern?: string;
}
