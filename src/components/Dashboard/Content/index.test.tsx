import React from 'react';

import { render, screen } from '@testing-library/react';

import TestWrapper from 'tests/TestWrapper';
import { Survey } from 'types/survey';

import DashboardContent, { dashboardDataTestIds } from '.';

describe('DashboardContent', () => {
  let shouldShowShimmer = false;
  const surveys: Survey[] = [
    {
      id: '1',
      resourceType: 'survey',
      coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
      title: 'Working from home Check-In',
      description: 'We would like to know how you feel about our work from home.',
    },
  ];

  const TestComponent = (): JSX.Element => {
    return (
      <TestWrapper>
        <DashboardContent
          surveys={surveys}
          currentPosition={0}
          shouldShowShimmer={shouldShowShimmer}
          onNextSurvey={() => jest.fn()}
          onIndicatorTapped={() => jest.fn()}
        />
      </TestWrapper>
    );
  };

  it('renders DashboardContent and its components', () => {
    render(<TestComponent />);

    const dashboardContent = screen.getByTestId(dashboardDataTestIds.content);

    expect(dashboardContent).toBeVisible();
    expect(dashboardContent).toHaveTextContent(surveys[0].title);
    expect(dashboardContent).toHaveTextContent(surveys[0].description);
  });

  it('does NOT render the DashboardContent components', () => {
    shouldShowShimmer = true;

    render(<TestComponent />);

    expect(screen.queryByTestId(dashboardDataTestIds.content)).not.toBeInTheDocument();
  });
});
