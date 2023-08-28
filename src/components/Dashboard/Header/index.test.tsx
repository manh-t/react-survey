import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardHeader, { dashboardHeaderDataTestIds } from '.';

describe('DashboardHeader', () => {
  it('renders DashboardHeader and its components without shimmers', () => {
    const dateTime = 'MONDAY, JUNE 15';
    const daysAgo = 'Today';
    const profileUrl = 'test url';
    render(
      <DashboardHeader dateTime={dateTime} daysAgo={daysAgo} profileUrl={profileUrl}>
        Dashboard Header
      </DashboardHeader>
    );

    const dashboardHeader = screen.getByTestId(dashboardHeaderDataTestIds.base);
    const avatar = screen.getByAltText('user avatar');

    expect(dashboardHeader).toBeVisible();
    expect(dashboardHeader).toHaveTextContent(dateTime);
    expect(dashboardHeader).toHaveTextContent(daysAgo);

    expect(avatar).toBeVisible();
    expect(avatar).toHaveAttribute('src', profileUrl);
  });

  it('does NOT renders text components', () => {
    const dateTime = 'MONDAY, JUNE 15';
    const daysAgo = 'Today';
    const profileUrl = 'test url';
    render(
      <DashboardHeader dateTime={dateTime} daysAgo={daysAgo} profileUrl={profileUrl} shouldShowShimmer>
        Dashboard Header
      </DashboardHeader>
    );

    const dashboardHeader = screen.getByTestId(dashboardHeaderDataTestIds.base);

    expect(dashboardHeader).toBeVisible();
    expect(dashboardHeader).not.toHaveTextContent(dateTime);
    expect(dashboardHeader).not.toHaveTextContent(daysAgo);
  });
});
