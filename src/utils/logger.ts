/**
 * Logger
 */
const createLogger = (name: string, logType: 'log' | 'error' | 'warn' = 'log') => {
  return {
    log: (...args: unknown[]) => {
      // eslint-disable-next-line no-console
      const logCommand = console[logType];
      logCommand(`[${name}]: ${args}`);
    },
  };
};

export const errorLogger = createLogger('Error', 'error');
