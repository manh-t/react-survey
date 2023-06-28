import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BackgroundImage from 'components/BackgroundImage';
import DashboardContent from 'components/Dashboard/Content';
import DashboardHeader from 'components/Dashboard/Header';
import { getToken } from 'helpers/authentication';
import { useAppDispatch, useAppSelector } from 'hooks';
import { paths } from 'routes';
import { surveysAction } from 'store/reducers/Surveys';

const DashBoardScreen = (): JSX.Element => {
  const { surveys, currentPosition } = useAppSelector((state) => state.surveys);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate(paths.signIn);
    }
  }, [navigate]);

  return (
    <BackgroundImage backgroundUrl={surveys[currentPosition].coverImageUrl}>
      <DashboardHeader dateTime="Monday, JUNE 15" daysAgo="Today" profileUrl="https://i.pravatar.cc/150?img=3">
        <div className="pt-36 h-full">
          <DashboardContent
            shouldShowShimmer={false}
            surveys={surveys}
            currentPosition={currentPosition}
            onNextSurvey={() => dispatch(surveysAction.nextSurvey())}
            onIndicatorTapped={(position) => dispatch(surveysAction.selectSurvey(position))}
          />
        </div>
      </DashboardHeader>
    </BackgroundImage>
  );
};

export default DashBoardScreen;
