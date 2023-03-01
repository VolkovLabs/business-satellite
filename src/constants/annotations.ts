import { SelectableValue } from '@grafana/data';

/**
 * Annotation Types
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
 * Annotations Types
 *
 * @type {SelectableValue[]}
 */
export const AnnotationTypeOptions: SelectableValue[] = [
  {
    label: 'All',
    value: AnnotationType.ALL,
  },
  {
    label: 'Annotation',
    value: AnnotationType.ANNOTATION,
    icon: 'comment-alt-message',
  },
  {
    label: 'Alert',
    value: AnnotationType.ALERT,
    icon: 'bell',
  },
];

/**
 * Annotations Dashboard
 *
 * @type {SelectableValue[]}
 */
export const AnnotationDashboardOptions: SelectableValue[] = [
  {
    label: 'All',
    value: AnnotationDashboard.ALL,
  },
  {
    label: 'This',
    value: AnnotationDashboard.THIS,
    icon: 'dashboard',
  },
];

/**
 * Annotations Range
 *
 * @type {SelectableValue[]}
 */
export const AnnotationRangeOptions: SelectableValue[] = [
  {
    label: 'None',
    value: AnnotationRange.NONE,
  },
  {
    label: 'Selected',
    value: AnnotationRange.SELECTED,
    icon: 'calendar-alt',
  },
];

/**
 * Annotations States
 *
 * @type {SelectableValue[]}
 */
export const AnnotationStateOptions: SelectableValue[] = [
  {
    label: 'All',
    value: AnnotationState.ALL,
  },
  {
    label: 'Normal',
    value: AnnotationState.NORMAL,
  },
  {
    label: 'Pending',
    value: AnnotationState.PENDING,
  },
  {
    label: 'Alerting',
    value: AnnotationState.ALERTING,
  },
];
