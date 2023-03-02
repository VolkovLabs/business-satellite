import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { DataSourceSettings } from '@grafana/data';
import { DataSourceOptions } from '../../types';
import { ConfigEditor } from './ConfigEditor';

/**
 * Component
 */
type ShallowComponent = ShallowWrapper<ConfigEditor['props'], ConfigEditor['state'], ConfigEditor>;

/**
 * Override Options
 */
interface OverrideOptions {
  [key: string]: unknown;
  jsonData?: object;
  secureJsonData?: object | null;
}

/**
 * Configuration Options
 */
const getOptions = ({
  jsonData = {},
  secureJsonData = {},
  ...overrideOptions
}: OverrideOptions = {}): DataSourceSettings<DataSourceOptions, any> => ({
  id: 1,
  orgId: 2,
  name: '',
  typeLogoUrl: '',
  type: '',
  uid: '',
  typeName: '',
  access: '',
  url: '',
  user: '',
  database: '',
  basicAuth: false,
  basicAuthUser: '',
  isDefault: false,
  secureJsonFields: {},
  readOnly: false,
  withCredentials: false,
  ...overrideOptions,
  jsonData: {
    url: '',
    ...jsonData,
  },
  secureJsonData: {
    token: '',
    ...secureJsonData,
  },
});

/**
 * Config Editor
 */
describe('ConfigEditor', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockReset();
  });

  /**
   * URL
   */
  describe('URL', () => {
    const getComponent = (wrapper: ShallowComponent) =>
      wrapper.findWhere((node) => {
        return node.prop('onChange') === wrapper.instance().onUrlChange;
      });

    it('Should apply URL value and change options if field was changed', () => {
      const options = getOptions({ jsonData: { url: 'http://localhost:3000' } });
      const wrapper = shallow<ConfigEditor>(<ConfigEditor options={options} onOptionsChange={onChange} />);

      const testedComponent = getComponent(wrapper);
      expect(testedComponent.prop('value')).toEqual(options.jsonData.url);

      const newValue = 'http://localhost:3100';
      testedComponent.simulate('change', { target: { value: newValue } });
      expect(onChange).toHaveBeenCalledWith({
        ...options,
        jsonData: {
          ...options.jsonData,
          url: newValue,
        },
      });
    });
  });

  /**
   * Token
   */
  describe('Token', () => {
    const getComponent = (wrapper: ShallowComponent) =>
      wrapper.findWhere((node) => {
        return node.prop('onChange') === wrapper.instance().onTokenChange;
      });

    it('Should apply URL value and change options if field was changed', () => {
      const options = getOptions({ jsonData: { url: '123' } });
      const wrapper = shallow<ConfigEditor>(<ConfigEditor options={options} onOptionsChange={onChange} />);

      const testedComponent = getComponent(wrapper);
      expect(testedComponent.prop('value')).toEqual(options.secureJsonData.token);

      const newValue = '321';
      testedComponent.simulate('change', { target: { value: newValue } });
      expect(onChange).toHaveBeenCalledWith({
        ...options,
        secureJsonData: {
          ...options.secureJsonData,
          token: `Bearer ${newValue}`,
        },
      });
    });
  });
});
