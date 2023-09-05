import React from 'react';

import { render, screen } from '@testing-library/react';

import { Answer } from 'types/answer';

import TextArea, { textAreaDataTestIds } from '.';

describe('TextArea', () => {
  it('renders a text area component', () => {
    const answers: Answer[] = [
      {
        id: 'id',
        resourceType: 'answer',
        text: '',
      },
    ];

    render(<TextArea questionId="question-id" items={answers} />);

    const textArea = screen.getByTestId(textAreaDataTestIds.base);

    expect(textArea).toBeVisible();
  });
});
