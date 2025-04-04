import { SelectableValue } from '@grafana/data';
import React from 'react';

const actual = jest.requireActual('@grafana/ui');

/**
 * Mock Select component
 */
const SelectMock = ({
  options,
  onChange,
  value,
  isMulti,
  isClearable,
  allowCustomValue,
  invalid,
  noOptionsMessage,
  formatOptionLabel,
  isLoading,
  onOpenMenu,
  onCloseMenu,
  ...restProps
}: any) => (
  <select
    onChange={(event: any) => {
      if (onChange) {
        if (isMulti) {
          if (!Array.isArray(event.target.values)) {
            return onChange({ value: event.target.values });
          }
          const newOptions = allowCustomValue
            ? event.target.values.map((value: string) => ({
                value,
              }))
            : options.filter((option: any) => event.target.values.includes(option.value));
          onChange(newOptions);
        } else {
          const plainOptions = options.reduce(
            (acc: SelectableValue[], option: SelectableValue) => acc.concat(option.options ? option.options : option),
            []
          );
          // eslint-disable-next-line eqeqeq
          onChange(plainOptions.find((option: any) => option.value == event.target.value));
        }
      }
    }}
    /**
     * Fix jest warnings because null value.
     * For Select component in @grafana/ui should be used null to reset value.
     */
    value={value === null ? '' : value?.value || value}
    multiple={isMulti}
    {...restProps}
  >
    {isClearable && (
      <option key="clear" value="">
        Clear
      </option>
    )}
    {(allowCustomValue
      ? (Array.isArray(value) ? value : [value])
          .map((value: string) => ({
            value,
            label: value,
          }))
          .concat(options.filter((option: any) => option.value !== value))
      : options.reduce(
          (acc: SelectableValue[], option: SelectableValue) => acc.concat(option.options ? option.options : option),
          []
        )
    ).map(({ label, value }: any, index: number) => (
      <option key={index} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const IconMock = ({ ...restProps }) => {
  return (
    <button onClick={restProps.onClick} data-testid={restProps['data-testid']}>
      {restProps.name}
    </button>
  );
};
const Select = jest.fn(SelectMock);
const Icon = jest.fn(IconMock);

beforeEach(() => {
  Select.mockImplementation(SelectMock);
  Icon.mockImplementation(IconMock);
});

module.exports = {
  ...actual,
  Select,
  Icon,
};
