import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Player } from '@lottiefiles/react-lottie-player';

import MainView from 'components/MainView';
import { paths } from 'routes';

export const questionCompleteDataTestIds = {
  lottie: 'question-complete__lottie',
  thankYou: 'question-complete__thank-you',
};

const QuestionCompleteScreen = (): JSX.Element => {
  const navigate = useNavigate();

  const handleCompleteEvent = () => {
    setTimeout(() => navigate(paths.root, { replace: true }), 1000);
  };

  return (
    <MainView>
      <div className="h-full flex flex-col justify-center" data-test-id={questionCompleteDataTestIds.lottie}>
        <Player
          src="https://assets2.lottiefiles.com/packages/lf20_pmYw5P.json"
          autoplay
          keepLastFrame
          style={{ height: '200px', width: '200px' }}
          onEvent={(event) => {
            if (event === 'complete') {
              handleCompleteEvent();
            }
          }}
        ></Player>
        <p
          className="text-large tracking-survey-tighter text-white font-[850] text-center"
          data-test-id={questionCompleteDataTestIds.thankYou}
        >
          Thanks for taking the survey.
        </p>
      </div>
    </MainView>
  );
};

export default QuestionCompleteScreen;
