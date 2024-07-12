import { DataQuery } from '@grafana/schema';

import { AnnotationDashboard, AnnotationRange, AnnotationState, AnnotationType } from '../types';

/**
 * Request Type Values
 */
export enum RequestType {
  ALERT_RULES = 'alertRules',
  ANNOTATIONS = 'annotations',
  DATASOURCES = 'datasources',
  DASHBOARDS_META = 'dashboardsMeta',
  HEALTH = 'health',
  NONE = 'none',
  ORG_USERS = 'orgUsers',
}

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

  /**
   * Annotation Limit
   *
   * @type {number}
   */
  annotationLimit?: number;

  /**
   * Annotation Prev State
   *
   * @type {AnnotationState}
   */
  annotationPrevState?: AnnotationState;

  /**
   * Annotation New State
   *
   * @type {AnnotationState}
   */
  annotationNewState?: AnnotationState;

  /**
   * Annotation Rules
   *
   * @type {boolean}
   */
  annotationRules?: boolean;
}
