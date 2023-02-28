/**
 * Health Status
 */
export interface Health {
  /**
   * Version
   *
   * @type {string}
   */
  version: string;

  /**
   * Commit
   *
   * @type {string}
   */
  commit: string;

  /**
   * Database Status
   *
   * @type {string}
   */
  database: string;
}
