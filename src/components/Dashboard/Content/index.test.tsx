import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardContent, { dashboardDataTestIds } from '.';

describe('DashboardContent', () => {
  const surveys = [
    {
      id: '1',
      resourceType: 'survey',
      coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
      title: 'Working from home Check-In',
      description: 'We would like to know how you feel about our work from home.',
    },
  ];

  it('renders DashboardContent and its components', () => {
    render(
      <DashboardContent
        surveys={surveys}
        currentPosition={0}
        shouldShowShimmer={false}
        onNextSurvey={() => jest.fn()}
        onIndicatorTapped={() => jest.fn()}
      />
    );

    const dashboardContent = screen.getByTestId(dashboardDataTestIds.content);

    expect(dashboardContent).toBeVisible();
    expect(dashboardContent).toHaveTextContent(surveys[0].title);
    expect(dashboardContent).toHaveTextContent(surveys[0].description);
  });

  it('does NOT render the DashboardContent components', () => {
    render(
      <DashboardContent
        surveys={surveys}
        currentPosition={0}
        shouldShowShimmer={true}
        onNextSurvey={() => jest.fn()}
        onIndicatorTapped={() => jest.fn()}
      />
    );

    expect(screen.queryByTestId(dashboardDataTestIds.content)).not.toBeInTheDocument();
  });
});
