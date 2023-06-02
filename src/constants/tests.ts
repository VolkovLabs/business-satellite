/**
 * Tests Identifiers
 */
export const TestIds = {
  configEditor: {
    fieldUrl: 'data-testid config-editor field-url',
    fieldPassword: 'data-testid config-editor field-password',
  },
  queryEditor: {
    fieldRequest: 'query-editor field-request',
    fieldAnnotationTypeContainer: 'data-testid query-editor field-annotation-type-container',
    fieldAnnotationTypeOption: (name: string) => `query-editor field-annotation-type-option-${name}`,
    fieldAnnotationDashboardContainer: 'data-testid query-editor field-annotation-dashboard-container',
    fieldAnnotationDashboardOption: (name: string) => `query-editor field-annotation-dashboard-option-${name}`,
    fieldAnnotationTimeRangeContainer: 'data-testid query-editor field-annotation-time-range-container',
    fieldAnnotationTimeRangeOption: (name: string) => `query-editor field-annotation-time-range-option-${name}`,
    fieldAnnotationPrevStateContainer: 'data-testid query-editor field-annotation-prev-state-container',
    fieldAnnotationNewStateContainer: 'data-testid query-editor field-annotation-new-state-container',
    fieldAnnotationStateOption: (name: string) => `query-editor field-annotation-state-option-${name}`,
    fieldAnnotationPattern: 'data-testid query-editor field-annotation-pattern',
    fieldAnnotationLimit: 'data-testid query-editor field-annotation-limit',
  },
};
