import { defaults } from 'lodash';
import React, { PureComponent } from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { InlineField, InlineFieldRow, Select } from '@grafana/ui';
import { DefaultQuery, RequestType, RequestTypeValue } from '../../constants';
import { DataSource } from '../../datasource';
import { DataSourceOptions, Query } from '../../types';

/**
 * Editor Properties
 */
type Props = QueryEditorProps<DataSource, Query, DataSourceOptions>;

/**
 * Query Editor
 */
export class QueryEditor extends PureComponent<Props> {
  /**
   * Request Type change
   */
  onRequestTypeChange = async (item: SelectableValue<RequestTypeValue>) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, requestType: item.value! });
    onRunQuery();
  };

  /**
   * Render
   */
  render() {
    const query = defaults(this.props.query, DefaultQuery);

    return (
      <>
        <InlineFieldRow>
          <InlineField grow label="Request" labelWidth={10}>
            <Select
              options={RequestType}
              value={RequestType.find((type) => type.value === query.requestType)}
              onChange={this.onRequestTypeChange}
            />
          </InlineField>
        </InlineFieldRow>
      </>
    );
  }
}
