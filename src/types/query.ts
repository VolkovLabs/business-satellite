import { DataQuery } from '@grafana/schema';

import {
  AlertInstanceTotalState,
  AnnotationDashboard,
  AnnotationRange,
  AnnotationState,
  AnnotationType,
} from '../types';

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
  ALERTING_ALERTS = 'alertingAlerts',
}

/**
 * Alerting Query
 */
export interface AlertingQuery {
  /**
   * State
   *
   * @type {AlertInstanceTotalState[]}
   */
  state: AlertInstanceTotalState[];

  /**
   * Limit
   *
   * @type {number}
   */
  limit?: number;
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

  /**
   * Data Source Health
   */
  datasourceHealth?: boolean;

  /**
   * Alerting
   *
   * @type {AlertingQuery}
   */
  alerting?: AlertingQuery;
}
