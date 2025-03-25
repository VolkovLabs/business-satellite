import { fireEvent, render, screen } from '@testing-library/react';
import { getJestSelectors } from '@volkovlabs/jest-selectors';
import React from 'react';

import { TEST_IDS } from '../../../../constants';
import { TagBadge } from './TagBadge';

/**
 * Tag Badge
 */
describe('TagBadge', () => {
  /**
   * Click
   */
  const onClick = jest.fn();

  /**
   * Selectors
   */
  const getSelectors = getJestSelectors(TEST_IDS.tagBadge);
  const selectors = getSelectors(screen);

  it('Should display tag', async () => {
    render(<TagBadge onClick={onClick} count={1} label="Test" removeIcon={false} />);

    expect(selectors.root()).toBeInTheDocument();
    expect(selectors.removeIcon(true)).not.toBeInTheDocument();
  });

  it('Should display remove Icon', async () => {
    render(<TagBadge onClick={onClick} count={1} label="Test" removeIcon={true} />);

    expect(selectors.root()).toBeInTheDocument();
    expect(selectors.removeIcon()).toBeInTheDocument();
  });

  it('Should call on click', async () => {
    render(<TagBadge onClick={onClick} count={1} label="Test" removeIcon={true} />);

    expect(selectors.root()).toBeInTheDocument();
    expect(selectors.removeIcon()).toBeInTheDocument();

    fireEvent.click(selectors.removeIcon());

    expect(onClick).toHaveBeenCalled();
  });
});
