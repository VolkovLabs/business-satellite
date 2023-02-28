import React, { ChangeEvent, PureComponent } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { FieldSet, InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { DataSourceOptions, SecureJsonData } from '../../types';

/**
 * Editor Properties
 */
interface Props extends DataSourcePluginOptionsEditorProps<DataSourceOptions, SecureJsonData> {}

/**
 * State
 */
interface State {}

/**
 * Config Editor
 */
export class ConfigEditor extends PureComponent<Props, State> {
  /**
   * API URL Change
   */
  onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        url: event.target.value,
      },
    });
  };

  /**
   * Token Change
   */
  onTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        token: event.target.value,
      },
    });
  };

  /**
   * Render
   */
  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as SecureJsonData;

    return (
      <FieldSet>
        <InlineFieldRow>
          <InlineField label="Grafana URL" labelWidth={14} grow>
            <Input type="text" placeholder="http://localhost:3000" value={jsonData.url} onChange={this.onUrlChange} />
          </InlineField>
        </InlineFieldRow>

        <InlineFieldRow>
          <InlineField label="Token" labelWidth={14} grow>
            <Input
              type="password"
              placeholder={secureJsonFields?.token ? 'configured' : ''}
              value={secureJsonData.token ?? ''}
              onChange={this.onTokenChange}
            />
          </InlineField>
        </InlineFieldRow>
      </FieldSet>
    );
  }
}
