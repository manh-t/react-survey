import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import _get from 'lodash/get';

import { ReactComponent as ArrowRight } from 'assets/images/icons/arrow-right.svg';
import Shimmer from 'components/Shimmer';
import { getHighResolutionImage } from 'helpers/image';
import { Survey } from 'types/survey';

export const dashboardContentDataTestIds = {
  base: 'dashboard__base',
};

interface DashboardContentProps {
  surveys: Survey[];
  currentPosition: number;
  shouldShowShimmer: boolean;
  onNextSurvey: () => void;
  onIndicatorTapped: (position: number) => void;
}

const DashboardContent = ({
  surveys,
  currentPosition,
  shouldShowShimmer = true,
  onNextSurvey,
  onIndicatorTapped,
}: DashboardContentProps): JSX.Element => {
  const currentSurvey = _get(surveys, currentPosition);

  const getSurveyPath = (): string => {
    if (currentSurvey) {
      return `surveys/${currentSurvey?.id}`;
    }
    return '';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      onNextSurvey();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  return shouldShowShimmer ? (
    <div className="flex flex-col h-full">
      <Shimmer classAttributes="h-[302px] rounded-[12px]" />
      <div className="flex flex-row justify-between mt-[38px]">
        <div className="flex flex-col justify-between">
          <Shimmer classAttributes="w-[318px] h-[18px] rounded-[14px]" />
          <Shimmer classAttributes="w-[212px] h-[18px] rounded-[14px]" />
        </div>
        <Shimmer classAttributes="w-[56px] h-[56px] rounded-full" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col h-full" data-test-id={dashboardContentDataTestIds.base}>
      <div
        style={{
          backgroundImage: `url(${surveys.length ? getHighResolutionImage(currentSurvey?.coverImageUrl) : ''})`,
        }}
        className="w-full h-[302px] rounded-[12px] bg-cover duration-500 ease-in-out"
      ></div>
      <div className="flex flex-row justify-between mt-[38px]">
        <div className="flex flex-col justify-between">
          <p className="text-white text-x-regular font-extrabold">{currentSurvey?.title}</p>
          <p className="text-white text-regular tracking-survey-tight opacity-60 mt-2">{currentSurvey?.description}</p>
        </div>
        <Link to={getSurveyPath()}>
          <button
            type="button"
            className="w-[56px] h-[56px] bg-white rounded-full inline-flex items-center justify-center text-black-chinese"
          >
            <ArrowRight />
          </button>
        </Link>
      </div>
      {/* <!-- Slider indicators --> */}
      <div className="flex-1 flex space-x-3 justify-center items-end mb-[42px]">
        {surveys.map((surveyItem, index) => {
          return (
            <button
              key={surveyItem.id}
              type="button"
              className={classNames('w-2 h-2 rounded-full bg-white', { 'bg-opacity-20': index !== currentPosition })}
              aria-current={index === currentPosition ? 'true' : 'false'}
              aria-label={`Slide ${surveyItem.id}`}
              data-carousel-slide-to={index}
              onClick={() => onIndicatorTapped(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardContent;
