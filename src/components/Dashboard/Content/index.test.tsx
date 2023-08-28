import React from 'react';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Fabricator } from '@travelperksl/fabricator';

import TestWrapper from 'tests/TestWrapper';
import { Survey } from 'types/survey';

import DashboardContent, { dashboardContentDataTestIds } from '.';

describe('DashboardContent', () => {
  let shouldShowShimmer = false;
  const surveyFabricator = Fabricator({
    id: () => faker.string.numeric(),
    resourceType: 'survey',
    coverImageUrl: () => faker.image.avatar(),
    title: () => faker.string.sample(),
    description: () => faker.string.sample(),
  });
  const surveys: Survey[] = surveyFabricator.times(1);

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

    const dashboardContent = screen.getByTestId(dashboardContentDataTestIds.base);

    expect(dashboardContent).toBeVisible();
    expect(dashboardContent).toHaveTextContent(surveys[0].title);
    expect(dashboardContent).toHaveTextContent(surveys[0].description);
  });

  it('does NOT render the DashboardContent components', () => {
    shouldShowShimmer = true;

    render(<TestComponent />);

    expect(screen.queryByTestId(dashboardContentDataTestIds.base)).not.toBeInTheDocument();
  });
});
