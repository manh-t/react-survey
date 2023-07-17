import React from 'react';

import { render, screen } from '@testing-library/react';

import TextArea, { textAreaDataTestIds } from '.';

describe('TextArea', () => {
  it('renders a text area component', () => {
    render(<TextArea />);

    const textArea = screen.getByTestId(textAreaDataTestIds.base);

    expect(textArea).toBeVisible();
  });
});
