/**
 * Tests Identifiers
 */
export const TEST_IDS = {
  configEditor: {
    root: 'data-testid config-editor root',
    fieldToken: 'data-testid config-editor field-token',
    fieldUrl: 'data-testid config-editor field-url',
    fieldRequestMode: 'data-testid config-editor field-request-mode',
    fieldRequestModelOption: (name: string) => `config-editor field-request-mode-option-${name}`,
  },
  tagBadge: {
    root: 'data-testid tag-badge root',
    removeIcon: 'data-testid tag-badge remove-icon',
  },
  tagOption: {
    root: 'data-testid tag-option root',
    removeIcon: 'data-testid tag-badge remove-icon',
  },
  queryEditor: {
    root: 'data-testid query-editor root',
    option: (name: unknown) => `query-editor option-${name}`,
    fieldAnnotationDashboardContainer: 'data-testid query-editor field-annotation-dashboard-container',
    fieldAnnotationDashboardOption: (name: string) => `query-editor field-annotation-dashboard-option-${name}`,
    fieldAnnotationRulesContainer: 'data-testid query-editor field-annotation-rules-container',
    fieldAnnotationRulesOption: (name: boolean) => `query-editor field-annotation-rules-option-${name}`,
    fieldAnnotationLimit: 'data-testid query-editor field-annotation-limit',
    fieldAnnotationNewStateContainer: 'data-testid query-editor field-annotation-new-state-container',
    fieldAnnotationPattern: 'data-testid query-editor field-annotation-pattern',
    fieldAnnotationPrevStateContainer: 'data-testid query-editor field-annotation-prev-state-container',
    fieldAnnotationStateOption: (name: string) => `query-editor field-annotation-state-option-${name}`,
    fieldAnnotationTags: 'data-testid query-editor field-annotation-tags',
    fieldAnnotationTimeRangeContainer: 'data-testid query-editor field-annotation-time-range-container',
    fieldAnnotationTimeRangeOption: (name: string) => `query-editor field-annotation-time-range-option-${name}`,
    fieldAnnotationTypeContainer: 'data-testid query-editor field-annotation-type-container',
    fieldAnnotationTypeOption: (name: string) => `query-editor field-annotation-type-option-${name}`,
    fieldRequest: 'query-editor field-request',
    fieldDatasourcesCheckHealth: 'data-testid query-editor field-datasources-check-health',
    fieldDashboardsFavorites: 'data-testid query-editor field-dashboards-favorites',
    fieldDashboardsTags: 'data-testid query-editor field-dashboards-tags',
    fieldAlertingState: 'data-testid query-editor field-alerting-state',
    fieldAlertingLimit: 'data-testid query-editor field-alerting-limit',
  },
};
