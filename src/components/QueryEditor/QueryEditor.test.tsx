import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import { DEFAULT_QUERY, TEST_IDS } from '../../constants';
import {
  AlertInstanceTotalState,
  AnnotationDashboard,
  AnnotationRange,
  AnnotationState,
  AnnotationType,
  FavoritesType,
  Query,
  RequestType,
} from '../../types';
import { getAllAnnotationsTags, getAllDashboardsTags } from '../../utils';
import { QueryEditor } from './QueryEditor';

/**
 * Mock utils
 */
jest.mock('../../utils', () => {
  const actualUtils = jest.requireActual('../../utils');
  return {
    ...actualUtils,
    getAllAnnotationsTags: jest.fn(),
    getAllDashboardsTags: jest.fn(),
  };
});

/**
 * Get Query with default values and ability to override
 *
 * @param overrideQuery
 */
export const getQuery = (overrideQuery: Partial<Query> = {}): Query => ({
  requestType: DEFAULT_QUERY.requestType,
  refId: 'A',
  alerting: {
    state: [],
  },
  ...overrideQuery,
});

/**
 * Query Editor
 */
describe('QueryEditor', () => {
  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(TEST_IDS.queryEditor);
  const selectors = getSelectors(screen);

  /**
   * Annotation tags
   */
  const mockAnnotationTags = [
    {
      tag: 'new',
      count: 1,
    },
    {
      tag: 'old',
      count: 2,
    },
  ];

  const mockTags = [
    {
      term: 'metric',
      count: 1,
    },
    {
      term: 'live',
      count: 2,
    },
  ];

  const onRunQuery = jest.fn();
  const onChange = jest.fn();

  beforeEach(() => {
    onRunQuery.mockReset();
    onChange.mockReset();

    jest.mocked(getAllAnnotationsTags).mockResolvedValue(mockAnnotationTags);
    jest.mocked(getAllDashboardsTags).mockResolvedValue(mockTags);
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

      const fieldRequest = selectors.fieldRequest();

      expect(fieldRequest).toHaveValue(RequestType.ALERT_RULES);

      /**
       * OnChange
       */
      await act(async () => fireEvent.change(fieldRequest, { target: { value: RequestType.NONE } }));

      expect(onChange).toHaveBeenCalledWith({
        ...query,
        requestType: RequestType.NONE,
      });
    });
  });

  /**
   * Dashboards
   */
  describe('Dashboards params', () => {
    const onChange = jest.fn();

    beforeEach(async () => {
      onChange.mockClear();

      const query = getQuery({
        requestType: RequestType.DASHBOARDS_META,
      });

      await act(async () => {
        render(
          <QueryEditor datasource={datasource as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />
        );
      });
    });

    it('Should allow change Favorites type', () => {
      expect(selectors.fieldDashboardsFavorites()).toBeInTheDocument();

      fireEvent.change(selectors.fieldDashboardsFavorites(), {
        target: { value: FavoritesType.FAVORITES_WITH_DEFAULT },
      });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          dashboardFavorites: FavoritesType.FAVORITES_WITH_DEFAULT,
        })
      );
    });

    it('Should allow change tags for dashboards if one value', () => {
      expect(selectors.fieldDashboardsTags()).toBeInTheDocument();

      fireEvent.change(selectors.fieldDashboardsTags(), {
        target: { values: 'label' },
      });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          dashboardTags: ['label'],
        })
      );
    });

    it('Should allow change tags for dashboards if array value', () => {
      expect(selectors.fieldDashboardsTags()).toBeInTheDocument();

      fireEvent.change(selectors.fieldDashboardsTags(), {
        target: { values: ['metric', 'live'] },
      });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          dashboardTags: ['metric', 'live'],
        })
      );
    });
  });
  /**
   * Annotations
   */
  describe('Annotations', () => {
    const onChange = jest.fn();

    describe('Non Alert annotations', () => {
      beforeEach(async () => {
        onChange.mockClear();

        const query = getQuery({
          requestType: RequestType.ANNOTATIONS,
        });

        await act(async () => {
          render(
            <QueryEditor datasource={datasource as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />
          );
        });
      });

      it('Should render and update annotation type', () => {
        expect(selectors.fieldAnnotationTypeContainer()).toBeInTheDocument();

        const newValue = AnnotationType.ANNOTATION;
        fireEvent.click(selectors.fieldAnnotationTypeOption(false, newValue));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationType: newValue,
          })
        );
      });

      it('Should render and update annotation tags if array value', () => {
        expect(selectors.fieldAnnotationTags()).toBeInTheDocument();

        fireEvent.change(selectors.fieldAnnotationTags(), {
          target: { values: ['new', 'old'] },
        });

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationTags: ['new', 'old'],
          })
        );
      });

      it('Should render and update annotation tags if one value', () => {
        expect(selectors.fieldAnnotationTags()).toBeInTheDocument();

        fireEvent.change(selectors.fieldAnnotationTags(), {
          target: { values: 'label' },
        });

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationTags: ['label'],
          })
        );
      });

      it('Should render and update annotation dashboard', () => {
        expect(selectors.fieldAnnotationDashboardContainer()).toBeInTheDocument();

        const newValue = AnnotationDashboard.THIS;
        fireEvent.click(selectors.fieldAnnotationDashboardOption(false, newValue));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationDashboard: newValue,
          })
        );
      });

      it('Should render and update annotation rules', () => {
        expect(selectors.fieldAnnotationRulesContainer()).toBeInTheDocument();

        const newValue = false;
        fireEvent.click(selectors.fieldAnnotationRulesOption(false, newValue));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationRules: newValue,
          })
        );
      });

      it('Should render and update annotation range', () => {
        expect(selectors.fieldAnnotationTimeRangeContainer()).toBeInTheDocument();

        const newValue = AnnotationRange.SELECTED;
        fireEvent.click(selectors.fieldAnnotationTimeRangeOption(false, newValue));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationRange: newValue,
          })
        );
      });

      it('Should not render fields for Alert type', () => {
        expect(selectors.fieldAnnotationPrevStateContainer(true)).not.toBeInTheDocument();
        expect(selectors.fieldAnnotationNewStateContainer(true)).not.toBeInTheDocument();
      });

      it('Should render and update annotation pattern', () => {
        expect(selectors.fieldAnnotationPattern()).toBeInTheDocument();

        const newValue = '123';
        fireEvent.change(selectors.fieldAnnotationPattern(), {
          target: { value: newValue },
        });

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationPattern: newValue,
          })
        );
      });

      it('Should render and update annotation limit', () => {
        expect(selectors.fieldAnnotationLimit()).toBeInTheDocument();

        const newValue = '123';
        fireEvent.change(selectors.fieldAnnotationLimit(), {
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
      beforeEach(async () => {
        onChange.mockClear();

        const query = getQuery({
          requestType: RequestType.ANNOTATIONS,
          annotationType: AnnotationType.ALERT,
        });

        await act(async () => {
          render(
            <QueryEditor datasource={datasource as any} query={query} onRunQuery={onRunQuery} onChange={onChange} />
          );
        });
      });

      it('Should render and update annotation prev state', () => {
        const container = selectors.fieldAnnotationPrevStateContainer();
        expect(container).toBeInTheDocument();

        const newValue = AnnotationState.PENDING;
        const containerSelectors = getSelectors(within(container));

        fireEvent.click(containerSelectors.fieldAnnotationStateOption(false, newValue));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationPrevState: newValue,
          })
        );
      });

      it('Should render and update annotation new state', () => {
        const container = selectors.fieldAnnotationNewStateContainer();
        expect(container).toBeInTheDocument();

        const newValue = AnnotationState.NORMAL;
        const containerSelectors = getSelectors(within(container));

        fireEvent.click(containerSelectors.fieldAnnotationStateOption(false, newValue));

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            annotationNewState: newValue,
          })
        );
      });
    });

    describe('Default values', () => {
      it('Should not apply value if not mapped for annotation type', async () => {
        await act(async () => {
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
        });
        Object.values(AnnotationType).forEach((value) => {
          expect(selectors.fieldAnnotationTypeOption(false, value)).not.toBeChecked();
        });
      });

      it('Should not apply value if not mapped for annotation dashboard', async () => {
        await act(async () => {
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
        });

        Object.values(AnnotationDashboard).forEach((value) => {
          expect(selectors.fieldAnnotationDashboardOption(false, value)).not.toBeChecked();
        });
      });

      it('Should not apply value if not mapped for annotation time range', async () => {
        await act(async () => {
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
        });

        Object.values(AnnotationRange).forEach((value) => {
          expect(selectors.fieldAnnotationTimeRangeOption(false, value)).not.toBeChecked();
        });
      });

      it('Should not apply value if not mapped for annotation prev state', async () => {
        await act(async () => {
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
        });

        const elementSelectors = getSelectors(within(selectors.fieldAnnotationPrevStateContainer()));

        Object.values(AnnotationState).forEach((value) => {
          expect(elementSelectors.fieldAnnotationStateOption(false, value)).not.toBeChecked();
        });
      });

      it('Should not apply value if not mapped for annotation new state', async () => {
        await act(async () => {
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
        });

        const elementSelectors = getSelectors(within(selectors.fieldAnnotationNewStateContainer()));

        Object.values(AnnotationState).forEach((value) => {
          expect(elementSelectors.fieldAnnotationStateOption(false, value)).not.toBeChecked();
        });
      });
    });
  });

  /**
   * Data Sources
   */
  describe('Data Sources', () => {
    const onChange = jest.fn();

    it('Should allow to update check health', async () => {
      await act(async () => {
        render(
          <QueryEditor
            datasource={datasource as any}
            query={
              {
                requestType: RequestType.DATASOURCES,
                datasourceHealth: false,
              } as any
            }
            onRunQuery={onRunQuery}
            onChange={onChange}
          />
        );
      });

      expect(selectors.fieldDatasourcesCheckHealth()).toBeInTheDocument();

      const enabledOption = getSelectors(within(selectors.fieldDatasourcesCheckHealth())).option(false, 'true');
      expect(enabledOption).toBeInTheDocument();

      fireEvent.click(enabledOption);

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          datasourceHealth: true,
        })
      );
    });
  });

  describe('Alerting', () => {
    it('Should allow to change state', async () => {
      const onChange = jest.fn();

      await act(async () => {
        render(
          <QueryEditor
            datasource={datasource as any}
            query={
              {
                requestType: RequestType.ALERTING_ALERTS,
              } as any
            }
            onRunQuery={onRunQuery}
            onChange={onChange}
          />
        );
      });

      expect(selectors.fieldAlertingState()).toBeInTheDocument();

      fireEvent.change(selectors.fieldAlertingState(), {
        target: { values: [AlertInstanceTotalState.ALERTING, AlertInstanceTotalState.PENDING] },
      });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          alerting: expect.objectContaining({
            state: [AlertInstanceTotalState.ALERTING, AlertInstanceTotalState.PENDING],
          }),
        })
      );
    });

    it('Should allow to change limit', async () => {
      const onChange = jest.fn();
      await act(async () => {
        render(
          <QueryEditor
            datasource={datasource as any}
            query={
              {
                requestType: RequestType.ALERTING_ALERTS,
                alerting: {
                  limit: 5,
                },
              } as any
            }
            onRunQuery={onRunQuery}
            onChange={onChange}
          />
        );
      });

      expect(selectors.fieldAlertingLimit()).toBeInTheDocument();

      fireEvent.change(selectors.fieldAlertingLimit(), {
        target: { value: '10' },
      });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          alerting: expect.objectContaining({
            limit: 10,
          }),
        })
      );
    });
  });
});
