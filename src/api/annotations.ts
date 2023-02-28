import { lastValueFrom } from 'rxjs';
import { AnnotationEvent, FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { RequestTypeValue } from '../constants';
import { Query } from '../types';
import { Api } from './api';

/**
 * Get Annotations
 */
export async function getAnnotations(this: Api): Promise<AnnotationEvent[]> {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${this.instanceSettings.url}/api/annotations`,
      responseType: 'json',
    })
  ).catch((e) => {
    console.error(e.statusText);
  });

  /**
   * Check Response
   */
  if (!response || !response.data) {
    console.error('Get Annotations: API Request failed', response);
    return [];
  }

  return response.data as AnnotationEvent[];
}

/**
 * Get Annotations Frame
 */
export async function getAnnotationsFrame(this: Api, query: Query): Promise<MutableDataFrame[]> {
  const annotations = await this.getAnnotations();
  if (!annotations.length) {
    return [];
  }

  /**
   * Create frame
   */
  const frame = new MutableDataFrame({
    name: RequestTypeValue.ANNOTATIONS,
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
    ],
  });

  return [frame];
}
