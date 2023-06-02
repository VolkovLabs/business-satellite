import React from 'react';
import { DataSourceSettings } from '@grafana/data';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { TestIds } from '../../constants';
import { DataSourceOptions } from '../../types';
import { ConfigEditor } from './ConfigEditor';

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
    it('Should apply URL value and change options if field was changed', async () => {
      const options = getOptions({ jsonData: { url: 'http://localhost:3000' } });

      render(<ConfigEditor options={options} onOptionsChange={onChange} />);

      const fieldUrl = screen.getByTestId(TestIds.configEditor.fieldUrl);

      expect(fieldUrl).toHaveValue(options.jsonData.url);

      const newValue = 'http://localhost:3100';

      await act(() => fireEvent.change(fieldUrl, { target: { value: newValue } }));

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
    it('Should apply Token value and change options if field was changed', async () => {
      const options = getOptions({ secureJsonData: { token: '123' } });

      render(<ConfigEditor options={options} onOptionsChange={onChange} />);

      const fieldPassword = screen.getByTestId(TestIds.configEditor.fieldPassword);

      expect(fieldPassword).toHaveValue(options.secureJsonData.token);

      const newValue = '321';

      await act(() => fireEvent.change(fieldPassword, { target: { value: newValue } }));

      expect(onChange).toHaveBeenCalledWith({
        ...options,
        secureJsonData: {
          ...options.secureJsonData,
          token: newValue,
        },
      });
    });
  });
});
