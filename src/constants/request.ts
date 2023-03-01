import { SelectableValue } from '@grafana/data';
import { Messages } from './messages';

/**
 * Request Type Values
 */
export enum RequestType {
  ANNOTATIONS = 'annotations',
  NONE = 'none',
}

/**
 * Request Type
 *
 * @type {SelectableValue[]}
 */
export const RequestTypeOptions: SelectableValue[] = [
  {
    label: 'Annotations',
    description: Messages.requestAnnotations,
    value: RequestType.ANNOTATIONS,
  },
  {
    label: 'None',
    description: Messages.requestNone,
    value: RequestType.NONE,
  },
];
