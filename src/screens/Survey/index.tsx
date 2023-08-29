import React from 'react';

import { ReactComponent as ArrowBack } from 'assets/images/icons/arrow-back.svg';
import BackgroundImage from 'components/BackgroundImage';
import ElevatedButton from 'components/ElevatedButton';

export const surveyScreenTestIds = {
  backButton: 'survey__back-button',
  coverImage: 'survey__cover-image',
  title: 'survey__title-text',
  description: 'survey__description-text',
  startSurveyButton: 'survey__start-survey-button',
};

const SurveyScreen = (): JSX.Element => {
  return (
    <BackgroundImage backgroundUrl="https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_">
      <div className="flex flex-col">
        <button className="mt-[37px] ml-[39px] p-1" data-test-id={surveyScreenTestIds.backButton}>
          <ArrowBack />
        </button>
        <div className="w-1/2 self-center pt-36">
          <img
            src="https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_l"
            className="w-full h-[302px] rounded-[12px] object-cover"
            alt="survey"
            data-test-id={surveyScreenTestIds.coverImage}
          />
          <p className="text-white text-x-large font-extrabold pt-8" data-test-id={surveyScreenTestIds.title}>
            Working from home Check-In
          </p>
          <p
            className="text-white text-regular tracking-survey-tight opacity-60 pt-2"
            data-test-id={surveyScreenTestIds.description}
          >
            We would like to know how you feel about our work from home (WFH) experience.
          </p>
          <div className="pt-8">
            <ElevatedButton isFullWidth type="submit" data-test-id={surveyScreenTestIds.startSurveyButton}>
              Start Survey
            </ElevatedButton>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default SurveyScreen;
