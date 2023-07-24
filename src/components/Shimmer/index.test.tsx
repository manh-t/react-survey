import React from 'react';

import { render, screen } from '@testing-library/react';

import Shimmer, { shimmerDataTestIds } from '.';

describe('Shimmer', () => {
  it('renders Shimmer and its components', () => {
    const testClass = 'test-class';
    render(<Shimmer classAttributes={testClass} />);

    const shimmer = screen.getByTestId(shimmerDataTestIds.content);

    expect(shimmer).toBeVisible();
    expect(shimmer).toHaveClass(testClass);
  });
});
