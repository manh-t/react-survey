import React from 'react';

import AppSlider from 'components/AppSlider';
import Dropdown from 'components/Dropdown';
import MultiChoice from 'components/MultiChoice';
import MultiInputs from 'components/MultiInputs';
import Nps from 'components/Nps';
import Rating from 'components/Rating';
import TextArea from 'components/TextArea';
import { Answer } from 'types/answer';
import { DisplayType, Question, getDisplayTypeEnum } from 'types/question';
import { AnswerRequest } from 'types/request/surveySubmitRequest';

export const answerDataTestIds = {
  base: 'answer__base',
};

interface AnswerProps {
  question: Question;
}
const Answer = ({ question }: AnswerProps): JSX.Element => {
  const displayTypeEnum = getDisplayTypeEnum(question);

  const onValueChanged = (answer: number | Answer | AnswerRequest) => {
    // TODO
    console.log(answer);
  };

  const onValuesChanged = (answers: Answer[] | AnswerRequest[]) => {
    // TODO
    console.log(answers);
  };

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
