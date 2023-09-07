import React from 'react';

import { act, render, screen, within } from '@testing-library/react';

import { answerFabricator } from 'tests/fabricator';
import { Answer } from 'types/answer';

import Dropdown, { dropdownDataTestIds } from '.';

describe('Dropdown', () => {
  const answers = answerFabricator.times(5);

  it('renders a dropdown component', () => {
    const dropdownProps = {
      questionId: 'question-id',
      items: answers,
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
        items: answers,
        onValueChanged: onValueChanged,
      };

      render(<Dropdown {...dropdownProps} />);

      const dropdown = screen.getByTestId(dropdownDataTestIds.base);

      const firstValue = answers[0].text;
      const thirdValue = answers[2].text;

      act(() => {
        within(dropdown).getByText(firstValue).click();
      });

      act(() => {
        within(dropdown)
          .getByRole('button', {
            name: thirdValue,
          })
          .click();
      });

      expect(selectedValue).toBe(thirdValue);
    });
  });
});
