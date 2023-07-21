import React from 'react';

import { render, screen } from '@testing-library/react';

import { Question } from 'types/question';

import Answer from '.';

describe('Answer', () => {
  describe('given the display type is star', () => {
    it('renders Rating component', () => {
      const question: Question = {
        id: 'id',
        resourceType: 'question',
        displayType: 'star',
        answers: [],
      };
      const dataTestId = 'answer';
      render(<Answer question={question} data-test-id={dataTestId} />);

      const star = screen.getByTestId(dataTestId);

      expect(star).toBeVisible();
      expect(star).toHaveAttribute('id', 'rating-id');
    });
  });

  describe('given the display type is choice', () => {
    it('renders MultiChoice component', () => {
      const question: Question = {
        id: 'id',
        resourceType: 'question',
        displayType: 'choice',
        answers: [],
      };
      const dataTestId = 'answer';
      render(<Answer question={question} data-test-id={dataTestId} />);

      const multiChoice = screen.getByTestId(dataTestId);

      expect(multiChoice).toBeVisible();
      expect(multiChoice).toHaveAttribute('id', 'multi-choice-id');
    });
  });

  describe('given the display type is nps', () => {
    it('renders Nps component', () => {
      const question: Question = {
        id: 'id',
        resourceType: 'question',
        displayType: 'nps',
        answers: [],
      };
      const dataTestId = 'answer';
      render(<Answer question={question} data-test-id={dataTestId} />);

      const nps = screen.getByTestId(dataTestId);

      expect(nps).toBeVisible();
      expect(nps).toHaveAttribute('id', 'nps-id');
    });
  });

  describe('given the display type is textarea', () => {
    it('renders TextArea component', () => {
      const question: Question = {
        id: 'id',
        resourceType: 'question',
        displayType: 'textarea',
        answers: [
          {
            id: 'id',
            resourceType: 'answer',
            text: '',
          },
        ],
      };
      const dataTestId = 'answer';
      render(<Answer question={question} data-test-id={dataTestId} />);

      const textArea = screen.getByTestId(dataTestId);

      expect(textArea).toBeVisible();
      expect(textArea).toHaveAttribute('id', 'text-area-id');
    });
  });

  describe('given the display type is textfield', () => {
    it('renders MultiInputs component', () => {
      const question: Question = {
        id: 'id',
        resourceType: 'question',
        displayType: 'textfield',
        answers: [
          {
            id: 'id',
            resourceType: 'answer',
            text: '',
          },
        ],
      };
      const dataTestId = 'answer';
      render(<Answer question={question} data-test-id={dataTestId} />);

      const multiInputs = screen.getByTestId(dataTestId);

      expect(multiInputs).toBeVisible();
      expect(multiInputs).toHaveAttribute('id', 'multi-inputs-id');
    });
  });

  describe('given the display type is dropdown', () => {
    it('renders Dropdown component', () => {
      const question: Question = {
        id: 'id',
        resourceType: 'question',
        displayType: 'dropdown',
        answers: [
          {
            id: 'id',
            resourceType: 'answer',
            text: '',
          },
        ],
      };
      const dataTestId = 'answer';
      render(<Answer question={question} data-test-id={dataTestId} />);

      const dropdown = screen.getByTestId(dataTestId);

      expect(dropdown).toBeVisible();
      expect(dropdown).toHaveAttribute('id', 'dropdown-id');
    });
  });

  describe('given the display type is slider', () => {
    it('renders Dropdown component', () => {
      const question: Question = {
        id: 'id',
        resourceType: 'question',
        displayType: 'slider',
        answers: [
          {
            id: 'id',
            resourceType: 'answer',
            text: '',
          },
        ],
      };
      const dataTestId = 'answer';
      render(<Answer question={question} data-test-id={dataTestId} />);

      const slider = screen.getByTestId(dataTestId);

      expect(slider).toBeVisible();
      expect(slider).toHaveAttribute('id', 'slider-id');
    });
  });

  describe('given the display type is intro', () => {
    it('renders Dropdown component', () => {
      const question: Question = {
        id: 'id',
        resourceType: 'question',
        displayType: 'intro',
        answers: [],
      };
      const dataTestId = 'answer';
      render(<Answer question={question} data-test-id={dataTestId} />);

      const intro = screen.getByTestId(dataTestId);

      expect(intro).toBeVisible();
    });
  });
});
