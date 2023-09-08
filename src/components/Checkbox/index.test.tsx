import React from 'react';

import { render, screen, within } from '@testing-library/react';

import Checkbox, { checkboxDataTestIds } from '.';

describe('Checkbox', () => {
  describe('given the checkbox is checked', () => {
    it('renders a checkbox component as checked', () => {
      render(<Checkbox isValueChecked />);

      const checkBox = screen.getByTestId(checkboxDataTestIds.base);

      expect(checkBox).toBeVisible();
      expect(within(checkBox).getByRole('checkbox')).toBeChecked();
    });
  });

  describe('given the checkbox is unchecked', () => {
    it('renders a checkbox component as unchecked', () => {
      render(<Checkbox isValueChecked={false} />);

      const checkBox = screen.getByTestId(checkboxDataTestIds.base);

      expect(checkBox).toBeVisible();
      expect(within(checkBox).getByRole('checkbox')).not.toBeChecked();
    });
  });
});
