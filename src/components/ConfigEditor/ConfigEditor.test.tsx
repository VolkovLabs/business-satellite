import React from 'react';
import { DataSourceSettings } from '@grafana/data';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import { RequestMode, TestIds } from '../../constants';
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
    requestMode: RequestMode.REMOTE,
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

  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(TestIds.configEditor);
  const selectors = getSelectors(screen);

  beforeEach(() => {
    onChange.mockReset();
  });

  describe('Request Mode', () => {
    it('Should hide url and token if local mode enabled', async () => {
      const options = getOptions({ jsonData: { url: 'http://localhost:3000', requestMode: RequestMode.REMOTE } });

      const { rerender } = render(<ConfigEditor options={options} onOptionsChange={onChange} />);

      expect(screen.getByLabelText(TestIds.configEditor.fieldRequestModelOption(RequestMode.REMOTE))).toBeChecked();

      const newValue = RequestMode.LOCAL;
      fireEvent.click(screen.getByLabelText(TestIds.configEditor.fieldRequestModelOption(newValue)));

      expect(onChange).toHaveBeenCalledWith({
        ...options,
        jsonData: {
          ...options.jsonData,
          requestMode: newValue,
        },
      });

      /**
       * Render with local mode
       */
      rerender(
        <ConfigEditor
          options={getOptions({ jsonData: { url: 'http://localhost:3000', requestMode: RequestMode.LOCAL } })}
          onOptionsChange={onChange}
        />
      );

      /**
       * Url and Token should be hidden
       */
      expect(selectors.fieldUrl(true)).not.toBeInTheDocument();
      expect(selectors.fieldToken(true)).not.toBeInTheDocument();
    });
  });

  /**
   * URL
   */
  describe('URL', () => {
    it('Should apply URL value and change options if field was changed', async () => {
      const options = getOptions({ jsonData: { url: 'http://localhost:3000' } });

      render(<ConfigEditor options={options} onOptionsChange={onChange} />);

      const fieldUrl = selectors.fieldUrl();

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

      const fieldPassword = selectors.fieldToken();

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

    it('Should work without data ', async () => {
      const options = getOptions({});

      render(
        <ConfigEditor
          options={{
            ...options,
            secureJsonData: null as any,
            secureJsonFields: null as any,
          }}
          onOptionsChange={onChange}
        />
      );

      const fieldPassword = selectors.fieldToken();

      expect(fieldPassword).toHaveValue('');
    });

    it('Should show configured placeholder ', async () => {
      const options = getOptions({});

      render(
        <ConfigEditor
          options={{
            ...options,
            secureJsonData: null as any,
            secureJsonFields: {
              token: true,
            },
          }}
          onOptionsChange={onChange}
        />
      );

      const fieldPassword = selectors.fieldToken();

      expect(fieldPassword).toHaveProperty('placeholder', 'configured');
    });
  });
});
