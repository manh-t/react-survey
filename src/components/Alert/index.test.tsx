import React from 'react';

import { render, screen } from '@testing-library/react';

import Alert from '.';

describe('Alert', () => {
  const errors = ['Error 1'];
  const dataTestId = 'test-id__alert';

  it('renders an alert and its component', () => {
    render(<Alert errors={errors} data-test-id={dataTestId} />);

    const alert = screen.getByTestId(dataTestId);

    expect(alert).toBeVisible();
    expect(alert).toHaveTextContent('Error 1');
  });
});
