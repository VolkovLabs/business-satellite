import { SelectableValue } from '@grafana/data';
import { TestIds } from './tests';

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
    ariaLabel: TestIds.queryEditor.fieldAnnotationTypeOption(AnnotationType.ALL),
  },
  {
    label: 'Annotation',
    value: AnnotationType.ANNOTATION,
    icon: 'comment-alt-message',
    ariaLabel: TestIds.queryEditor.fieldAnnotationTypeOption(AnnotationType.ANNOTATION),
  },
  {
    label: 'Alert',
    value: AnnotationType.ALERT,
    icon: 'bell',
    ariaLabel: TestIds.queryEditor.fieldAnnotationTypeOption(AnnotationType.ALERT),
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
    ariaLabel: TestIds.queryEditor.fieldAnnotationDashboardOption(AnnotationDashboard.ALL),
  },
  {
    label: 'This',
    value: AnnotationDashboard.THIS,
    icon: 'dashboard',
    ariaLabel: TestIds.queryEditor.fieldAnnotationDashboardOption(AnnotationDashboard.THIS),
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
    ariaLabel: TestIds.queryEditor.fieldAnnotationTimeRangeOption(AnnotationRange.NONE),
  },
  {
    label: 'Selected',
    value: AnnotationRange.SELECTED,
    icon: 'calendar-alt',
    ariaLabel: TestIds.queryEditor.fieldAnnotationTimeRangeOption(AnnotationRange.SELECTED),
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
    ariaLabel: TestIds.queryEditor.fieldAnnotationStateOption(AnnotationState.ALL),
  },
  {
    label: 'Normal',
    value: AnnotationState.NORMAL,
    ariaLabel: TestIds.queryEditor.fieldAnnotationStateOption(AnnotationState.NORMAL),
  },
  {
    label: 'Pending',
    value: AnnotationState.PENDING,
    ariaLabel: TestIds.queryEditor.fieldAnnotationStateOption(AnnotationState.PENDING),
  },
  {
    label: 'Alerting',
    value: AnnotationState.ALERTING,
    ariaLabel: TestIds.queryEditor.fieldAnnotationStateOption(AnnotationState.ALERTING),
  },
];

/**
 * Annotations Alert Rules
 *
 * @type {SelectableValue[]}
 */
export const AnnotationRulesOptions: SelectableValue[] = [
  {
    label: 'Enabled',
    value: true,
    ariaLabel: TestIds.queryEditor.fieldAnnotationRulesOption(true),
  },
  {
    label: 'Disabled',
    value: false,
    ariaLabel: TestIds.queryEditor.fieldAnnotationRulesOption(false),
  },
];
