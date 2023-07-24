import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { ReactComponent as ArrowRight } from 'assets/images/icons/arrow-right.svg';
import { ReactComponent as CloseButton } from 'assets/images/icons/close-btn.svg';
import Answer from 'components/Answer';
import ElevatedButton from 'components/ElevatedButton';
import LoadingDialog from 'components/LoadingDialog';
import MainView from 'components/MainView';
import { useAppDispatch, useAppSelector } from 'hooks';
import { paths, questionCompletePath } from 'routes';
import { submitSurveyAsyncThunk, surveyAction } from 'store/reducers/Survey';
import { AnswerRequest } from 'types/request/surveySubmitRequest';

export const questionScreenTestIds = {
  index: 'question__index',
  title: 'question__title',
  closeButton: 'question__close-button',
  nextButton: 'question__next-button',
  submitButton: 'question__submit-button',
};

const QuestionScreen = (): JSX.Element => {
  const { survey, questionRequests, isLoading, isError, isSubmitSuccess } = useAppSelector((state) => state.survey);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(survey?.questions?.at(0));
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleAnswerChanged = (answers: AnswerRequest[]) => {
    dispatch(
      surveyAction.fillAnswers({
        id: currentQuestion?.id ?? '',
        answers: answers,
      })
    );
  };

  const onNextClick = () => {
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex >= (survey?.questions?.length ?? 0)) {
      return;
    }
    setCurrentQuestion(survey?.questions?.at(nextQuestionIndex));
    setQuestionIndex(nextQuestionIndex);
  };

  const onSubmitClick = () => {
    dispatch(
      submitSurveyAsyncThunk({
        surveyId: survey?.id ?? '',
        questions: questionRequests,
      })
    );
  };

  function handleOnClose() {
    dispatch(surveyAction.resetQuestions());
    navigate(paths.root, { replace: true });
  }

  useEffect(() => {
    if (isSubmitSuccess) {
      navigate(questionCompletePath());
    }
  }, [isSubmitSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error('There is something wrong. Please try again later!', { position: 'top-center' });
    }
  }, [isError]);

  return (
    <div>
      <ToastContainer />
      <MainView backgroundUrl={currentQuestion?.coverImageUrl}>
        <div className="flex flex-col h-full">
          <button
            className="mt-8 mr-8 p-1 self-end text-white"
            data-test-id={questionScreenTestIds.closeButton}
            onClick={handleOnClose}
          >
            <CloseButton />
          </button>
          <div className="w-1/2 self-center flex-1 flex flex-col justify-center">
            <p
              className="text-small font-extrabold tracking-survey-normal opacity-50 text-white"
              data-test-id={questionScreenTestIds.index}
            >
              {`${questionIndex + 1}/${survey?.questions?.length ?? 0}`}
            </p>
            <p
              className="text-x-large font-extrabold tracking-survey-tighest text-white mt-4 mb-8"
              data-test-id={questionScreenTestIds.title}
            >
              {currentQuestion?.text}
            </p>
            {currentQuestion && (
              <div className="mt-16">
                <Answer question={currentQuestion} onAnswerChanged={(answers) => handleAnswerChanged(answers)} />
              </div>
            )}
          </div>
          {questionIndex === (survey?.questions?.length ?? 0) - 1 ? (
            <div className="mr-8 mb-8 self-end">
              <ElevatedButton isFullWidth={false} onClick={onSubmitClick}>
                Submit
              </ElevatedButton>
            </div>
          ) : (
            <button
              type="button"
              className="w-[56px] h-[56px] mr-8 mb-8 bg-white rounded-full inline-flex items-center justify-center self-end justify-self-end"
              onClick={onNextClick}
              data-test-id={questionScreenTestIds.nextButton}
            >
              <ArrowRight />
            </button>
          )}
        </div>
      </MainView>
      {isLoading && <LoadingDialog />}
    </div>
  );
};

export default QuestionScreen;
