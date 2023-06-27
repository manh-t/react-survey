import React from 'react';

import { render, screen } from '@testing-library/react';

import BackgroundImage from '.';

describe('BackgroundImage', () => {
  const dataTestId = 'background-image';
  it('renders BackgroundImage with the background image', () => {
    const imgUrl = 'test url';
    render(
      <BackgroundImage backgroundUrl={imgUrl} data-test-id={dataTestId}>
        The children
      </BackgroundImage>
    );

    const backgroundImage = screen.getByTestId(dataTestId);
    const backgroundImgElement = screen.getByAltText('background');

    expect(backgroundImage).toBeVisible();
    expect(backgroundImgElement).toHaveAttribute('src', imgUrl);
  });

  it('renders BackgroundImage with the black as a background', () => {
    render(<BackgroundImage data-test-id={dataTestId}>The children</BackgroundImage>);

    const backgroundImage = screen.getByTestId(dataTestId);

    expect(backgroundImage).toBeVisible();
    expect(backgroundImage).toHaveClass('bg-black');
  });
});
