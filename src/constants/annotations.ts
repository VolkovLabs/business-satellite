import { SelectableValue } from '@grafana/data';

/**
 * Annotation Types
 */
export enum AnnotationType {
  ALL = 'all',
  ANNOTATION = 'annotation',
  ALERT = 'alert',
}

/**
 * Annotation Dashboard
 */
export enum AnnotationDashboard {
  ALL = 'all',
  THIS = 'this',
}

/**
 * Annotation Range
 */
export enum AnnotationRange {
  NONE = 'none',
  SELECTED = 'selected',
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
