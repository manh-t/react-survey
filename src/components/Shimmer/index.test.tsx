import React from 'react';

import { render, screen } from '@testing-library/react';

import Shimmer from '.';

describe('Shimmer', () => {
  const dataTestId = 'shimmer';
  it('renders Shimmer and its components', () => {
    const testClass = 'test-class';
    render(<Shimmer classAttributes={testClass} data-test-id={dataTestId} />);

    const shimmer = screen.getByTestId(dataTestId);

    expect(shimmer).toBeVisible();
    expect(shimmer).toHaveClass(testClass);
  });
});
