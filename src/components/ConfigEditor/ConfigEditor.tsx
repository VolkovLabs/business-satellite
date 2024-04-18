import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { FieldSet, InlineField, InlineFieldRow, Input, RadioButtonGroup } from '@grafana/ui';
import React, { ChangeEvent, useCallback, useEffect } from 'react';

import { REQUEST_MODE_OPTIONS, TEST_IDS } from '../../constants';
import { DataSourceOptions, RequestMode, SecureJsonData } from '../../types';

/**
 * Editor Properties
 */
interface Props extends DataSourcePluginOptionsEditorProps<DataSourceOptions, SecureJsonData> {}

/**
 * Config Editor
 */
export const ConfigEditor: React.FC<Props> = ({ onOptionsChange, options }) => {
  /**
   * Request Mode Change
   */
  const onRequestModeChange = useCallback(
    (value: RequestMode) => {
      onOptionsChange({
        ...options,
        jsonData: {
          ...options.jsonData,
          requestMode: value,
        },
      });
    },
    [onOptionsChange, options]
  );

  /**
   * API URL Change
   */
  const onUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onOptionsChange({
        ...options,
        jsonData: {
          ...options.jsonData,
          url: event.target.value,
        },
      });
    },
    [onOptionsChange, options]
  );

  /**
   * Token Change
   */
  const onTokenChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onOptionsChange({
        ...options,
        secureJsonData: {
          token: event.target.value,
        },
      });
    },
    [onOptionsChange, options]
  );

  /**
   * Render
   */
  const { jsonData, secureJsonFields } = options;
  const secureJsonData = (options.secureJsonData || {}) as SecureJsonData;

  /**
   * Set default mode as Remote
   */
  useEffect(() => {
    if (!jsonData.requestMode) {
      onRequestModeChange(RequestMode.REMOTE);
    }
  }, [jsonData.requestMode, onRequestModeChange]);

  return (
    <FieldSet>
      <InlineFieldRow>
        <InlineField label="Request Mode" labelWidth={14} grow data-testid={TEST_IDS.configEditor.fieldRequestMode}>
          <RadioButtonGroup
            value={jsonData.requestMode}
            options={REQUEST_MODE_OPTIONS}
            onChange={onRequestModeChange}
          />
        </InlineField>
      </InlineFieldRow>

      {jsonData.requestMode === RequestMode.REMOTE && (
        <>
          <InlineFieldRow>
            <InlineField label="Grafana URL" labelWidth={14} grow>
              <Input
                type="text"
                placeholder="http://localhost:3000"
                value={jsonData.url}
                onChange={onUrlChange}
                data-testid={TEST_IDS.configEditor.fieldUrl}
              />
            </InlineField>
          </InlineFieldRow>

          <InlineFieldRow>
            <InlineField label="Token" labelWidth={14} grow>
              <Input
                type="password"
                placeholder={secureJsonFields?.token ? 'configured' : ''}
                value={secureJsonData.token ?? ''}
                onChange={onTokenChange}
                data-testid={TEST_IDS.configEditor.fieldToken}
              />
            </InlineField>
          </InlineFieldRow>
        </>
      )}
    </FieldSet>
  );
};
