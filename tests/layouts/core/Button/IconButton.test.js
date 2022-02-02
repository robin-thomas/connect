import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';

import { IconButton } from '@/layouts/core/Button';

describe('IconButton', () => {
  let button;

  const props = {
    title: 'Hello I\'m a tooltip',
  }
  const text = 'Hello I\'m a button';

  const getComponent = (newProps = {}) => <IconButton {...props} {...newProps}>{text}</IconButton>;

  beforeEach(() => {
    render(getComponent());
    button = screen.getByRole('button');
  });

  afterEach(() => {
    cleanup();
  });

  it('Render a IconButton', () => {
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(text);
    expect(button).not.toBeDisabled();
  });

  it('Verify whether tooltip works on hover', async () => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseOver(button);
    await waitFor(() => screen.getByRole('tooltip'));

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent(props.title);
  });

  it('Verify that the disabled option works', () => {
    cleanup();

    render(getComponent({ disabled: true }));

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Verify that the onClick handler works', async () => {
    cleanup();

    const onClick = jest.fn();
    render(getComponent({ onClick }));

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });
});
