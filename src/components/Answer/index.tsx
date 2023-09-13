import React, { useEffect } from 'react';

import isEmpty from 'lodash/isEmpty';

import AppSlider from 'components/AppSlider';
import Dropdown from 'components/Dropdown';
import MultiChoice from 'components/MultiChoice';
import MultiInputs from 'components/MultiInputs';
import Nps from 'components/Nps';
import Rating from 'components/Rating';
import TextArea from 'components/TextArea';
import { Answer as AnswerType, instanceOfAnswer } from 'types/answer';
import { DisplayType, Question, getDisplayTypeEnum } from 'types/question';
import { AnswerRequest, instanceOfAnswerRequest } from 'types/request/surveySubmitRequest';

export const answerDataTestIds = {
  base: 'answer__base',
};

interface AnswerProps {
  question: Question;
  onAnswerChanged: (answers: AnswerRequest[]) => void;
}

const Answer = ({ question, onAnswerChanged }: AnswerProps): JSX.Element => {
  const displayTypeEnum = getDisplayTypeEnum(question);

  const onValueChanged = (answer: number | AnswerType | AnswerRequest) => {
    if (typeof answer === 'number') {
      onAnswerChanged([{ id: question.answers[answer - 1].id, answer: '' }]);
    } else if (instanceOfAnswer(answer)) {
      onAnswerChanged([{ id: answer.id, answer: '' }]);
    } else if (instanceOfAnswerRequest(answer)) {
      onAnswerChanged([answer]);
    }
  };

  const onValuesChanged = (answers: AnswerType[] | AnswerRequest[]) => {
    if (!isEmpty(answers)) {
      if (instanceOfAnswer(answers[0])) {
        const answerRequests: AnswerRequest[] = answers.map((answer) => ({
          id: answer.id,
          answer: '',
        }));

        onAnswerChanged(answerRequests);
      } else if (instanceOfAnswerRequest(answers[0])) {
        onAnswerChanged(answers as AnswerRequest[]);
      }
    }
  };

  useEffect(() => {
    const setDefaultAnswers = () => {
      switch (displayTypeEnum) {
        case DisplayType.Heart:
        case DisplayType.Smiley:
        case DisplayType.Thumbs:
        case DisplayType.Star:
        case DisplayType.Slider:
        case DisplayType.Dropdown:
          onValueChanged({ id: question.answers[0].id, answer: '' });
          break;
        case DisplayType.Nps:
          const answerRequests: AnswerRequest[] = question.answers
            .slice(0, Math.round(question.answers.length / 2) + 1)
            .map((answer) => ({ id: answer.id, answer: '' }));
          onValuesChanged(answerRequests);
          break;
      }
    };

    setDefaultAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const answerComponent = (): JSX.Element => {
    switch (displayTypeEnum) {
      case DisplayType.Heart:
      case DisplayType.Smiley:
      case DisplayType.Thumbs:
      case DisplayType.Star:
        return <Rating items={question.answers} displayType={displayTypeEnum} onValueChanged={onValueChanged} />;
      case DisplayType.Choice:
        return <MultiChoice items={question.answers} isPickOne={question?.pick === 'one'} onValuesChanged={onValuesChanged} />;
      case DisplayType.Nps:
        return <Nps items={question.answers} onValuesChanged={onValuesChanged} />;
      case DisplayType.Textarea:
        return <TextArea items={question.answers} onValueChange={onValueChanged} />;
      case DisplayType.Textfield:
        return <MultiInputs questionId={question.id} items={question.answers} onValuesChanged={onValuesChanged} />;
      case DisplayType.Dropdown:
        return <Dropdown items={question.answers} onValueChanged={onValueChanged} />;
      case DisplayType.Slider:
        return <AppSlider min={0} max={question.answers.length} onValueChanged={onValueChanged} />;
      case DisplayType.Unknown:
      case DisplayType.Intro:
      case DisplayType.Outro:
      default:
        return <></>;
    }
  };

  return (
    <div key={question.id} data-test-id={answerDataTestIds.base}>
      {answerComponent()}
    </div>
  );
};

export default Answer;
