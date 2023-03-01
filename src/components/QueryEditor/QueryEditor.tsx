import { defaults } from 'lodash';
import React, { FormEvent, PureComponent } from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { InlineField, InlineFieldRow, Input, RadioButtonGroup, Select } from '@grafana/ui';
import { AnnotationType, AnnotationTypeOptions, DefaultQuery, RequestType, RequestTypeOptions } from '../../constants';
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
  onRequestTypeChange = async (item: SelectableValue<RequestType>) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, requestType: item.value! });
    onRunQuery();
  };

  /**
   * Annotation Type change
   */
  onAnnotationTypeChange = async (type: AnnotationType) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, annotationType: type });
    onRunQuery();
  };

  /**
   * Annotation Pattern change
   */
  onAnnotationPatternChange = async (e: FormEvent<HTMLInputElement>) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, annotationPattern: e.currentTarget.value! });
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
              options={RequestTypeOptions}
              value={RequestTypeOptions.find((type) => type.value === query.requestType)}
              onChange={this.onRequestTypeChange}
            />
          </InlineField>
        </InlineFieldRow>

        {query.requestType === RequestType.ANNOTATIONS && (
          <>
            <InlineFieldRow>
              <InlineField label="Type" labelWidth={10} grow>
                <RadioButtonGroup
                  options={AnnotationTypeOptions}
                  value={AnnotationTypeOptions.find((type) => type.value === query.annotationType)?.value}
                  onChange={this.onAnnotationTypeChange}
                />
              </InlineField>
            </InlineFieldRow>

            <InlineFieldRow>
              <InlineField label="Text Pattern" labelWidth={20} grow tooltip="Regex format">
                <Input value={query.annotationPattern} onChange={this.onAnnotationPatternChange} />
              </InlineField>
            </InlineFieldRow>
          </>
        )}
      </>
    );
  }
}
