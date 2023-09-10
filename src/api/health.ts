import { lastValueFrom } from 'rxjs';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages, RequestType } from '../constants';
import { Health as HealthType, Query } from '../types';
import { notifyError } from '../utils';
import { BaseApi } from './base';

/**
 * Health Api
 */
export class Health extends BaseApi {
  /**
   * Get Health
   */
  get = async (): Promise<HealthType | undefined> => {
    const response = await lastValueFrom(
      getBackendSrv().fetch({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/health`,
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      notifyError([Messages.error, Messages.api.getHealthFailed]);
      return;
    }

    /**
     * Data received
     */
    return response.data as HealthType;
  };

  /**
   * Get Health Frame
   */
  getFrame = async (query: Query): Promise<MutableDataFrame[]> => {
    const health = await this.get();
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
          type: FieldType.string,
        },
        {
          name: 'Database',
          type: FieldType.string,
        },
        {
          name: 'Version',
          type: FieldType.string,
        },
      ],
    });

    /**
     * Add Data
     */
    frame.appendRow([health.commit, health.database, health.version]);

    return [frame];
  };
}
