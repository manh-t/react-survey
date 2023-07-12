import React from 'react';

import { render, screen } from '@testing-library/react';

import LoadingDialog from '.';

describe('LoadingDialog', () => {
  const dataTestId = 'loading-dialog';
  it('renders LoadingDialog and its components', () => {
    render(<LoadingDialog data-test-id={dataTestId} />);

    const loadingDialog = screen.getByTestId(dataTestId);
    const loadingStatusIcon = screen.getByRole('status');

    expect(loadingDialog).toBeVisible();
    expect(loadingStatusIcon).toHaveClass('motion-reduce:animate-[spin_1.5s_linear_infinite]');
  });
});
