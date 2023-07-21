import React from 'react';

import { render, screen, within } from '@testing-library/react';

import MultiInputs from '.';

describe('MultiInputs', () => {
  const multiInputsDataTestId = 'multiInputs';

  it('renders a multi inputs component', () => {
    const answers = [
      { id: '1', resourceType: 'answer', text: 'Test 1' },
      { id: '2', resourceType: 'answer', text: 'Test 2' },
      { id: '3', resourceType: 'answer', text: 'Test 3' },
    ];
    render(<MultiInputs questionId="question id" items={answers} data-test-id={multiInputsDataTestId} />);

    const multiInputs = screen.getByTestId(multiInputsDataTestId);

    expect(multiInputs).toBeVisible();
    expect(within(multiInputs).getByPlaceholderText('Test 1')).toBeVisible();
    expect(within(multiInputs).getByPlaceholderText('Test 2')).toBeVisible();
    expect(within(multiInputs).getByPlaceholderText('Test 3')).toBeVisible();
  });
});
