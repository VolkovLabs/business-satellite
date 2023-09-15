/**
 * Create No Supported Method
 */
const createNoSupportedMethod = (message: string) => () => Promise.reject(new Error(message));

/**
 * Create Feature Method
 * @param method
 * @param isEnabled
 * @param noSupportedMessage
 */
export const createFeatureMethod = <TMethod>(
  method: TMethod,
  isEnabled = true,
  noSupportedMessage = 'Feature is not available.'
): TMethod => {
  if (isEnabled) {
    return method;
  }

  return createNoSupportedMethod(noSupportedMessage) as TMethod;
};
