import React from 'react';

import { render, screen } from '@testing-library/react';

import Alert from '.';

describe('Alert', () => {
  const errors = ['error 1', 'error 2'];
  const dataTestId = 'alert';
  it('renders Alert and its components', () => {
    render(<Alert errors={errors} data-test-id={dataTestId} />);

    const alert = screen.getByTestId(dataTestId);

    expect(alert).toBeVisible();
    expect(alert).toHaveTextContent('Error');
    expect(alert).toHaveTextContent(errors[0]);
    expect(alert).toHaveTextContent(errors[1]);
  });
});
