import React from 'react';

import { act, render, screen, within } from '@testing-library/react';
import { sequence } from '@travelperksl/fabricator';

import { answerFabricator } from 'tests/fabricator';
import { Answer } from 'types/answer';

import Nps, { npsDataTestIds } from '.';

describe('Nps', () => {
  const answers = answerFabricator.times(10, { text: () => sequence('npsScore').toString() });

  it('renders a multi choice component', () => {
    const onValuesChanged = () => {
      // Do nothing
    };

    render(<Nps items={answers} onValuesChanged={onValuesChanged} />);

    const nps = screen.getByTestId(npsDataTestIds.base);

    expect(nps).toBeVisible();
  });

  describe('given the sixth score is clicked', () => {
    it('renders the first six components as selected state', () => {
      let selectedValues: Answer[] = [];

      const handleValuesChanged = (answers: Answer[]) => {
        selectedValues = answers;
      };

      render(<Nps items={answers} onValuesChanged={(answers) => handleValuesChanged(answers)} />);

      const nps = screen.getByTestId(npsDataTestIds.base);

      act(() => {
        within(nps).getByText(answers[5].text).click();
      });

      // The selected state of an item should NOT have `opacity-50` class
      expect(within(nps).getByText(answers[0].text)).not.toHaveClass('opacity-50');
      expect(within(nps).getByText(answers[1].text)).not.toHaveClass('opacity-50');
      expect(within(nps).getByText(answers[2].text)).not.toHaveClass('opacity-50');
      expect(within(nps).getByText(answers[3].text)).not.toHaveClass('opacity-50');
      expect(within(nps).getByText(answers[4].text)).not.toHaveClass('opacity-50');
      expect(within(nps).getByText(answers[5].text)).not.toHaveClass('opacity-50');
      expect(selectedValues).toHaveLength(6);
    });
  });
});
