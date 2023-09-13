/**
 * No Supported Method
 */
const noSupportedMethod = () => Promise.reject(new Error('Feature is not available.'));

/**
 * Create Feature Method
 * @param method
 * @param isEnabled
 */
export const createFeatureMethod = <TMethod>(method: TMethod, isEnabled = true): TMethod => {
  if (isEnabled) {
    return method;
  }

  return noSupportedMethod as TMethod;
};
