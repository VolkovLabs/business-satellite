import React, { ChangeEvent, useCallback } from 'react';
import { DataSourcePluginOptionsEditorProps, SelectableValue } from '@grafana/data';
import { FieldSet, InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';
import { RequestMode, RequestModeOptions, TestIds } from '../../constants';
import { DataSourceOptions, SecureJsonData } from '../../types';

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
    (event: SelectableValue<RequestMode>) => {
      onOptionsChange({
        ...options,
        jsonData: {
          ...options.jsonData,
          requestMode: event.value!,
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

  return (
    <FieldSet>
      <InlineFieldRow>
        <InlineField label="Request Mode" labelWidth={14} grow>
          <Select
            value={jsonData.requestMode}
            options={RequestModeOptions}
            onChange={onRequestModeChange}
            aria-label={TestIds.configEditor.fieldRequestMode}
          />
        </InlineField>
      </InlineFieldRow>

      {jsonData.requestMode !== RequestMode.LOCAL && (
        <>
          <InlineFieldRow>
            <InlineField label="Grafana URL" labelWidth={14} grow>
              <Input
                type="text"
                placeholder="http://localhost:3000"
                value={jsonData.url}
                onChange={onUrlChange}
                data-testid={TestIds.configEditor.fieldUrl}
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
                data-testid={TestIds.configEditor.fieldToken}
              />
            </InlineField>
          </InlineFieldRow>
        </>
      )}
    </FieldSet>
  );
};
