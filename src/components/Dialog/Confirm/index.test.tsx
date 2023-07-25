import React from 'react';

import { render, screen } from '@testing-library/react';

import ConfirmDialog, { confirmDialogDataTestIds } from '.';
import { dialogDataTestIds } from '..';

describe('ConfirmDialog', () => {
  const emptyCallback = () => {
    // Do nothing
  };

  describe('given the confirm dialog is opened', () => {
    it('renders a confirm dialog', () => {
      render(
        <ConfirmDialog open title="Title" onClose={emptyCallback} onConfirm={emptyCallback}>
          Test Content
        </ConfirmDialog>
      );

      const confirmDialog = screen.getByTestId(confirmDialogDataTestIds.base);

      expect(confirmDialog).toBeVisible();
    });
  });

  describe('given the dialog is NOT opened', () => {
    it('does NOT render a dialog', () => {
      render(
        <ConfirmDialog open={false} title="Title" onClose={emptyCallback} onConfirm={emptyCallback}>
          Test Content
        </ConfirmDialog>
      );

      expect(screen.queryByTestId(dialogDataTestIds.dialog)).not.toBeInTheDocument();
    });
  });
});
