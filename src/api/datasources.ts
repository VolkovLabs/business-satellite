import { DataFrame, DataSourceSettings, FieldType } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';

import { MESSAGES } from '../constants';
import { DataSourceHealthMessage, FieldMapper, Query, RequestType } from '../types';
import { convertToFrame, notifyError } from '../utils';
import { BaseApi } from './base';

/**
 * Data Sources Api
 */
export class DataSources extends BaseApi {
  /**
   * Get Data Sources
   */
  getAll = async (): Promise<DataSourceSettings[]> => {
    /**
     * Fetch
     */
    const response = await lastValueFrom(
      getBackendSrv().fetch<DataSourceSettings[]>({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/datasources`,
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      notifyError([MESSAGES.error, MESSAGES.api.getDataSourcesFailed]);
      return [];
    }

    return response.data;
  };

  /**
   * Get Health Status
   */
  private getHealthStatus = async (id: string): Promise<number> => {
    /**
     * Fetch
     */
    const response = await lastValueFrom(
      getBackendSrv().fetch<DataSourceHealthMessage>({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/datasources/uid/${id}/health`,
      })
    ).catch((reason) => reason);

    return response?.status || 500;
  };

  /**
   * Get Data Sources Frame
   */
  getFrame = async (query: Query): Promise<DataFrame[]> => {
    const datasources = await this.getAll();

    if (!datasources.length) {
      return [];
    }

    const datasourcesHealth = query.datasourceHealth
      ? await Promise.all(datasources.map((datasource) => this.getHealthStatus(datasource.uid)))
      : [];

    const fields: Array<FieldMapper<{ ds: DataSourceSettings; health: number }>> = [
      {
        name: 'Id',
        type: FieldType.number,
        getValue: (item) => item.ds.id,
      },
      {
        name: 'Org Id',
        type: FieldType.number,
        getValue: (item) => item.ds.orgId,
      },
      {
        name: 'UID',
        type: FieldType.string,
        getValue: (item) => item.ds.uid,
      },
      {
        name: 'Name',
        type: FieldType.string,
        getValue: (item) => item.ds.name,
      },
      {
        name: 'Type',
        type: FieldType.string,
        getValue: (item) => item.ds.type,
      },
      {
        name: 'Type Logo URL',
        type: FieldType.string,
        getValue: (item) => item.ds.typeLogoUrl,
      },
      {
        name: 'Type Name',
        type: FieldType.string,
        getValue: (item) => item.ds.typeName,
      },
      {
        name: 'Is Default',
        type: FieldType.boolean,
        getValue: (item) => item.ds.isDefault,
      },
      {
        name: 'Read Only',
        type: FieldType.boolean,
        getValue: (item) => item.ds.readOnly,
      },
      {
        name: 'URL',
        type: FieldType.string,
        getValue: (item) => item.ds.url,
      },
      {
        name: 'User',
        type: FieldType.string,
        getValue: (item) => item.ds.user,
      },
    ];

    if (query.datasourceHealth) {
      fields.push({
        name: 'Health Status',
        type: FieldType.number,
        getValue: (item) => item.health,
      });
    }

    /**
     * Create Frame
     */
    const frame = convertToFrame<{ ds: DataSourceSettings; health: number }>({
      name: RequestType.DATASOURCES,
      refId: query.refId,
      fields,
      items: datasources.map((ds, index) => ({
        ds,
        health: datasourcesHealth[index],
      })),
    });

    return [frame];
  };
}
