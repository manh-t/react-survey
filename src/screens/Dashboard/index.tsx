import React, { useEffect } from 'react';

import BackgroundImage from 'components/BackgroundImage';
import DashboardContent from 'components/Dashboard/Content';
import DashboardEmpty from 'components/Dashboard/Empty';
import DashboardHeader from 'components/Dashboard/Header';
import { getDaysAgoFromISODate, getdddMMMDDDateFromISODate } from 'helpers/datetime';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getSurveysAsyncThunk, surveysAction } from 'store/reducers/Surveys';
import { getUserAsyncThunk } from 'store/reducers/User';

export const dashboardScreenTestIds = {
  backgroundImage: 'dashboard__background-image',
  header: 'dashboard__header',
  content: 'dashboard__content',
  contentEmpty: 'dashboard__content-empty',
  shimmer: 'dashboard__shimmer',
};

const DashBoardScreen = (): JSX.Element => {
  const { surveys, currentPosition, isInitialLoading } = useAppSelector((state) => state.surveys);

  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const dashboardContent = () => {
    return (
      <DashboardContent
        shouldShowShimmer={isInitialLoading}
        surveys={surveys}
        currentPosition={currentPosition}
        onNextSurvey={() => dispatch(surveysAction.nextSurvey())}
        onIndicatorTapped={(position) => dispatch(surveysAction.selectSurvey(position))}
        data-test-id={dashboardScreenTestIds.content}
      />
    );
  };

  useEffect(() => {
    dispatch(getSurveysAsyncThunk());
    dispatch(getUserAsyncThunk());
  }, [dispatch]);

  return (
    <BackgroundImage
      backgroundUrl={surveys.length > 0 ? surveys[currentPosition].coverImageUrl : undefined}
      data-test-id={dashboardScreenTestIds.backgroundImage}
    >
      <DashboardHeader
        dateTime={surveys.length ? getdddMMMDDDateFromISODate(surveys[currentPosition].createdAt) : ''}
        daysAgo={surveys.length ? getDaysAgoFromISODate(surveys[currentPosition].createdAt) : ''}
        profileUrl={user?.avatarUrl}
        shouldShowShimmer={isInitialLoading}
        data-test-id={dashboardScreenTestIds.header}
      >
        <div className="pt-36 h-full">
          {isInitialLoading ? (
            dashboardContent()
          ) : surveys.length ? (
            dashboardContent()
          ) : (
            <DashboardEmpty data-test-id={dashboardScreenTestIds.contentEmpty} />
          )}
        </div>
      </DashboardHeader>
    </BackgroundImage>
  );
};

export default DashBoardScreen;
