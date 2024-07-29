import { DataFrame, FieldType } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { lastValueFrom } from 'rxjs';

import { MESSAGES } from '../constants';
import { Alert, AlertingQuery, GrafanaAlertState, PromRulesResponse, Query, RequestType } from '../types';
import { convertToFrame, notifyError } from '../utils';
import { BaseApi } from './base';

/**
 * Alerts Api
 */
export class Alerting extends BaseApi {
  /**
   * Get Alerts
   */
  getAlerts = async ({ state, limit }: AlertingQuery): Promise<Alert[]> => {
    /**
     * Fetch
     */
    const response = await lastValueFrom(
      getBackendSrv().fetch<PromRulesResponse>({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/prometheus/grafana/api/v1/rules`,
        params: {
          state,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          limit_alerts: limit,
        },
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      notifyError([MESSAGES.error, MESSAGES.api.alertingGetAlertsFailed]);
      return [];
    }

    const { groups } = response.data.data;

    const alerts: Alert[] = [];
    const timestamp = new Date().valueOf();

    groups.filter((group) => {
      group.rules.forEach((rule) => {
        if ('alerts' in rule) {
          rule.alerts?.forEach((item) => {
            alerts.push({
              group: group.name,
              activeAt: item.activeAt,
              rule: rule.name,
              labels: item.labels,
              state: item.state as GrafanaAlertState,
              stateDuration: Math.floor((timestamp - new Date(item.activeAt).valueOf()) / 1000),
            });
          });
        }
      });
    });

    return alerts;
  };

  /**
   * Get Alerts Frame
   */
  getAlertsFrame = async (query: Query): Promise<DataFrame[]> => {
    const alerts = await this.api.features.alerting.getAlerts(query.alerting || { state: [], limit: 100 });
    if (!alerts.length) {
      return [];
    }

    /**
     * Create Frame
     */
    const frame = convertToFrame<Alert>({
      name: RequestType.ALERTING_ALERTS,
      refId: query.refId,
      fields: [
        {
          name: 'Group',
          type: FieldType.string,
          getValue: (item) => item.group,
        },
        {
          name: 'Rule',
          type: FieldType.string,
          getValue: (item) => item.rule,
        },
        {
          name: 'Active At',
          type: FieldType.time,
          getValue: (item) => item.activeAt,
        },
        {
          name: 'Labels',
          type: FieldType.other,
          getValue: (item) => item.labels,
        },
        {
          name: 'State',
          type: FieldType.enum,
          getValue: (item) => item.state,
        },
        {
          name: 'Duration',
          type: FieldType.number,
          getValue: (item) => item.stateDuration,
        },
      ],
      items: alerts,
    });

    return [frame];
  };
}
