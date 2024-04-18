/**
 * Alert Rule
 */
export interface AlertRule {
  /**
   * Id
   *
   * @type {number}
   */
  id: number;

  /**
   * UID
   *
   * @type {string}
   */
  uid: string;

  /**
   * Org Id
   *
   * @type {number}
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  orgID: number;

  /**
   * Rule Group
   *
   * @type {string}
   */
  ruleGroup: string;

  /**
   * Title
   *
   * @type {string}
   */
  title: string;

  /**
   * Updated
   *
   * @type {string}
   */
  updated: string;

  /**
   * Folder UID
   *
   * @type {string}
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  folderUID: string;

  /**
   * Is Paused
   *
   * @type {boolean}
   */
  isPaused: boolean;

  /**
   * For
   *
   * @type {string}
   */
  for: string;
}
