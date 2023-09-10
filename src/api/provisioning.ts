import { lastValueFrom } from 'rxjs';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages, RequestType } from '../constants';
import { AlertRule, Query } from '../types';
import { convertToFrame, notifyError } from '../utils';
import { BaseApi } from './base';

/**
 * Provisioning Api
 */
export class Provisioning extends BaseApi {
  /**
   * Get Alert Rules
   */
  getAlertRules = async (): Promise<AlertRule[]> => {
    /**
     * Fetch
     */
    const response = await lastValueFrom(
      getBackendSrv().fetch<AlertRule[]>({
        method: 'GET',
        url: `${this.api.instanceSettings.url}/api/v1/provisioning/alert-rules`,
      })
    );

    /**
     * Check Response
     */
    if (!response || !response.data) {
      notifyError([Messages.error, Messages.api.getAlertRulesFailed]);
      return [];
    }

    return response.data;
  };

  /**
   * Get Alert Rules Frame
   */
  getAlertRulesFrame = async (query: Query): Promise<MutableDataFrame[]> => {
    const rules = await this.getAlertRules();
    if (!rules.length) {
      return [];
    }

    /**
     * Create frame
     */
    const frame = convertToFrame<AlertRule>({
      name: RequestType.ALERT_RULES,
      refId: query.refId,
      fields: [
        {
          name: 'Id',
          type: FieldType.number,
          getValue: (item) => item.id,
        },
        {
          name: 'UID',
          type: FieldType.string,
          getValue: (item) => item.uid,
        },
        {
          name: 'Org Id',
          type: FieldType.number,
          getValue: (item) => item.orgID,
        },
        {
          name: 'Rule Group',
          type: FieldType.string,
          getValue: (item) => item.ruleGroup,
        },
        {
          name: 'Title',
          type: FieldType.string,
          getValue: (item) => item.title,
        },
        {
          name: 'Updated',
          type: FieldType.time,
          getValue: (item) => item.updated,
        },
        {
          name: 'Folder UID',
          type: FieldType.string,
          getValue: (item) => item.folderUID,
        },
        {
          name: 'Paused',
          type: FieldType.boolean,
          getValue: (item) => item.isPaused,
        },
        {
          name: 'Evaluate For',
          type: FieldType.string,
          getValue: (item) => item.for,
        },
      ],
      items: rules,
    });

    return [frame];
  };
}
