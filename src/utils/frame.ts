import { FieldType, MutableDataFrame } from '@grafana/data';

/**
 * Field Mapper
 */
type FieldMapper<ItemType> = {
  name: string;
  type: FieldType;
  getValue: (item: ItemType) => unknown;
};

/**
 * Convert To Frame
 * @param name
 * @param refId
 * @param fields
 * @param items
 */
export const convertToFrame = <ItemType>({
  name,
  refId,
  fields,
  items,
}: {
  name: string;
  refId: string;
  fields: Array<FieldMapper<ItemType>>;
  items: ItemType[];
}): MutableDataFrame => {
  /**
   * Create frame
   */
  const frame = new MutableDataFrame({
    name,
    refId,
    fields: fields.map(({ name, type }) => ({
      name,
      type,
    })),
  });

  /**
   * Add Data
   */
  items.forEach((item) => {
    frame.appendRow([...fields.map(({ getValue }) => getValue(item))]);
  });

  return frame;
};
