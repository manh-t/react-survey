import React from 'react';

import { render, screen, within } from '@testing-library/react';

import { answerFabricator } from 'tests/fabricator';

import MultiInputs, { multiInputsDataTestIds } from '.';

describe('MultiInputs', () => {
  it('renders a multi inputs component', () => {
    const answers = answerFabricator.times(3);

    render(<MultiInputs questionId="question id" items={answers} />);

    const multiInputs = screen.getByTestId(multiInputsDataTestIds.base);

    expect(multiInputs).toBeVisible();
    expect(within(multiInputs).getByPlaceholderText(answers[0].text)).toBeVisible();
    expect(within(multiInputs).getByPlaceholderText(answers[1].text)).toBeVisible();
    expect(within(multiInputs).getByPlaceholderText(answers[2].text)).toBeVisible();
  });
});
