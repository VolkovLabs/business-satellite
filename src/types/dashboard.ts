/**
 * Dashboard Meta
 */
export interface DashboardMeta {
  /**
   * ID
   *
   * @type {number}
   */
  id: number;

  /**
   * Is Starred
   *
   * @type {boolean}
   */
  isStarred: boolean;

  /**
   * Slug
   *
   * @type {string}
   */
  slug: string;

  /**
   * Sort Meta
   *
   * @type {number}
   */
  sortMeta: number;

  /**
   * Tags
   *
   * @type {string[]}
   */
  tags: string[];

  /**
   * Title
   *
   * @type {string}
   */
  title: 'Test';

  /**
   * Type
   *
   * @type {'dash-db'}
   */
  type: 'dash-db';

  /**
   * UID
   *
   * @type {string}
   */
  uid: string;

  /**
   * Uri
   *
   * @type {string}
   */
  uri: string;

  /**
   * Url
   *
   * @type {string}
   */
  url: string;
}
