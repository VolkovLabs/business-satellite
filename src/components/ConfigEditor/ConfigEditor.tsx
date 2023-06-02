import React, { ChangeEvent, useCallback } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { FieldSet, InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { TestIds } from '../../constants';
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
            data-testid={TestIds.configEditor.fieldPassword}
          />
        </InlineField>
      </InlineFieldRow>
    </FieldSet>
  );
};
