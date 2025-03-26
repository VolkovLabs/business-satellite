import { AnnotationEvent } from '@grafana/data';

/**
 * Annotation Event
 */
export interface Annotation extends AnnotationEvent {
  /**
   * Prev State
   *
   * @type {string}
   */
  prevState?: string;
}

/**
 * Annotation Type
 */
export enum AnnotationType {
  ALL = '',
  ANNOTATION = 'annotation',
  ALERT = 'alert',
}

/**
 * Annotation Dashboard
 */
export enum AnnotationDashboard {
  ALL = '',
  THIS = 'this',
}

/**
 * Annotation Range
 */
export enum AnnotationRange {
  NONE = '',
  SELECTED = 'selected',
}

/**
 * Annotation State
 */
export enum AnnotationState {
  ALL = '',
  NORMAL = 'Normal',
  PENDING = 'Pending',
  ALERTING = 'Alerting',
}

/**
 * Annotation Tag Item
 */
export interface AnnotationTagItem {
  /**
   * Tag
   *
   * @type {string}
   */
  tag: string;

  /**
   * Count
   *
   * @type {number}
   */
  count: number;
}
