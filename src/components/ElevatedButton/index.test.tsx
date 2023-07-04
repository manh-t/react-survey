import React from 'react';

import { render, screen } from '@testing-library/react';

import ElevatedButton from '.';

describe('ElevatedButton', () => {
  const label = 'Sign in';
  const dataTestId = 'sign-in_button';

  it('renders a full-width button', () => {
    render(
      <ElevatedButton isFullWidth data-test-id={dataTestId}>
        {label}
      </ElevatedButton>
    );

    const button = screen.getByTestId(dataTestId);

    expect(button).toBeVisible();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('w-full');
  });

  it('does NOT render a full-width button', () => {
    render(
      <ElevatedButton isFullWidth={false} data-test-id={dataTestId}>
        {label}
      </ElevatedButton>
    );

    const button = screen.getByTestId(dataTestId);

    expect(button).toBeVisible();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveClass('w-full');
  });
});
