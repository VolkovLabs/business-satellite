import { lastValueFrom } from 'rxjs';
import { FieldType, formatLabels, Labels, MutableDataFrame, ScopedVars, TimeRange } from '@grafana/data';
import { getBackendSrv, getTemplateSrv } from '@grafana/runtime';
import { AnnotationDashboard, AnnotationRange, AnnotationType, Messages, RequestType } from '../constants';
import { AlertRule, Annotation, Query } from '../types';
import { notifyError } from '../utils';
import { Api } from './api';
import { getAlertRules } from './provisioning';

/**
 * Get Annotations
 */
export const getAnnotations = async (
  api: Api,
  query: Query,
  range: TimeRange,
  dashboardUID: string | undefined,
  scopedVars: ScopedVars
): Promise<Annotation[]> => {
  let params: Record<string, any> = {};

  /**
   * Time Range
   */
  if (query.annotationRange === AnnotationRange.SELECTED) {
    params.from = range.from.valueOf();
    params.to = range.to.valueOf();
  }

  /**
   * Dashboard
   */
  if (query.annotationDashboard === AnnotationDashboard.THIS && dashboardUID) {
    params.dashboardUID = dashboardUID;
  }

  /**
   * Max Limit
   */
  if (query.annotationLimit) {
    params.limit = query.annotationLimit;
  }

  /**
   * Filter Type
   */
  if (query.annotationType === AnnotationType.ALERT) {
    params.type = AnnotationType.ALERT;
  } else if (query.annotationType === AnnotationType.ANNOTATION) {
    params.type = AnnotationType.ANNOTATION;
  }

  /**
   * Fetch
   */
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      params,
      url: `${api.instanceSettings.url}/api/annotations`,
    })
  );

  /**
   * Check Response
   */
  if (!response || !response.data) {
    notifyError([Messages.error, Messages.api.getAnnotationsFailed]);
    console.error(response);
    return [];
  }

  let annotations = response.data as Annotation[];

  /**
   * Filter Pattern
   */
  if (query.annotationPattern) {
    const pattern = getTemplateSrv().replace(query.annotationPattern, scopedVars);
    annotations = annotations.filter((annotation) => annotation.text?.match(pattern));
  }

  /**
   * Filter Prev State
   */
  if (query.annotationPrevState) {
    annotations = annotations.filter((annotation) => annotation.prevState === query.annotationPrevState);
  }

  /**
   * Filter New State
   */
  if (query.annotationNewState) {
    annotations = annotations.filter((annotation) => annotation.newState === query.annotationNewState);
  }

  return annotations;
};

/**
 * Get Annotations Frame
 */
export const getAnnotationsFrame = async (
  api: Api,
  query: Query,
  range: TimeRange,
  dashboardUID: string | undefined,
  scopedVars: ScopedVars
): Promise<MutableDataFrame[]> => {
  const annotations = await getAnnotations(api, query, range, dashboardUID, scopedVars);
  if (!annotations.length) {
    return [];
  }

  /**
   * Create frame
   */
  const frame = new MutableDataFrame({
    name: RequestType.ANNOTATIONS,
    refId: query.refId,
    fields: [
      {
        name: 'Id',
        type: FieldType.number,
      },
      {
        name: 'Alert Id',
        type: FieldType.number,
      },
      {
        name: 'Alert Name',
        type: FieldType.string,
      },
      {
        name: 'Alert UID',
        type: FieldType.string,
      },
      {
        name: 'Dashboard Id',
        type: FieldType.number,
      },
      {
        name: 'Dashboard UID',
        type: FieldType.string,
      },
      {
        name: 'Panel Id',
        type: FieldType.number,
      },
      {
        name: 'Time',
        type: FieldType.time,
      },
      {
        name: 'Time End',
        type: FieldType.time,
      },
      {
        name: 'Login',
        type: FieldType.string,
      },
      {
        name: 'Email',
        type: FieldType.string,
      },
      {
        name: 'Avatar URL',
        type: FieldType.string,
      },
      {
        name: 'Tags',
        type: FieldType.string,
      },
      {
        name: 'Text',
        type: FieldType.string,
      },
      {
        name: 'Prev State',
        type: FieldType.string,
      },
      {
        name: 'New State',
        type: FieldType.string,
      },
      {
        name: 'Labels',
        type: FieldType.string,
      },
    ],
  });

  /**
   * Alert Rules
   */
  const alertRules: { [id: number]: AlertRule } = {};
  const rules = await getAlertRules(api).catch(() => []);
  rules.forEach((rule) => (alertRules[rule.id] = rule));

  /**
   * Add Data
   */
  annotations.forEach((annotation) => {
    let formattedLabels = '{}';
    const text = annotation.text?.match(/{([^}]+)}/);

    /**
     * Parse Labels
     */
    if (text?.length && text[1]) {
      const labels = {} as Labels;
      const pairs = text[1].split(', ');

      pairs.forEach((pair) => {
        const keyValue = pair.split('=');
        if (!keyValue.length) {
          return;
        }

        labels[keyValue[0]] = keyValue[1] ? keyValue[1] : '';
      });

      formattedLabels = formatLabels(labels);
    }

    let alertTitle = '';
    let alertUID = '';
    if (annotation.alertId) {
      alertTitle = alertRules[annotation.alertId] ? alertRules[annotation.alertId].title : '';
      alertUID = alertRules[annotation.alertId] ? alertRules[annotation.alertId].uid : '';
    }

    const row = [
      annotation.id,
      annotation.alertId,
      alertTitle,
      alertUID,
      annotation.dashboardId,
      annotation.dashboardUID,
      annotation.panelId,
      annotation.time,
      annotation.timeEnd,
      annotation.login,
      annotation.email,
      annotation.avatarUrl,
      annotation.tags?.join(','),
      annotation.text,
      annotation.prevState,
      annotation.newState,
      formattedLabels,
    ];

    frame.appendRow(row);
  });

  return [frame];
};
