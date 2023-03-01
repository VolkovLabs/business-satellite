import { DataQuery } from '@grafana/data';
import { AnnotationType, RequestType } from '../constants';

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
   * Annotation Pattern
   *
   * @type {string}
   */
  annotationPattern?: string;
}
