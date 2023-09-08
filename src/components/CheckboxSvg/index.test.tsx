import React from 'react';

import { render, screen } from '@testing-library/react';

import CheckboxSvg, { checkboxSvgDataTestIds } from '.';

describe('CheckboxSvg', () => {
  it('renders a checkbox svg component', () => {
    render(<CheckboxSvg />);

    const checkBoxSvg = screen.getByTestId(checkboxSvgDataTestIds.base);

    expect(checkBoxSvg).toBeVisible();
  });
});
