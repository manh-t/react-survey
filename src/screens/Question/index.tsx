import React from 'react';

import { ReactComponent as ArrowRight } from 'assets/images/icons/arrow-right.svg';
import { ReactComponent as CloseButton } from 'assets/images/icons/close-btn-white.svg';
import AppSlider from 'components/AppSlider';
import MainView from 'components/MainView';

export const questionScreenTestIds = {
  index: 'question__index',
  title: 'question__title',
  closeButton: 'question__close-button',
  nextButton: 'question__next-button',
};

const QuestionScreen = (): JSX.Element => {
  return (
    <MainView backgroundUrl="https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_">
      <div className="flex flex-col h-full">
        <button className="mt-8 mr-8 p-1 self-end" data-test-id={questionScreenTestIds.closeButton}>
          <CloseButton />
        </button>
        <div className="w-1/2 self-center flex-1 flex flex-col justify-center">
          <p
            className="text-small font-extrabold tracking-survey-normal opacity-50 text-white"
            data-test-id={questionScreenTestIds.index}
          >
            1/5
          </p>
          <p
            className="text-x-large font-extrabold tracking-survey-tighest text-white mt-4 mb-8"
            data-test-id={questionScreenTestIds.title}
          >
            How fulfilled did you feel during this WFH period?
          </p>
          <AppSlider
            onValueChanged={() => {
              // TODO
            }}
          />
        </div>
        <button
          type="button"
          className="w-[56px] h-[56px] mr-8 mb-8 bg-white rounded-full inline-flex items-center justify-center self-end justify-self-end text-black-chinese"
          data-test-id={questionScreenTestIds.nextButton}
        >
          <ArrowRight />
        </button>
      </div>
    </MainView>
  );
};

export default QuestionScreen;
