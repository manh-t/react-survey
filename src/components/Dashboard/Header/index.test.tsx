import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardHeader from '.';

describe('DashboardHeader', () => {
  const dataTestId = 'dashboard-header';
  it('renders DashboardHeader and its components', () => {
    const dateTime = 'Monday, JUNE 15';
    const daysAgo = 'Today';
    const profileUrl = 'test url';
    render(
      <DashboardHeader dateTime={dateTime} daysAgo={daysAgo} profileUrl={profileUrl} data-test-id={dataTestId}>
        Dashboard Header
      </DashboardHeader>
    );

    const dashboardHeader = screen.getByTestId(dataTestId);
    const avatar = screen.getByAltText('user avatar');

    expect(dashboardHeader).toBeVisible();
    expect(dashboardHeader).toHaveTextContent(dateTime);
    expect(dashboardHeader).toHaveTextContent(dateTime);
    expect(dashboardHeader).toHaveTextContent(dateTime);

    expect(avatar).toBeVisible();
    expect(avatar).toHaveAttribute('src', profileUrl);
  });
});
