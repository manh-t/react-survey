import React from 'react';

import AppSlider from 'components/AppSlider';
import Dropdown from 'components/Dropdown';
import MultiChoice from 'components/MultiChoice';
import MultiInputs from 'components/MultiInputs';
import Nps from 'components/Nps';
import Rating from 'components/Rating';
import TextArea from 'components/TextArea';
import { DisplayType, Question, getDisplayTypeEnum } from 'types/question';

interface AnswerProps {
  question: Question;
  'data-test-id'?: string;
}
const Answer = ({ question, ...rest }: AnswerProps): JSX.Element => {
  const displayTypeEnum = getDisplayTypeEnum(question);

  switch (displayTypeEnum) {
    case DisplayType.Heart:
    case DisplayType.Smiley:
    case DisplayType.Thumbs:
    case DisplayType.Star:
      return (
        <Rating
          items={question.answers}
          displayType={displayTypeEnum}
          onValueChanged={() => {
            // TODO
          }}
        />
      );
    case DisplayType.Choice:
      return (
        <MultiChoice
          items={question.answers}
          isPickOne={question?.pick === 'one'}
          onValuesChanged={() => {
            // TODO
          }}
        />
      );
    case DisplayType.Nps:
      return (
        <Nps
          items={question.answers}
          onValuesChanged={() => {
            // TODO
          }}
        />
      );
    case DisplayType.Textarea:
      return (
        <TextArea
          items={question.answers}
          onValueChange={() => {
            // TODO
          }}
        />
      );
    case DisplayType.Textfield:
      return <MultiInputs questionId={question.id} items={question.answers} />;
    case DisplayType.Dropdown:
      return (
        <Dropdown
          questionId={question.id}
          items={question.answers}
          onValueChanged={() => {
            // TODO
          }}
        />
      );
    case DisplayType.Slider:
      return (
        <AppSlider
          min={0}
          max={question.answers.length}
          onValueChanged={() => {
            // TODO
          }}
        />
      );
    case DisplayType.Unknown:
    case DisplayType.Intro:
    case DisplayType.Outro:
    default:
      return <div {...rest}></div>;
  }
};

export default Answer;
