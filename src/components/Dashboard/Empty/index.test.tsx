import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardEmpty from '.';

describe('DashboardEmpty', () => {
  const dataTestId = 'dashboard-empty';
  it('renders DashboardEmpty and its components', () => {
    render(<DashboardEmpty data-test-id={dataTestId} />);

    const dashboardEmpty = screen.getByTestId(dataTestId);

    expect(dashboardEmpty).toBeVisible();
    expect(dashboardEmpty).toHaveTextContent('😎You‘ve completed all the surveys.Take a moment.');
  });
});
