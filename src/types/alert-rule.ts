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
