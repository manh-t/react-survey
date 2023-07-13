import { render, screen } from '@testing-library/react';

import AppSlider from '.';

describe('AppSlider', () => {
  it('renders AppSlider component', () => {
    const dataTestId = 'appSlider';
    // eslint-disable-next-line react/react-in-jsx-scope, @typescript-eslint/no-empty-function
    render(<AppSlider data-test-id={dataTestId} onValueChanged={jest.fn()} />);

    const appSlider = screen.getByTestId(dataTestId);

    expect(appSlider).toBeVisible();
  });
});
