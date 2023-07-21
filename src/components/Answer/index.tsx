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
          questionId={question.id}
          items={question.answers}
          displayType={displayTypeEnum}
          data-test-id={rest['data-test-id']}
        />
      );
    case DisplayType.Choice:
      return (
        <MultiChoice
          questionId={question.id}
          items={question.answers}
          isPickOne={question?.pick === 'one'}
          data-test-id={rest['data-test-id']}
        />
      );
    case DisplayType.Nps:
      return <Nps questionId={question.id} items={question.answers} data-test-id={rest['data-test-id']} />;
    case DisplayType.Textarea:
      return <TextArea questionId={question.id} items={question.answers} data-test-id={rest['data-test-id']} />;
    case DisplayType.Textfield:
      return <MultiInputs questionId={question.id} items={question.answers} data-test-id={rest['data-test-id']} />;
    case DisplayType.Dropdown:
      return <Dropdown questionId={question.id} items={question.answers} data-test-id={rest['data-test-id']} />;
    case DisplayType.Slider:
      return <AppSlider questionId={question.id} items={question.answers} data-test-id={rest['data-test-id']} />;
    case DisplayType.Unknown:
    case DisplayType.Intro:
    case DisplayType.Outro:
    default:
      return <div {...rest}></div>;
  }
};

export default Answer;
