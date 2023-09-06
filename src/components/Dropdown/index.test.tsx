import React from 'react';

import { act, render, screen, within } from '@testing-library/react';

import { Answer } from 'types/answer';

import Dropdown, { dropdownDataTestIds } from '.';

describe('Dropdown', () => {
  it('renders a dropdown component', () => {
    const dropdownProps = {
      questionId: 'question-id',
      items: [
        { id: '1', resourceType: 'answer', text: 'Test 1' },
        { id: '2', resourceType: 'answer', text: 'Test 2' },
        { id: '3', resourceType: 'answer', text: 'Test 3' },
        { id: '4', resourceType: 'answer', text: 'Test 4' },
        { id: '5', resourceType: 'answer', text: 'Test 5' },
      ],
      onValueChanged: () => {
        // Do nothing
      },
    };

    render(<Dropdown {...dropdownProps} />);

    const dropdown = screen.getByTestId(dropdownDataTestIds.base);

    expect(dropdown).toBeVisible();
  });

  describe('given a value is clicked', () => {
    it('returns the proper value', () => {
      let selectedValue = '';
      const onValueChanged = (answer: Answer) => {
        selectedValue = answer.text ?? '';
      };
      const dropdownProps = {
        questionId: 'question-id',
        items: [
          { id: '1', resourceType: 'answer', text: 'Test 1' },
          { id: '2', resourceType: 'answer', text: 'Test 2' },
          { id: '3', resourceType: 'answer', text: 'Test 3' },
          { id: '4', resourceType: 'answer', text: 'Test 4' },
          { id: '5', resourceType: 'answer', text: 'Test 5' },
        ],
        onValueChanged: onValueChanged,
      };

      render(<Dropdown {...dropdownProps} />);

      const dropdown = screen.getByTestId(dropdownDataTestIds.base);

      act(() => {
        within(dropdown).getByText('Test 1').click();
      });

      act(() => {
        within(dropdown)
          .getByRole('button', {
            name: 'Test 3',
          })
          .click();
      });

      expect(selectedValue).toBe('Test 3');
    });
  });
});
