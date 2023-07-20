import React from 'react';

import { act, render, screen, within } from '@testing-library/react';

import { Answer } from 'types/answer';

import Nps from '.';

describe('Nps', () => {
  const npsDataTestId = 'nps';

  it('renders a multi choice component', () => {
    const answers = [
      { id: '1', resourceType: 'answer', text: '1' },
      { id: '2', resourceType: 'answer', text: '2' },
      { id: '3', resourceType: 'answer', text: '3' },
      { id: '4', resourceType: 'answer', text: '4' },
      { id: '5', resourceType: 'answer', text: '5' },
      { id: '6', resourceType: 'answer', text: '6' },
      { id: '7', resourceType: 'answer', text: '7' },
      { id: '8', resourceType: 'answer', text: '8' },
      { id: '9', resourceType: 'answer', text: '9' },
      { id: '10', resourceType: 'answer', text: '10' },
    ];
    render(<Nps items={answers} data-test-id={npsDataTestId} />);

    const nps = screen.getByTestId(npsDataTestId);

    expect(nps).toBeVisible();
  });

  describe('given the sixth score is clicked', () => {
    it('renders the first six components as selected state', () => {
      let selectedValues: Answer[] = [];

      const handleValuesChanged = (answers: Answer[]) => {
        selectedValues = answers;
      };
      const answers = [
        { id: '1', resourceType: 'answer', text: '1' },
        { id: '2', resourceType: 'answer', text: '2' },
        { id: '3', resourceType: 'answer', text: '3' },
        { id: '4', resourceType: 'answer', text: '4' },
        { id: '5', resourceType: 'answer', text: '5' },
        { id: '6', resourceType: 'answer', text: '6' },
        { id: '7', resourceType: 'answer', text: '7' },
        { id: '8', resourceType: 'answer', text: '8' },
        { id: '9', resourceType: 'answer', text: '9' },
        { id: '10', resourceType: 'answer', text: '10' },
      ];
      render(<Nps items={answers} onValuesChanged={(answers) => handleValuesChanged(answers)} data-test-id={npsDataTestId} />);

      const nps = screen.getByTestId(npsDataTestId);

      act(() => {
        within(nps).getByText('6').click();
      });

      expect(within(nps).getByText('1')).not.toHaveClass('opacity-50');
      expect(within(nps).getByText('2')).not.toHaveClass('opacity-50');
      expect(within(nps).getByText('3')).not.toHaveClass('opacity-50');
      expect(within(nps).getByText('4')).not.toHaveClass('opacity-50');
      expect(within(nps).getByText('5')).not.toHaveClass('opacity-50');
      expect(within(nps).getByText('6')).not.toHaveClass('opacity-50');
      expect(selectedValues).toHaveLength(6);
    });
  });
});
