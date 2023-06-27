import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardContent from '.';

describe('DashboardContent', () => {
  const dataTestId = 'dashboard-content';
  it('renders DashboardContent and its components', () => {
    render(<DashboardContent data-test-id={dataTestId} />);

    const dashboardContent = screen.getByTestId(dataTestId);

    expect(dashboardContent).toBeVisible();
  });
});
