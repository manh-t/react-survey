import React from 'react';

import { render, screen } from '@testing-library/react';

import AppSlider, { appSliderDataTestIds } from '.';

describe('AppSlider', () => {
  it('renders AppSlider component', () => {
    render(<AppSlider onValueChanged={jest.fn()} />);

    const appSlider = screen.getByTestId(appSliderDataTestIds.base);
    const slider = screen.getByRole('slider');

    expect(appSlider).toBeVisible();
    expect(slider).toBeVisible();
  });
});
