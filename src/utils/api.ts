const noSupportedMethod = () => Promise.reject(new Error('Feature is not supported'));

export const createFeatureMethod = <TMethod>(method: TMethod, isEnabled: boolean): TMethod => {
  if (isEnabled) {
    return method;
  }
  return noSupportedMethod as TMethod;
};
