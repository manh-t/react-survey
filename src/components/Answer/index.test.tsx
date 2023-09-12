import React from 'react';

import { render, screen } from '@testing-library/react';

import { appSliderDataTestIds } from 'components/AppSlider';
import { dropdownDataTestIds } from 'components/Dropdown';
import { multiChoiceDataTestIds } from 'components/MultiChoice';
import { multiInputsDataTestIds } from 'components/MultiInputs';
import { npsDataTestIds } from 'components/Nps';
import { ratingDataTestIds } from 'components/Rating';
import { textAreaDataTestIds } from 'components/TextArea';
import { questionFabricator } from 'tests/fabricator';

import Answer, { answerDataTestIds } from '.';

describe('Answer', () => {
  describe('given the display type is star', () => {
    it('renders Rating component', () => {
      const question = questionFabricator();

      render(<Answer question={question} />);

      const star = screen.getByTestId(ratingDataTestIds.base);

      expect(star).toBeVisible();
    });
  });

  describe('given the display type is choice', () => {
    it('renders MultiChoice component', () => {
      const question = questionFabricator({ displayType: 'choice' });

      render(<Answer question={question} />);

      const multiChoice = screen.getByTestId(multiChoiceDataTestIds.base);

      expect(multiChoice).toBeVisible();
    });
  });

  describe('given the display type is nps', () => {
    it('renders Nps component', () => {
      const question = questionFabricator({ displayType: 'nps' });

      render(<Answer question={question} />);

      const nps = screen.getByTestId(npsDataTestIds.base);

      expect(nps).toBeVisible();
    });
  });

  describe('given the display type is textarea', () => {
    it('renders TextArea component', () => {
      const question = questionFabricator({ displayType: 'textarea' });

      render(<Answer question={question} />);

      const textArea = screen.getByTestId(textAreaDataTestIds.base);

      expect(textArea).toBeVisible();
    });
  });

  describe('given the display type is textfield', () => {
    it('renders MultiInputs component', () => {
      const question = questionFabricator({ displayType: 'textfield' });

      render(<Answer question={question} />);

      const multiInputs = screen.getByTestId(multiInputsDataTestIds.base);

      expect(multiInputs).toBeVisible();
    });
  });

  describe('given the display type is dropdown', () => {
    it('renders Dropdown component', () => {
      const question = questionFabricator({ displayType: 'dropdown' });

      render(<Answer question={question} />);

      const dropdown = screen.getByTestId(dropdownDataTestIds.base);

      expect(dropdown).toBeVisible();
    });
  });

  describe('given the display type is slider', () => {
    it('renders Dropdown component', () => {
      const question = questionFabricator({ displayType: 'slider' });

      render(<Answer question={question} />);

      const slider = screen.getByTestId(appSliderDataTestIds.base);

      expect(slider).toBeVisible();
    });
  });

  describe('given the display type is intro', () => {
    it('does NOT render any components', () => {
      const question = questionFabricator({ displayType: 'intro' });

      render(<Answer question={question} />);

      const intro = screen.getByTestId(answerDataTestIds.base);

      expect(intro).toBeEmptyDOMElement();
    });
  });
});
