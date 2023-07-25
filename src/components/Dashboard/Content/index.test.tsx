import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardContent, { dashboardDataTestIds } from '.';

describe('DashboardContent', () => {
  it('renders DashboardContent and its components', () => {
    render(<DashboardContent />);

    const dashboardContent = screen.getByTestId(dashboardDataTestIds.content);

    expect(dashboardContent).toBeVisible();
  });
});
