import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { DefaultQuery, RequestType, TestIds } from '../../constants';
import { Query } from '../../types';
import { QueryEditor } from './QueryEditor';

/**
 * Mock @grafana/ui
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),
  /**
   * Mock Select component
   */
  Select: jest.fn().mockImplementation(({ options, onChange, value, ...restProps }) => (
    <select
      onChange={(event: any) => {
        if (onChange) {
          onChange(options.find((option: any) => option.value === event.target.value));
        }
      }}
      /**
       * Fix jest warnings because null value.
       * For Select component in @grafana/io should be used null to reset value.
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
  )),
}));

/**
 * Get Query with default values and ability to override
 *
 * @param overrideQuery
 */
export const getQuery = (overrideQuery: Partial<Query> = {}): Query => ({
  requestType: DefaultQuery.requestType,
  refId: 'A',
  ...overrideQuery,
});

/**
 * Query Editor
 */
describe('QueryEditor', () => {
  const onRunQuery = jest.fn();
  const onChange = jest.fn();

  beforeEach(() => {
    onRunQuery.mockReset();
    onChange.mockReset();
  });

  /**
   * Request Type
   */
  describe('Request Type', () => {
    it('Should apply requestType value and change', async () => {
      const query = getQuery({
        requestType: RequestType.ALERT_RULES,
      });
      render(<QueryEditor datasource={[] as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />);

      const fieldRequest = screen.getByLabelText(TestIds.queryEditor.fieldRequest);

      expect(fieldRequest).toHaveValue(RequestType.ALERT_RULES);

      /**
       * OnChange
       */

      await act(() => fireEvent.change(fieldRequest, { target: { value: RequestType.NONE } }));

      expect(onChange).toHaveBeenCalledWith({
        ...query,
        requestType: RequestType.NONE,
      });
    });
  });
});
