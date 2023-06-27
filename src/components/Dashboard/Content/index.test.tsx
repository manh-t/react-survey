import React from 'react';

import { render, screen } from '@testing-library/react';

import DashboardContent from '.';

describe('DashboardContent', () => {
  const dataTestId = 'dashboard-content';
  const surveys = [
    {
      id: '1',
      resourceType: 'survey',
      imageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
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
        data-test-id={dataTestId}
      />
    );

    const dashboardContent = screen.getByTestId(dataTestId);

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
        data-test-id={dataTestId}
      />
    );

    expect(screen.queryByTestId(dataTestId)).not.toBeInTheDocument();
  });
});
