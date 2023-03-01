import { lastValueFrom } from 'rxjs';
import { Annotation } from 'types/annotation';
import { FieldType, MutableDataFrame, TimeRange } from '@grafana/data';
import { getBackendSrv, getTemplateSrv } from '@grafana/runtime';
import { AnnotationDashboard, AnnotationRange, AnnotationType, Messages, RequestType } from '../constants';
import { Query } from '../types';
import { notifyError } from '../utils';
import { Api } from './api';

/**
 * Get Annotations
 */
export const getAnnotations = async (
  api: Api,
  query: Query,
  range: TimeRange,
  dashboardUID: string | undefined
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
    const pattern = getTemplateSrv().replace(query.annotationPattern);
    annotations = annotations.filter((annotation) => annotation.text?.match(pattern));
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
  dashboardUID: string | undefined
): Promise<MutableDataFrame[]> => {
  const annotations = await getAnnotations(api, query, range, dashboardUID);
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
        values: annotations.map((annotation) => annotation.id),
        type: FieldType.number,
      },
      {
        name: 'Alert Id',
        values: annotations.map((annotation) => annotation.alertId),
        type: FieldType.number,
      },
      {
        name: 'Dashboard Id',
        values: annotations.map((annotation) => annotation.dashboardId),
        type: FieldType.number,
      },
      {
        name: 'Dashboard UID',
        values: annotations.map((annotation) => annotation.dashboardUID),
        type: FieldType.string,
      },
      {
        name: 'Panel Id',
        values: annotations.map((annotation) => annotation.panelId),
        type: FieldType.number,
      },
      {
        name: 'Time',
        values: annotations.map((annotation) => annotation.time),
        type: FieldType.time,
      },
      {
        name: 'Time End',
        values: annotations.map((annotation) => annotation.timeEnd),
        type: FieldType.time,
      },
      {
        name: 'Login',
        values: annotations.map((annotation) => annotation.login),
        type: FieldType.string,
      },
      {
        name: 'Email',
        values: annotations.map((annotation) => annotation.email),
        type: FieldType.string,
      },
      {
        name: 'Avatar URL',
        values: annotations.map((annotation) => annotation.avatarUrl),
        type: FieldType.string,
      },
      {
        name: 'Tags',
        values: annotations.map((annotation) => annotation.tags?.join(',')),
        type: FieldType.string,
      },
      {
        name: 'Text',
        values: annotations.map((annotation) => annotation.text),
        type: FieldType.string,
      },
      {
        name: 'Prev State',
        values: annotations.map((annotation) => annotation.prevState),
        type: FieldType.string,
      },
      {
        name: 'New State',
        values: annotations.map((annotation) => annotation.newState),
        type: FieldType.string,
      },
    ],
  });

  return [frame];
};
