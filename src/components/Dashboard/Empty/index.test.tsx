import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardEmpty, { dashboardEmptyDataTestIds } from '.';

describe('DashboardEmpty', () => {
  it('renders DashboardEmpty and its components', () => {
    render(<DashboardEmpty />);

    const dashboardEmpty = screen.getByTestId(dashboardEmptyDataTestIds.base);

    expect(dashboardEmpty).toBeVisible();
    expect(dashboardEmpty).toHaveTextContent('😎You‘ve completed all the surveys.Take a moment.');
  });
});
