import React, { useEffect } from 'react';

import BackgroundImage from 'components/BackgroundImage';
import DashboardContent from 'components/Dashboard/Content';
import DashboardEmpty from 'components/Dashboard/Empty';
import DashboardHeader from 'components/Dashboard/Header';
import { getDaysAgoFromISODate, getdddMMMDDDateFromISODate } from 'helpers/datetime';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getSurveys, surveysAction } from 'store/reducers/Surveys';
import { getUser } from 'store/reducers/User';

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
      />
    );
  };

  useEffect(() => {
    dispatch(getSurveys());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <BackgroundImage backgroundUrl={surveys.length > 0 ? surveys[currentPosition].coverImageUrl : undefined}>
      <DashboardHeader
        dateTime={surveys.length ? getdddMMMDDDateFromISODate(surveys[currentPosition].createdAt) : ''}
        daysAgo={surveys.length ? getDaysAgoFromISODate(surveys[currentPosition].createdAt) : ''}
        profileUrl={user?.avatarUrl}
        shouldShowShimmer={isInitialLoading}
      >
        <div className="pt-36 h-full">
          {isInitialLoading ? dashboardContent() : surveys.length ? dashboardContent() : <DashboardEmpty />}
        </div>
      </DashboardHeader>
    </BackgroundImage>
  );
};

export default DashBoardScreen;
