import { TestIds } from './tests';

/**
 * Data Source test status
 */
export enum DataSourceTestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Request Mode
 */
export enum RequestMode {
  LOCAL = 'local',
  REMOTE = 'remote',
}

/**
 * Request Mode Options
 */
export const RequestModeOptions = [
  {
    label: 'Local',
    value: RequestMode.LOCAL,
    ariaLabel: TestIds.configEditor.fieldRequestModelOption(RequestMode.LOCAL),
  },
  {
    label: 'Remote',
    value: RequestMode.REMOTE,
    ariaLabel: TestIds.configEditor.fieldRequestModelOption(RequestMode.REMOTE),
  },
];
