import React from 'react';

const actual = jest.requireActual('@grafana/ui');

/**
 * Mock Select component
 */
const Select = jest.fn(({ options, onChange, value, ...restProps }) => (
  <select
    onChange={(event: any) => {
      if (onChange) {
        onChange(
          options.find((option: any) => {
            /**
             * Jest convert number to string, so just using not strict comparison
             */
            // eslint-disable-next-line eqeqeq
            return option.value == event.target.value;
          })
        );
      }
    }}
    /**
     * Fix jest warnings because null value.
     * For Select component in @grafana/ui should be used null to reset value.
     */
    value={value === null ? '' : value}
    {...restProps}
  >
    {options.map(({ label, value }: any) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
));

module.exports = {
  ...actual,
  Select,
};
