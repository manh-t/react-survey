import React from 'react';

import { render, screen } from '@testing-library/react';

import BackgroundImage, { backgroundImageTestIds } from '.';

describe('BackgroundImage', () => {
  it('renders BackgroundImage with the background image', () => {
    const imgUrl = 'test url';

    render(<BackgroundImage backgroundUrl={imgUrl}>The children</BackgroundImage>);

    const backgroundImage = screen.getByTestId(backgroundImageTestIds.base);
    const backgroundImgElement = screen.getByAltText('background');

    expect(backgroundImage).toBeVisible();
    expect(backgroundImgElement).toHaveAttribute('src', imgUrl);
  });

  it('renders BackgroundImage with the black as a background', () => {
    render(<BackgroundImage>The children</BackgroundImage>);

    const backgroundImage = screen.getByTestId(backgroundImageTestIds.base);

    expect(backgroundImage).toBeVisible();
    expect(backgroundImage).toHaveClass('bg-black');
  });
});
