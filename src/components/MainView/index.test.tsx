import React from 'react';

import { render, screen } from '@testing-library/react';

import MainView, { mainViewTestIds } from '.';

describe('MainView', () => {
  it('renders MainView with the background image', () => {
    const imgUrl = 'test url';

    render(<MainView backgroundUrl={imgUrl}>The children</MainView>);

    const mainView = screen.getByTestId(mainViewTestIds.base);
    const backgroundImgElement = screen.getByAltText('background');

    expect(mainView).toBeVisible();
    expect(backgroundImgElement).toHaveAttribute('src', imgUrl);
  });

  it('renders MainView with the black as a background', () => {
    render(<MainView>The children</MainView>);

    const mainView = screen.getByTestId(mainViewTestIds.base);

    expect(mainView).toBeVisible();
    expect(mainView).toHaveClass('bg-black');
  });
});
