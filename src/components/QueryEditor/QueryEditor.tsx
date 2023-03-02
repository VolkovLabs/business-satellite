import { defaults } from 'lodash';
import React, { FormEvent, PureComponent } from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { InlineField, InlineFieldRow, Input, RadioButtonGroup, Select } from '@grafana/ui';
import {
  AnnotationDashboard,
  AnnotationDashboardOptions,
  AnnotationRange,
  AnnotationRangeOptions,
  AnnotationState,
  AnnotationStateOptions,
  AnnotationType,
  AnnotationTypeOptions,
  DefaultQuery,
  RequestType,
  RequestTypeOptions,
} from '../../constants';
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
   * Annotation Dashboard change
   */
  onAnnotationDashboardChange = async (type: AnnotationDashboard) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, annotationDashboard: type });
    onRunQuery();
  };

  /**
   * Annotation Range change
   */
  onAnnotationRangeChange = async (type: AnnotationRange) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, annotationRange: type });
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
   * Annotation Limit change
   */
  onAnnotationLimitChange = async (e: FormEvent<HTMLInputElement>) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, annotationLimit: Number(e.currentTarget.value)! });
    onRunQuery();
  };

  /**
   * Annotation Prev State change
   */
  onAnnotationPrevStateChange = async (type: AnnotationState) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, annotationPrevState: type });
    onRunQuery();
  };

  /**
   * Annotation New State change
   */
  onAnnotationNewStateChange = async (type: AnnotationState) => {
    const { onChange, onRunQuery, query } = this.props;
    onChange({ ...query, annotationNewState: type });
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
              <InlineField label="Type" labelWidth={10}>
                <RadioButtonGroup
                  options={AnnotationTypeOptions}
                  value={AnnotationTypeOptions.find((type) => type.value === query.annotationType)?.value}
                  onChange={this.onAnnotationTypeChange}
                />
              </InlineField>

              <InlineField label="Dashboards" labelWidth={10}>
                <RadioButtonGroup
                  options={AnnotationDashboardOptions}
                  value={AnnotationDashboardOptions.find((type) => type.value === query.annotationDashboard)?.value}
                  onChange={this.onAnnotationDashboardChange}
                />
              </InlineField>

              <InlineField label="Time Range" labelWidth={12}>
                <RadioButtonGroup
                  options={AnnotationRangeOptions}
                  value={AnnotationRangeOptions.find((type) => type.value === query.annotationRange)?.value}
                  onChange={this.onAnnotationRangeChange}
                />
              </InlineField>
            </InlineFieldRow>

            {query.annotationType === AnnotationType.ALERT && (
              <InlineFieldRow>
                <InlineField label="Prev State" labelWidth={10}>
                  <RadioButtonGroup
                    options={AnnotationStateOptions}
                    value={AnnotationStateOptions.find((type) => type.value === query.annotationPrevState)?.value}
                    onChange={this.onAnnotationPrevStateChange}
                  />
                </InlineField>
                <InlineField label="New State" labelWidth={10}>
                  <RadioButtonGroup
                    options={AnnotationStateOptions}
                    value={AnnotationStateOptions.find((type) => type.value === query.annotationNewState)?.value}
                    onChange={this.onAnnotationNewStateChange}
                  />
                </InlineField>
              </InlineFieldRow>
            )}

            <InlineFieldRow>
              <InlineField label="Text Pattern" labelWidth={20} grow tooltip="Regex format. Support variables.">
                <Input value={query.annotationPattern} onChange={this.onAnnotationPatternChange} />
              </InlineField>
              <InlineField label="Max Limit" labelWidth={10}>
                <Input type="number" value={query.annotationLimit} onChange={this.onAnnotationLimitChange} />
              </InlineField>
            </InlineFieldRow>
          </>
        )}
      </>
    );
  }
}
