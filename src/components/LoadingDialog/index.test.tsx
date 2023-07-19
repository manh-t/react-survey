import React from 'react';

import { render, screen } from '@testing-library/react';

import LoadingDialog from '.';

describe('LoadingDialog', () => {
  const dataTestId = 'loading-dialog';

  it('renders a loading dialog component', () => {
    render(<LoadingDialog data-test-id={dataTestId} />);

    const loadingDialog = screen.getByTestId(dataTestId);

    expect(loadingDialog).toBeVisible();
  });
});
