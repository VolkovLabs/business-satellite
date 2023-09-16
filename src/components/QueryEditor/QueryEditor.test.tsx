import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import {
  AnnotationDashboard,
  AnnotationRange,
  AnnotationState,
  AnnotationType,
  DefaultQuery,
  RequestType,
  TestIds,
} from '../../constants';
import { Query } from '../../types';
import { QueryEditor } from './QueryEditor';

/**
 * Get Query with default values and ability to override
 *
 * @param overrideQuery
 */
export const getQuery = (overrideQuery: Partial<Query> = {}): Query => ({
  requestType: DefaultQuery.requestType,
  refId: 'A',
  ...overrideQuery,
});

/**
 * Query Editor
 */
describe('QueryEditor', () => {
  const onRunQuery = jest.fn();
  const onChange = jest.fn();

  beforeEach(() => {
    onRunQuery.mockReset();
    onChange.mockReset();
  });

  const datasource = {
    api: {
      availableRequestTypes: Object.values(RequestType),
    },
  };

  it('Should run query on mount', async () => {
    const { rerender } = await act(async () =>
      render(
        <QueryEditor datasource={datasource as any} query={{} as any} onRunQuery={onRunQuery} onChange={onChange} />
      )
    );

    expect(onRunQuery).toHaveBeenCalledTimes(1);

    await act(async () =>
      rerender(
        <QueryEditor datasource={datasource as any} query={{} as any} onRunQuery={onRunQuery} onChange={onChange} />
      )
    );

    /**
     * Check if re-renders don't run query again
     */
    expect(onRunQuery).toHaveBeenCalledTimes(1);
  });

  /**
   * Request Type
   */
  describe('Request Type', () => {
    it('Should apply requestType value and change', async () => {
      const query = getQuery({
        requestType: RequestType.ALERT_RULES,
      });
      render(<QueryEditor datasource={datasource as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />);

      const fieldRequest = screen.getByLabelText(TestIds.queryEditor.fieldRequest);

      expect(fieldRequest).toHaveValue(RequestType.ALERT_RULES);

      /**
       * OnChange
       */
      await act(() => fireEvent.change(fieldRequest, { target: { value: RequestType.NONE } }));

      expect(onChange).toHaveBeenCalledWith({
        ...query,
        requestType: RequestType.NONE,
      });
    });
  });

  /**
   * Annotations
   */
  describe('Annotations', () => {
    const onChange = jest.fn();

    describe('Non Alert annotations', () => {
      beforeEach(() => {
        onChange.mockClear();

        const query = getQuery({
          requestType: RequestType.ANNOTATIONS,
        });

        render(
          <QueryEditor datasource={datasource as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />
        );
      });

      it('Should render and update annotation type', () => {
        expect(screen.getByTestId(TestIds.queryEditor.fieldAnnotationTypeContainer)).toBeInTheDocument();

        const newValue = AnnotationType.ANNOTATION;
        fireEvent.click(screen.getByLabelText(TestIds.queryEditor.fieldAnnotationTypeOption(newValue)));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationType: newValue,
          })
        );
      });

      it('Should render and update annotation dashboard', () => {
        expect(screen.getByTestId(TestIds.queryEditor.fieldAnnotationDashboardContainer)).toBeInTheDocument();

        const newValue = AnnotationDashboard.THIS;
        fireEvent.click(screen.getByLabelText(TestIds.queryEditor.fieldAnnotationDashboardOption(newValue)));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationDashboard: newValue,
          })
        );
      });

      it('Should render and update annotation rules', () => {
        expect(screen.getByTestId(TestIds.queryEditor.fieldAnnotationRulesContainer)).toBeInTheDocument();

        const newValue = false;
        fireEvent.click(screen.getByLabelText(TestIds.queryEditor.fieldAnnotationRulesOption(newValue)));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationRules: newValue,
          })
        );
      });

      it('Should render and update annotation range', () => {
        expect(screen.getByTestId(TestIds.queryEditor.fieldAnnotationTimeRangeContainer)).toBeInTheDocument();

        const newValue = AnnotationRange.SELECTED;
        fireEvent.click(screen.getByLabelText(TestIds.queryEditor.fieldAnnotationTimeRangeOption(newValue)));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationRange: newValue,
          })
        );
      });

      it('Should not render fields for Alert type', () => {
        expect(screen.queryByTestId(TestIds.queryEditor.fieldAnnotationPrevStateContainer)).not.toBeInTheDocument();
        expect(screen.queryByTestId(TestIds.queryEditor.fieldAnnotationNewStateContainer)).not.toBeInTheDocument();
      });

      it('Should render and update annotation pattern', () => {
        expect(screen.getByTestId(TestIds.queryEditor.fieldAnnotationPattern)).toBeInTheDocument();

        const newValue = '123';
        fireEvent.change(screen.getByTestId(TestIds.queryEditor.fieldAnnotationPattern), {
          target: { value: newValue },
        });

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationPattern: newValue,
          })
        );
      });

      it('Should render and update annotation limit', () => {
        expect(screen.getByTestId(TestIds.queryEditor.fieldAnnotationLimit)).toBeInTheDocument();

        const newValue = '123';
        fireEvent.change(screen.getByTestId(TestIds.queryEditor.fieldAnnotationLimit), {
          target: { value: newValue },
        });

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationLimit: Number(newValue),
          })
        );
      });
    });

    describe('Alert annotations', () => {
      beforeEach(() => {
        onChange.mockClear();

        const query = getQuery({
          requestType: RequestType.ANNOTATIONS,
          annotationType: AnnotationType.ALERT,
        });

        render(
          <QueryEditor datasource={datasource as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />
        );
      });

      it('Should render and update annotation prev state', () => {
        const container = screen.getByTestId(TestIds.queryEditor.fieldAnnotationPrevStateContainer);
        expect(container).toBeInTheDocument();

        const newValue = AnnotationState.PENDING;
        const containerScreen = within(container);

        fireEvent.click(containerScreen.getByLabelText(TestIds.queryEditor.fieldAnnotationStateOption(newValue)));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationPrevState: newValue,
          })
        );
      });

      it('Should render and update annotation new state', () => {
        const container = screen.getByTestId(TestIds.queryEditor.fieldAnnotationNewStateContainer);
        expect(container).toBeInTheDocument();

        const newValue = AnnotationState.NORMAL;
        const containerScreen = within(container);

        fireEvent.click(containerScreen.getByLabelText(TestIds.queryEditor.fieldAnnotationStateOption(newValue)));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationNewState: newValue,
          })
        );
      });
    });

    describe('Default values', () => {
      it('Should not apply value if not mapped for annotation type', () => {
        render(
          <QueryEditor
            datasource={datasource as any}
            query={getQuery({
              requestType: RequestType.ANNOTATIONS,
              annotationType: '123' as any,
            })}
            onRunQuery={onRunQuery}
            onChange={onChange}
          />
        );

        Object.values(AnnotationType).forEach((value) => {
          expect(screen.getByLabelText(TestIds.queryEditor.fieldAnnotationTypeOption(value))).not.toBeChecked();
        });
      });

      it('Should not apply value if not mapped for annotation dashboard', () => {
        render(
          <QueryEditor
            datasource={datasource as any}
            query={getQuery({
              requestType: RequestType.ANNOTATIONS,
              annotationDashboard: '123' as any,
            })}
            onRunQuery={onRunQuery}
            onChange={onChange}
          />
        );

        Object.values(AnnotationDashboard).forEach((value) => {
          expect(screen.getByLabelText(TestIds.queryEditor.fieldAnnotationDashboardOption(value))).not.toBeChecked();
        });
      });

      it('Should not apply value if not mapped for annotation time range', () => {
        render(
          <QueryEditor
            datasource={datasource as any}
            query={getQuery({
              requestType: RequestType.ANNOTATIONS,
              annotationRange: '123' as any,
            })}
            onRunQuery={onRunQuery}
            onChange={onChange}
          />
        );

        Object.values(AnnotationRange).forEach((value) => {
          expect(screen.getByLabelText(TestIds.queryEditor.fieldAnnotationTimeRangeOption(value))).not.toBeChecked();
        });
      });

      it('Should not apply value if not mapped for annotation prev state', () => {
        render(
          <QueryEditor
            datasource={datasource as any}
            query={getQuery({
              requestType: RequestType.ANNOTATIONS,
              annotationType: AnnotationType.ALERT,
              annotationPrevState: '123' as any,
            })}
            onRunQuery={onRunQuery}
            onChange={onChange}
          />
        );

        const elementScreen = within(screen.getByTestId(TestIds.queryEditor.fieldAnnotationPrevStateContainer));

        Object.values(AnnotationState).forEach((value) => {
          expect(elementScreen.getByLabelText(TestIds.queryEditor.fieldAnnotationStateOption(value))).not.toBeChecked();
        });
      });

      it('Should not apply value if not mapped for annotation new state', () => {
        render(
          <QueryEditor
            datasource={datasource as any}
            query={getQuery({
              requestType: RequestType.ANNOTATIONS,
              annotationType: AnnotationType.ALERT,
              annotationNewState: '123' as any,
            })}
            onRunQuery={onRunQuery}
            onChange={onChange}
          />
        );

        const elementScreen = within(screen.getByTestId(TestIds.queryEditor.fieldAnnotationNewStateContainer));

        Object.values(AnnotationState).forEach((value) => {
          expect(elementScreen.getByLabelText(TestIds.queryEditor.fieldAnnotationStateOption(value))).not.toBeChecked();
        });
      });
    });
  });
});
