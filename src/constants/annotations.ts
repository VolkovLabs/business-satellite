import { SelectableValue } from '@grafana/data';

import { AnnotationDashboard, AnnotationRange, AnnotationState, AnnotationType } from '../types';
import { TEST_IDS } from './tests';

/**
 * Annotations Type Options
 *
 * @type {SelectableValue[]}
 */
export const ANNOTATION_TYPE_OPTIONS: SelectableValue[] = [
  {
    label: 'All',
    value: AnnotationType.ALL,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationTypeOption(AnnotationType.ALL),
  },
  {
    label: 'Annotation',
    value: AnnotationType.ANNOTATION,
    icon: 'comment-alt-message',
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationTypeOption(AnnotationType.ANNOTATION),
  },
  {
    label: 'Alert',
    value: AnnotationType.ALERT,
    icon: 'bell',
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationTypeOption(AnnotationType.ALERT),
  },
];

/**
 * Annotations Dashboard Options
 *
 * @type {SelectableValue[]}
 */
export const ANNOTATION_DASHBOARD_OPTIONS: SelectableValue[] = [
  {
    label: 'All',
    value: AnnotationDashboard.ALL,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationDashboardOption(AnnotationDashboard.ALL),
  },
  {
    label: 'This',
    value: AnnotationDashboard.THIS,
    icon: 'dashboard',
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationDashboardOption(AnnotationDashboard.THIS),
  },
];

/**
 * Annotations Range
 *
 * @type {SelectableValue[]}
 */
export const ANNOTATION_RANGE_OPTIONS: SelectableValue[] = [
  {
    label: 'None',
    value: AnnotationRange.NONE,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationTimeRangeOption(AnnotationRange.NONE),
  },
  {
    label: 'Selected',
    value: AnnotationRange.SELECTED,
    icon: 'calendar-alt',
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationTimeRangeOption(AnnotationRange.SELECTED),
  },
];

/**
 * Annotations States Options
 *
 * @type {SelectableValue[]}
 */
export const ANNOTATION_STATES_OPTIONS: SelectableValue[] = [
  {
    label: 'All',
    value: AnnotationState.ALL,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationStateOption(AnnotationState.ALL),
  },
  {
    label: 'Normal',
    value: AnnotationState.NORMAL,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationStateOption(AnnotationState.NORMAL),
  },
  {
    label: 'Pending',
    value: AnnotationState.PENDING,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationStateOption(AnnotationState.PENDING),
  },
  {
    label: 'Alerting',
    value: AnnotationState.ALERTING,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationStateOption(AnnotationState.ALERTING),
  },
];

/**
 * Annotations Alert Rules
 *
 * @type {SelectableValue[]}
 */
export const ANNOTATION_RULES_OPTIONS: SelectableValue[] = [
  {
    label: 'Enabled',
    value: true,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationRulesOption(true),
  },
  {
    label: 'Disabled',
    value: false,
    ariaLabel: TEST_IDS.queryEditor.fieldAnnotationRulesOption(false),
  },
];
