import { lastValueFrom } from 'rxjs';
import { DataSourceSettings, FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages, RequestType } from '../constants';
import { Query } from '../types';
import { notifyError } from '../utils';
import { Api } from './api';

/**
 * Get Data Sources
 */
export const getDataSources = async (api: Api): Promise<DataSourceSettings[]> => {
  /**
   * Fetch
   */
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${api.instanceSettings.url}/api/datasources`,
    })
  );

  /**
   * Check Response
   */
  if (!response || !response.data) {
    notifyError([Messages.error, Messages.api.getDataSourcesFailed]);
    console.error(response);
    return [];
  }

  return response.data as DataSourceSettings[];
};

/**
 * Get Data Sources Frame
 */
export const getDataSourcesFrame = async (api: Api, query: Query): Promise<MutableDataFrame[]> => {
  const datasources = await getDataSources(api);
  if (!datasources.length) {
    return [];
  }

  /**
   * Create frame
   */
  const frame = new MutableDataFrame({
    name: RequestType.DATASOURCES,
    refId: query.refId,
    fields: [
      {
        name: 'Id',
        values: datasources.map((datasource) => datasource.id),
        type: FieldType.number,
      },
      {
        name: 'Org Id',
        values: datasources.map((datasource) => datasource.orgId),
        type: FieldType.number,
      },
      {
        name: 'UID',
        values: datasources.map((datasource) => datasource.uid),
        type: FieldType.string,
      },
      {
        name: 'Name',
        values: datasources.map((datasource) => datasource.name),
        type: FieldType.string,
      },
      {
        name: 'Type',
        values: datasources.map((datasource) => datasource.type),
        type: FieldType.string,
      },
      {
        name: 'Type Logo URL',
        values: datasources.map((datasource) => datasource.typeLogoUrl),
        type: FieldType.string,
      },
      {
        name: 'Type Name',
        values: datasources.map((datasource) => datasource.typeName),
        type: FieldType.string,
      },
      {
        name: 'Is Default',
        values: datasources.map((datasource) => datasource.isDefault),
        type: FieldType.boolean,
      },
      {
        name: 'Read Only',
        values: datasources.map((datasource) => datasource.readOnly),
        type: FieldType.boolean,
      },
      {
        name: 'URL',
        values: datasources.map((datasource) => datasource.url),
        type: FieldType.string,
      },
      {
        name: 'User',
        values: datasources.map((datasource) => datasource.user),
        type: FieldType.string,
      },
    ],
  });

  return [frame];
};
