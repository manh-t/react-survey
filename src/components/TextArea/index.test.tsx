import React from 'react';

import { render, screen } from '@testing-library/react';

import { answerFabricator } from 'tests/fabricator';
import { Answer } from 'types/answer';

import TextArea, { textAreaDataTestIds } from '.';

describe('TextArea', () => {
  it('renders a text area component', () => {
    const answers: Answer[] = answerFabricator.times(2);

    render(<TextArea questionId="question-id" items={answers} />);

    const textArea = screen.getByTestId(textAreaDataTestIds.base);

    expect(textArea).toBeVisible();
  });
});
