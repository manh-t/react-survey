import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as ArrowBack } from 'assets/images/icons/arrow-back.svg';
import ElevatedButton from 'components/ElevatedButton';
import LoadingDialog from 'components/LoadingDialog';
import MainView from 'components/MainView';
import { useAppDispatch, useAppSelector } from 'hooks';
import { questionPath } from 'routes';
import { getSurveyAsyncThunk } from 'store/reducers/Survey';

export const surveyScreenTestIds = {
  backButton: 'survey__back-button',
  coverImage: 'survey__cover-image',
  title: 'survey__title-text',
  description: 'survey__description-text',
  startSurveyButton: 'survey__start-survey-button',
  loadingDialog: 'survey__loading-dialog',
  toast: 'survey__toast',
};

const SurveyScreen = (): JSX.Element => {
  const { id } = useParams();

  const { survey, isLoading, isError } = useAppSelector((state) => state.survey);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(getSurveyAsyncThunk(id ?? ''));
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      toast.error('There is something wrong. Please try again later!', { position: 'top-center' });
    }
  }, [isError]);

  return (
    <MainView backgroundUrl={isLoading ? undefined : survey?.coverImageUrl}>
      {isLoading || isError ? (
        <div></div>
      ) : (
        <div className="flex flex-col">
          <button
            className="w-fit mt-[37px] ml-[39px] p-1 text-white"
            onClick={goBack}
            data-test-id={surveyScreenTestIds.backButton}
          >
            <ArrowBack />
          </button>
          <div className="w-1/2 self-center pt-36">
            <img
              src={survey?.coverImageUrl ? `${survey?.coverImageUrl}l` : ''}
              className="w-full h-[302px] rounded-[12px] object-cover"
              alt="survey"
              data-test-id={surveyScreenTestIds.coverImage}
            />
            <p className="text-white text-x-large font-extrabold pt-8" data-test-id={surveyScreenTestIds.title}>
              {survey?.title}
            </p>
            <p
              className="text-white text-regular tracking-survey-tight opacity-60 pt-2"
              data-test-id={surveyScreenTestIds.description}
            >
              {survey?.description}
            </p>
            <div className="pt-8">
              <Link to={questionPath()}>
                <ElevatedButton isFullWidth type="submit" data-test-id={surveyScreenTestIds.startSurveyButton}>
                  Start Survey
                </ElevatedButton>
              </Link>
            </div>
          </div>
        </div>
      )}
      {isLoading && <LoadingDialog data-test-id={surveyScreenTestIds.loadingDialog} />}
    </MainView>
  );
};

export default SurveyScreen;
