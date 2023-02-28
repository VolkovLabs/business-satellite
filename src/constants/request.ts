import { SelectableValue } from '@grafana/data';
import { Messages } from './messages';

/**
 * Request Type Values
 */
export enum RequestTypeValue {
  ANNOTATIONS = 'annotations',
  NONE = 'none',
}

/**
 * Request Type
 *
 * @type {SelectableValue[]}
 */
export const RequestType: SelectableValue[] = [
  {
    label: 'Annotations',
    description: Messages.requestAnnotations,
    value: RequestTypeValue.ANNOTATIONS,
  },
  {
    label: 'None',
    description: Messages.requestNone,
    value: RequestTypeValue.NONE,
  },
];
