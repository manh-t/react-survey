import React from 'react';

import { render, screen } from '@testing-library/react';

import Dialog, { dialogDataTestIds } from '.';

describe('Dialog', () => {
  describe('given the dialog is opened', () => {
    it('renders a dialog', () => {
      render(<Dialog open>Test Content</Dialog>);

      const dialog = screen.getByTestId(dialogDataTestIds.dialog);

      expect(dialog).toBeVisible();
    });
  });

  describe('given the dialog is NOT opened', () => {
    it('does NOT render a dialog', () => {
      render(<Dialog open={false}>Test Content</Dialog>);

      expect(screen.queryByTestId(dialogDataTestIds.dialog)).not.toBeInTheDocument();
    });
  });
});
