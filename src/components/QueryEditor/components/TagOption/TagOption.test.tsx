import { render, screen } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import { TEST_IDS } from '../../../../constants';
import { TagOption } from './TagOption';

/**
 * TagOption
 */
describe('TagOption', () => {
  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(TEST_IDS.tagBadge);
  const selectors = getSelectors(screen);

  it('Should display tag', async () => {
    const options = {
      data: { count: 1, value: 'test', label: 'Test' },
      label: 'Test',
    } as any;
    render(<TagOption {...options} />);

    expect(selectors.root()).toBeInTheDocument();

    expect(selectors.root()).toHaveTextContent('Test (1)');
  });

  it('Should display tag with undefined count', async () => {
    const options = {
      data: { count: undefined, value: 'test', label: 'Test' },
      label: 'Test',
    } as any;
    render(<TagOption {...options} />);

    expect(selectors.root()).toBeInTheDocument();

    expect(selectors.root()).toHaveTextContent('Test');
  });
});
