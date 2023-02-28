import { SelectableValue } from '@grafana/data';

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
    description: 'Returns annotations',
    value: RequestTypeValue.ANNOTATIONS,
  },
  {
    label: 'None',
    description: 'For internal API calls',
    value: RequestTypeValue.NONE,
  },
];
