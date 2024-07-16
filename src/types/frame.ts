import { FieldType } from '@grafana/data';

/**
 * Field Mapper
 */
export type FieldMapper<TItem> = {
  name: string;
  type: FieldType;
  getValue: (item: TItem) => unknown;
};
