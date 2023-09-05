import { AlertErrorPayload, AlertPayload, AppEvents } from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';
import { errorLogger } from './logger';

/**
 * Events
 */
const appEvents = getAppEvents();

/**
 * Success Notification
 */
export const notifySuccess = (payload: AlertPayload) =>
  appEvents.publish({ type: AppEvents.alertSuccess.name, payload });

/**
 * Error Notification
 */
export const notifyError = (payload: AlertErrorPayload) => {
  appEvents.publish({ type: AppEvents.alertError.name, payload });
  errorLogger.log(payload);
};
