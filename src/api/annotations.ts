import { lastValueFrom } from 'rxjs';
import { Annotation } from 'types/annotation';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages, RequestTypeValue } from '../constants';
import { Query } from '../types';
import { Api } from './api';

/**
 * Get Annotations
 */
export const getAnnotations = async (api: Api): Promise<Annotation[]> => {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${api.instanceSettings.url}/api/annotations`,
      responseType: 'json',
    })
  );

  /**
   * Check Response
   */
  if (!response || !response.data) {
    console.error(Messages.api.getAnnotationsFailed, response);
    return [];
  }

  return response.data as Annotation[];
};

/**
 * Get Annotations Frame
 */
export const getAnnotationsFrame = async (api: Api, query: Query): Promise<MutableDataFrame[]> => {
  const annotations = await getAnnotations(api);
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
