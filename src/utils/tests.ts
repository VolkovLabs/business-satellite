import { SelectableValue } from '@grafana/data';

/**
 * Get Options with testId
 * @param options
 * @param selector
 */
export const getOptionsWithTestId = (options: SelectableValue[], selector: (name: unknown) => string) => {
  return options.map((option) => ({
    ...option,
    ariaLabel: selector(option.value),
  }));
};
