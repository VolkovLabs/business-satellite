/**
 * Tests Identifiers
 */
export const TestIds = {
  configEditor: {
    fieldToken: 'data-testid config-editor field-token',
    fieldUrl: 'data-testid config-editor field-url',
    fieldRequestMode: 'data-testid config-editor field-request-mode',
    fieldRequestModelOption: (name: string) => `config-editor field-request-mode-option-${name}`,
  },
  queryEditor: {
    fieldAnnotationDashboardContainer: 'data-testid query-editor field-annotation-dashboard-container',
    fieldAnnotationDashboardOption: (name: string) => `query-editor field-annotation-dashboard-option-${name}`,
    fieldAnnotationRulesContainer: 'data-testid query-editor field-annotation-rules-container',
    fieldAnnotationRulesOption: (name: boolean) => `query-editor field-annotation-rules-option-${name}`,
    fieldAnnotationLimit: 'data-testid query-editor field-annotation-limit',
    fieldAnnotationNewStateContainer: 'data-testid query-editor field-annotation-new-state-container',
    fieldAnnotationPattern: 'data-testid query-editor field-annotation-pattern',
    fieldAnnotationPrevStateContainer: 'data-testid query-editor field-annotation-prev-state-container',
    fieldAnnotationStateOption: (name: string) => `query-editor field-annotation-state-option-${name}`,
    fieldAnnotationTimeRangeContainer: 'data-testid query-editor field-annotation-time-range-container',
    fieldAnnotationTimeRangeOption: (name: string) => `query-editor field-annotation-time-range-option-${name}`,
    fieldAnnotationTypeContainer: 'data-testid query-editor field-annotation-type-container',
    fieldAnnotationTypeOption: (name: string) => `query-editor field-annotation-type-option-${name}`,
    fieldRequest: 'query-editor field-request',
  },
};
