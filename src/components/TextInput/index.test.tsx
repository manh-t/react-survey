import React from 'react';

import { render, screen } from '@testing-library/react';

import TextInput from '.';

describe('TextInput', () => {
  const label = 'Email';
  const labelDataTestId = 'email-label';
  const inputDataTestId = 'text-input';
  const inputType = 'email';
  const inputPlaceholder = 'input placeholder';

  it('renders a text input with a label', () => {
    const inputProps = {
      label: label,
      labelDataTestId: labelDataTestId,
      inputAttributes: {
        id: 'sign-in-email',
        required: true,
        type: inputType,
        placeholder: inputPlaceholder,
        'data-test-id': inputDataTestId,
      },
    };
    render(<TextInput {...inputProps} />);

    const inputLabel = screen.getByTestId(labelDataTestId);
    const textInput = screen.getByTestId(inputDataTestId);

    expect(inputLabel).toBeVisible();
    expect(inputLabel).toHaveTextContent(label);

    expect(textInput).toBeVisible();
    expect(textInput).toHaveAttribute('type', inputType);
    expect(textInput).toHaveAttribute('placeholder', inputPlaceholder);
  });

  it('renders a text input without a label', () => {
    const inputProps = {
      inputAttributes: {
        id: 'sign-in-email',
        required: true,
        type: inputType,
        placeholder: inputPlaceholder,
        'data-test-id': inputDataTestId,
      },
    };
    render(<TextInput {...inputProps} />);

    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });
});
