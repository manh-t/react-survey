import React from 'react';

import { render, screen } from '@testing-library/react';

import { dashboardScreenTestIds } from 'screens/Dashboard';

import Shimmer from '.';

describe('Shimmer', () => {
  it('renders Shimmer and its components', () => {
    const testClass = 'test-class';
    render(<Shimmer classAttributes={testClass} />);

    const shimmer = screen.getByTestId(dashboardScreenTestIds.shimmer);

    expect(shimmer).toBeVisible();
    expect(shimmer).toHaveClass(testClass);
  });
});
