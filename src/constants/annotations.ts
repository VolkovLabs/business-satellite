import { SelectableValue } from '@grafana/data';

/**
 * Annotation Types
 */
export enum AnnotationType {
  ALL = 'all',
  MANUAL = 'manual',
  ALARMS = 'alarms',
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
    label: 'Manual',
    value: AnnotationType.MANUAL,
    icon: 'comment-alt-message',
  },
  {
    label: 'Alarms',
    value: AnnotationType.ALARMS,
    icon: 'bell',
  },
];
