/**
 * Disable naming convention for api objects
 */
/* eslint-disable @typescript-eslint/naming-convention */

export enum AlertInstanceTotalState {
  ALERTING = 'alerting',
  PENDING = 'pending',
  NORMAL = 'inactive',
  NO_DATA = 'nodata',
  ERROR = 'error',
}

/**
 * AlertGroupTotals also contain the amount of recording and paused rules
 */
export type AlertGroupTotals = Partial<Record<AlertInstanceTotalState | 'paused' | 'recording', number>>;

export type Labels = Record<string, string>;
export type Annotations = Record<string, string>;

export enum PromAlertingRuleState {
  FIRING = 'firing',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export enum GrafanaAlertState {
  NORMAL = 'Normal',
  ALERTING = 'Alerting',
  PENDING = 'Pending',
  NO_DATA = 'NoData',
  ERROR = 'Error',
}

type GrafanaAlertStateReason = ` (${string})` | '';

export type GrafanaAlertStateWithReason = `${GrafanaAlertState}${GrafanaAlertStateReason}`;

export enum PromRuleType {
  ALERTING = 'alerting',
  RECORDING = 'recording',
}

interface PromRuleDTOBase {
  health: string;
  name: string;
  query: string; // expr
  evaluationTime?: number;
  lastEvaluation?: string;
  lastError?: string;
}

export interface PromAlertingRuleDTO extends PromRuleDTOBase {
  alerts?: Array<{
    labels: Labels;
    annotations: Annotations;
    state: Exclude<PromAlertingRuleState | GrafanaAlertStateWithReason, PromAlertingRuleState.INACTIVE>;
    activeAt: string;
    value: string;
  }>;
  labels: Labels;
  annotations?: Annotations;
  duration?: number; // for
  state: PromAlertingRuleState;
  type: PromRuleType.ALERTING;
}

export interface PromRecordingRuleDTO extends PromRuleDTOBase {
  health: string;
  name: string;
  query: string; // expr
  type: PromRuleType.RECORDING;
  labels?: Labels;
}

export type PromRuleDTO = PromAlertingRuleDTO | PromRecordingRuleDTO;

export interface PromRuleGroupDTO {
  name: string;
  file: string;
  rules: PromRuleDTO[];
  interval: number;

  evaluationTime?: number; // these 2 are not in older prometheus payloads
  lastEvaluation?: string;
}

export interface PromResponse<T> {
  status: 'success' | 'error' | ''; // mocks return empty string
  data: T;
  errorType?: string;
  error?: string;
  warnings?: string[];
}

export type PromRulesResponse = PromResponse<{
  groups: PromRuleGroupDTO[];
  totals?: AlertGroupTotals;
}>;

export interface Alert {
  /**
   * Group
   *
   * @type {string}
   */
  group: string;

  /**
   * Rule
   *
   * @type {string}
   */
  rule: string;

  /**
   * Active At
   *
   * @type {string}
   */
  activeAt: string;

  /**
   * Labels
   *
   * @type {Labels}
   */
  labels: Labels;

  /**
   * State
   *
   * @type {GrafanaAlertState}
   */
  state: GrafanaAlertState;

  /**
   * State Duration
   *
   * @type {number}
   */
  stateDuration: number;
}
