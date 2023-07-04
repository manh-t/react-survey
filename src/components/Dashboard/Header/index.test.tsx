import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardHeader from '.';

describe('DashboardHeader', () => {
  const dataTestId = 'dashboard-header';
  it('renders DashboardHeader and its components without shimmers', () => {
    const dateTime = 'Monday, JUNE 15';
    const daysAgo = 'Today';
    const profileUrl = 'test url';
    render(
      <DashboardHeader
        dateTime={dateTime}
        daysAgo={daysAgo}
        profileUrl={profileUrl}
        data-test-id={dataTestId}
        shouldShowShimmer={false}
      >
        Dashboard Header
      </DashboardHeader>
    );

    const dashboardHeader = screen.getByTestId(dataTestId);
    const avatar = screen.getByAltText('user avatar');

    expect(dashboardHeader).toBeVisible();
    expect(dashboardHeader).toHaveTextContent(dateTime);
    expect(dashboardHeader).toHaveTextContent(daysAgo);

    expect(avatar).toBeVisible();
    expect(avatar).toHaveAttribute('src', profileUrl);
  });

  it('does NOT renders text components', () => {
    const dateTime = 'Monday, JUNE 15';
    const daysAgo = 'Today';
    const profileUrl = 'test url';
    render(
      <DashboardHeader dateTime={dateTime} daysAgo={daysAgo} profileUrl={profileUrl} data-test-id={dataTestId}>
        Dashboard Header
      </DashboardHeader>
    );

    const dashboardHeader = screen.getByTestId(dataTestId);

    expect(dashboardHeader).toBeVisible();
    expect(dashboardHeader).not.toHaveTextContent(dateTime);
    expect(dashboardHeader).not.toHaveTextContent(daysAgo);
  });
});
