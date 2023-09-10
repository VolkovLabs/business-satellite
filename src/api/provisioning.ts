import { lastValueFrom } from 'rxjs';
import { FieldType, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { Messages, RequestType } from '../constants';
import { AlertRule, Query } from '../types';
import { notifyError } from '../utils';
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
      getBackendSrv().fetch({
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

    return response.data as AlertRule[];
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
    const frame = new MutableDataFrame({
      name: RequestType.ALERT_RULES,
      refId: query.refId,
      fields: [
        {
          name: 'Id',
          type: FieldType.number,
        },
        {
          name: 'UID',
          type: FieldType.string,
        },
        {
          name: 'Org Id',
          type: FieldType.number,
        },
        {
          name: 'Rule Group',
          type: FieldType.string,
        },
        {
          name: 'Title',
          type: FieldType.string,
        },
        {
          name: 'Updated',
          type: FieldType.time,
        },
        {
          name: 'Folder UID',
          type: FieldType.string,
        },
        {
          name: 'Paused',
          type: FieldType.boolean,
        },
        {
          name: 'Evaluate For',
          type: FieldType.string,
        },
      ],
    });

    /**
     * Add Data
     */
    rules.forEach((rule) => {
      frame.appendRow([
        rule.id,
        rule.uid,
        rule.orgID,
        rule.ruleGroup,
        rule.title,
        rule.updated,
        rule.folderUID,
        rule.isPaused,
        rule.for,
      ]);
    });

    return [frame];
  };
}
