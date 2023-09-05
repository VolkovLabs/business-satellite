import { UserProps } from '@grafana/data';

/**
 * User
 */
export interface User extends UserProps {
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
   * Is Admin
   *
   * @type {boolean}
   */
  isAdmin: boolean;

  /**
   * Is Disabled
   *
   * @type {boolean}
   */
  isDisabled: boolean;

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
   * Name
   *
   * @type {string}
   */
  name: string;
}
