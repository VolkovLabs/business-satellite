import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { Icon, InlineField, InlineFieldRow, Input, RadioButtonGroup, Select } from '@grafana/ui';
import { NumberInput } from '@volkovlabs/components';
import { defaults } from 'lodash';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

import {
  ANNOTATION_DASHBOARD_OPTIONS,
  ANNOTATION_RANGE_OPTIONS,
  ANNOTATION_RULES_OPTIONS,
  ANNOTATION_STATES_OPTIONS,
  ANNOTATION_TYPE_OPTIONS,
  BOOLEAN_OPTIONS,
  DEFAULT_QUERY,
  REQUEST_TYPE_OPTIONS,
  TEST_IDS,
} from '../../constants';
import { DataSource } from '../../datasource';
import {
  AlertingQuery,
  AlertInstanceTotalState,
  AnnotationDashboard,
  AnnotationRange,
  AnnotationState,
  AnnotationTagItem,
  AnnotationType,
  DataSourceOptions,
  Query,
  RequestType,
  TagSelectOption,
} from '../../types';
import { getAllAnnotationsTags, getOptionsWithTestId } from '../../utils';
import { TagOption } from './components';

/**
 * Editor Properties
 */
type Props = QueryEditorProps<DataSource, Query, DataSourceOptions>;

/**
 * Query Editor
 */
export const QueryEditor: React.FC<Props> = ({ onChange, onRunQuery, query: rawQuery, datasource }) => {
  /**
   * Initialized
   */
  const [isInitialized, setInitialized] = useState(false);
  const [annotationsTags, setAnnotationsTags] = useState<AnnotationTagItem[]>([]);

  /**
   * Initialize Data Source
   */
  useEffect(() => {
    if (!isInitialized) {
      onRunQuery();
      setInitialized(true);
    }
  }, [isInitialized, onRunQuery]);

  /**
   * Request Type change
   */
  const onRequestTypeChange = useCallback(
    async (item: SelectableValue<RequestType>) => {
      onChange({ ...rawQuery, requestType: item.value! });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation Type change
   */
  const onAnnotationTypeChange = useCallback(
    async (type: AnnotationType) => {
      onChange({ ...rawQuery, annotationType: type });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation Dashboard change
   */
  const onAnnotationDashboardChange = useCallback(
    async (type: AnnotationDashboard) => {
      onChange({ ...rawQuery, annotationDashboard: type });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation Rules change
   */
  const onAnnotationRulesChange = useCallback(
    async (type: boolean) => {
      onChange({ ...rawQuery, annotationRules: type });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation Range change
   */
  const onAnnotationRangeChange = useCallback(
    async (type: AnnotationRange) => {
      onChange({ ...rawQuery, annotationRange: type });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation Pattern change
   */
  const onAnnotationPatternChange = useCallback(
    async (event: FormEvent<HTMLInputElement>) => {
      onChange({ ...rawQuery, annotationPattern: event.currentTarget.value! });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation Limit change
   */
  const onAnnotationLimitChange = useCallback(
    async (event: FormEvent<HTMLInputElement>) => {
      onChange({ ...rawQuery, annotationLimit: Number(event.currentTarget.value)! });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation Prev State change
   */
  const onAnnotationPrevStateChange = useCallback(
    async (type: AnnotationState) => {
      onChange({ ...rawQuery, annotationPrevState: type });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation New State change
   */
  const onAnnotationNewStateChange = useCallback(
    async (type: AnnotationState) => {
      onChange({ ...rawQuery, annotationNewState: type });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Annotation New State change
   */
  const onAnnotationTagsChange = useCallback(
    async (tags: string[]) => {
      onChange({ ...rawQuery, annotationTags: tags });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Default Query
   */
  const query = defaults(rawQuery, DEFAULT_QUERY);

  /**
   * Available Request Types
   */
  const availableRequestTypes = useMemo(() => {
    return REQUEST_TYPE_OPTIONS.filter((option) =>
      datasource.api.availableRequestTypes.some(
        (supported) => supported === option.value || option.value === RequestType.NONE
      )
    );
  }, [datasource.api.availableRequestTypes]);

  /**
   * Change Query Field
   */
  const onChangeQueryField = useCallback(
    (name: keyof Query, value: Query[typeof name]) => {
      onChange({ ...rawQuery, [name]: value });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  /**
   * Change Alerting Query Field
   */
  const onChangeAlertingQueryField = useCallback(
    (name: keyof AlertingQuery, value: AlertingQuery[typeof name]) => {
      onChange({
        ...rawQuery,
        alerting: {
          ...(rawQuery.alerting || { state: [] }),
          [name]: value,
        },
      });
      onRunQuery();
    },
    [onChange, onRunQuery, rawQuery]
  );

  useEffect(() => {
    const getAnnotationsTags = async () => {
      const url = datasource.urlInstance;
      const tagsResponse = await getAllAnnotationsTags(url);
      setAnnotationsTags(tagsResponse);
    };

    getAnnotationsTags();
  }, [datasource]);

  const annotationTagsOptions = useMemo(() => {
    return annotationsTags.map((tag) => {
      return {
        value: tag.tag,
        label: tag.tag,
        count: tag.count,
      };
    });
  }, [annotationsTags]);

  /**
   * Render
   */
  return (
    <div data-testid={TEST_IDS.queryEditor.root}>
      <InlineFieldRow>
        <InlineField grow label="Request" labelWidth={10}>
          <Select
            options={availableRequestTypes}
            value={query.requestType}
            onChange={onRequestTypeChange}
            aria-label={TEST_IDS.queryEditor.fieldRequest}
          />
        </InlineField>
      </InlineFieldRow>

      {query.requestType === RequestType.ANNOTATIONS && (
        <>
          <InlineFieldRow>
            <InlineField label="Type" labelWidth={10} data-testid={TEST_IDS.queryEditor.fieldAnnotationTypeContainer}>
              <RadioButtonGroup
                options={ANNOTATION_TYPE_OPTIONS}
                value={ANNOTATION_TYPE_OPTIONS.find((type) => type.value === query.annotationType)?.value}
                onChange={onAnnotationTypeChange}
              />
            </InlineField>

            <InlineField
              label="Dashboards"
              labelWidth={10}
              data-testid={TEST_IDS.queryEditor.fieldAnnotationDashboardContainer}
            >
              <RadioButtonGroup
                options={ANNOTATION_DASHBOARD_OPTIONS}
                value={ANNOTATION_DASHBOARD_OPTIONS.find((type) => type.value === query.annotationDashboard)?.value}
                onChange={onAnnotationDashboardChange}
              />
            </InlineField>

            <InlineField
              label="Time Range"
              labelWidth={12}
              data-testid={TEST_IDS.queryEditor.fieldAnnotationTimeRangeContainer}
            >
              <RadioButtonGroup
                options={ANNOTATION_RANGE_OPTIONS}
                value={ANNOTATION_RANGE_OPTIONS.find((type) => type.value === query.annotationRange)?.value}
                onChange={onAnnotationRangeChange}
              />
            </InlineField>
          </InlineFieldRow>

          {query.annotationType === AnnotationType.ALERT && (
            <InlineFieldRow>
              <InlineField
                label="Prev State"
                labelWidth={10}
                data-testid={TEST_IDS.queryEditor.fieldAnnotationPrevStateContainer}
              >
                <RadioButtonGroup
                  options={ANNOTATION_STATES_OPTIONS}
                  value={ANNOTATION_STATES_OPTIONS.find((type) => type.value === query.annotationPrevState)?.value}
                  onChange={onAnnotationPrevStateChange}
                />
              </InlineField>
              <InlineField
                label="New State"
                labelWidth={10}
                data-testid={TEST_IDS.queryEditor.fieldAnnotationNewStateContainer}
              >
                <RadioButtonGroup
                  options={ANNOTATION_STATES_OPTIONS}
                  value={ANNOTATION_STATES_OPTIONS.find((type) => type.value === query.annotationNewState)?.value}
                  onChange={onAnnotationNewStateChange}
                />
              </InlineField>
            </InlineFieldRow>
          )}

          <InlineFieldRow>
            <InlineField label="Text Pattern" labelWidth={20} grow tooltip="Regex format. Support variables.">
              <Input
                value={query.annotationPattern}
                onChange={onAnnotationPatternChange}
                data-testid={TEST_IDS.queryEditor.fieldAnnotationPattern}
              />
            </InlineField>
            <InlineField label="Max Limit" labelWidth={10}>
              <Input
                type="number"
                value={query.annotationLimit}
                onChange={onAnnotationLimitChange}
                data-testid={TEST_IDS.queryEditor.fieldAnnotationLimit}
              />
            </InlineField>
          </InlineFieldRow>

          {query.annotationType !== AnnotationType.ANNOTATION && (
            <InlineFieldRow>
              <InlineField
                label="Add Alert fields"
                tooltip="Add Alert Name and Alert UID from provisioned alert rules"
                labelWidth={20}
                data-testid={TEST_IDS.queryEditor.fieldAnnotationRulesContainer}
              >
                <RadioButtonGroup
                  options={ANNOTATION_RULES_OPTIONS}
                  value={query.annotationRules}
                  onChange={onAnnotationRulesChange}
                />
              </InlineField>
            </InlineFieldRow>
          )}

          <InlineField label="Tags" labelWidth={10} grow={true}>
            <Select
              prefix={<Icon name="tag-alt" />}
              onChange={(event) => {
                const tags = Array.isArray(event)
                  ? event.map((eventItem: TagSelectOption) => eventItem.value)
                  : [event.value!];
                onAnnotationTagsChange(tags);
              }}
              options={annotationTagsOptions}
              components={{ Option: TagOption }}
              value={query.annotationTags}
              isMulti={true}
              isClearable={true}
              data-testid={TEST_IDS.queryEditor.fieldAnnotationTags}
            />
          </InlineField>
        </>
      )}

      {query.requestType === RequestType.DATASOURCES && (
        <InlineFieldRow>
          <InlineField label="Check Health" data-testid={TEST_IDS.queryEditor.fieldDatasourcesCheckHealth}>
            <RadioButtonGroup
              options={getOptionsWithTestId(BOOLEAN_OPTIONS, TEST_IDS.queryEditor.option)}
              value={query.datasourceHealth}
              onChange={(value) => {
                onChangeQueryField('datasourceHealth', value);
              }}
            />
          </InlineField>
        </InlineFieldRow>
      )}

      {query.requestType === RequestType.ALERTING_ALERTS && (
        <InlineFieldRow>
          <InlineField label="State" labelWidth={10} grow={true}>
            <Select
              onChange={(event) => {
                const array = Array.isArray(event) ? event : [event];
                onChangeAlertingQueryField(
                  'state',
                  array.map((option) => option.value)
                );
              }}
              options={[
                {
                  value: AlertInstanceTotalState.ALERTING,
                  label: 'Alerting',
                },
                {
                  value: AlertInstanceTotalState.PENDING,
                  label: 'Pending',
                },
                {
                  value: AlertInstanceTotalState.NORMAL,
                  label: 'Normal',
                },
                {
                  value: AlertInstanceTotalState.ERROR,
                  label: 'Error',
                },
                {
                  value: AlertInstanceTotalState.NO_DATA,
                  label: 'NoData',
                },
              ]}
              value={query.alerting?.state}
              isMulti={true}
              isClearable={true}
              data-testid={TEST_IDS.queryEditor.fieldAlertingState}
            />
          </InlineField>
          <InlineField label="Max Limit" labelWidth={10}>
            <NumberInput
              value={query.alerting?.limit ?? 100}
              step={1}
              onChange={(value) => onChangeAlertingQueryField('limit', value)}
              data-testid={TEST_IDS.queryEditor.fieldAlertingLimit}
            />
          </InlineField>
        </InlineFieldRow>
      )}
    </div>
  );
};
