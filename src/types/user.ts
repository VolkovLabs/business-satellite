import { UserOrgDTO } from '@grafana/data';

/**
 * User
 */
export interface OrgUser extends UserOrgDTO {
  /**
   * Access Control
   */
  accessControl: object;

  /**
   * Auth Labels
   *
   * @type {string[]}
   */
  authLabels: string[];

  /**
   * Avatar Url
   *
   * @type {string}
   */
  avatarUrl: string;

  /**
   * Is Disabled
   *
   * @type {boolean}
   */
  isDisabled: boolean;

  /**
   * Is Externally Synced
   *
   * @type {boolean}
   */
  isExternallySynced: boolean;

  /**
   * Last Seen At
   *
   * @type {string}
   */
  lastSeenAt: string;

  /**
   * Last Seen At Age
   *
   * @type {string}
   */
  lastSeenAtAge: string;

  /**
   * Login
   *
   * @type {string}
   */
  login: string;

  /**
   * User Id
   *
   * @type {string}
   */
  userId: number;
}
