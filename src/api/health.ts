import { lastValueFrom } from 'rxjs';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages, RequestType } from '../constants';
import { Health, Query } from '../types';
import { notifyError } from '../utils';
import { Api } from './api';

/**
 * Get Health
 */
export const getHealth = async (api: Api): Promise<Health | undefined> => {
  const response = await lastValueFrom(
    getBackendSrv().fetch({
      method: 'GET',
      url: `${api.instanceSettings.url}/api/health`,
    })
  );

  /**
   * Check Response
   */
  if (!response || !response.data) {
    notifyError([Messages.error, Messages.api.getHealthFailed]);
    console.error(response);
    return;
  }

  /**
   * Data received
   */
  return response.data as Health;
};

/**
 * Get Health Frame
 */
export const getHealthFrame = async (api: Api, query: Query): Promise<MutableDataFrame[]> => {
  const health = await getHealth(api);
  if (!health?.version) {
    return [];
  }

  /**
   * Create frame
   */
  const frame = new MutableDataFrame({
    name: RequestType.HEALTH,
    refId: query.refId,
    fields: [
      {
        name: 'Commit',
        values: [health.commit],
        type: FieldType.string,
      },
      {
        name: 'Database',
        values: [health.database],
        type: FieldType.string,
      },
      {
        name: 'Version',
        values: [health.version],
        type: FieldType.string,
      },
    ],
  });

  return [frame];
};
