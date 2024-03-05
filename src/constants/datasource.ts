import { RequestMode } from '../types';
import { TEST_IDS } from './tests';

/**
 * Request Mode Options
 */
export const REQUEST_MODE_OPTIONS = [
  {
    label: 'Local',
    value: RequestMode.LOCAL,
    ariaLabel: TEST_IDS.configEditor.fieldRequestModelOption(RequestMode.LOCAL),
  },
  {
    label: 'Remote',
    value: RequestMode.REMOTE,
    ariaLabel: TEST_IDS.configEditor.fieldRequestModelOption(RequestMode.REMOTE),
  },
];
