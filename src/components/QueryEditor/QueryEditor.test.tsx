import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { DefaultQuery, RequestType, RequestTypeOptions } from '../../constants';
import { Query } from '../../types';
import { QueryEditor } from './QueryEditor';

/**
 * Component
 */
type ShallowComponent = ShallowWrapper<QueryEditor['props'], QueryEditor['state'], QueryEditor>;

/**
 * Get Query with default values and ability to override
 *
 * @param overrideQuery
 */
export const getQuery = (overrideQuery = {}): Query => ({
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
    const getComponent = (wrapper: ShallowComponent) =>
      wrapper.findWhere((node) => {
        return node.prop('onChange') === wrapper.instance().onRequestTypeChange;
      });

    it('Should apply requestType value and change', () => {
      const query = getQuery();
      const wrapper = shallow<QueryEditor>(
        <QueryEditor datasource={[] as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />
      );

      const testedComponent = getComponent(wrapper);
      expect(testedComponent.prop('value')).toEqual(
        RequestTypeOptions.find((type) => type.value === query.requestType)
      );

      /**
       * OnChange
       */
      const newValue = RequestTypeOptions.find((type) => type.value === RequestType.NONE);
      testedComponent.simulate('change', newValue);
      expect(onChange).toHaveBeenCalledWith({
        ...query,
        requestType: newValue?.value,
      });
    });
  });
});
