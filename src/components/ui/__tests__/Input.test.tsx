import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Input from '../input/Input';

describe('Input tests', () => {
  it('input with label', () => {
    render(<Input id="test-input" fieldName="Test Field" type="text" />);
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
  });

  it('input with password type', () => {
    render(<Input id="test-input" fieldName="Test Field" type="password" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
  });

  it('input with tel type', () => {
    render(<Input id="test-input" fieldName="Test Field" type="tel" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'tel');
  });

  it('inability to enter a value when the maximum length is reached', () => {
    const maxLength = 10;
    render(
      <Input
        id="test-input"
        fieldName="Test Field"
        type="text"
        maxLength={maxLength}
      />
    );
    const input = screen.getByTestId('input');
    const text = '1234567890';
    fireEvent.change(input, { target: { value: text } });
    fireEvent.keyDown(input, { key: '1' });
    screen.debug();
    expect(input).toHaveValue(text);
  });

  it('render input with specified width', () => {
    render(
      <Input id="test-input" fieldName="Test Field" type="text" width="200px" />
    );
    expect(screen.getByTestId('input-container')).toHaveStyle({
      width: '200px',
    });
  });

  it('calls onChange handler when input value changes', () => {
    const onChangeMock = vi.fn();
    render(
      <Input
        id="test-input"
        fieldName="Test Field"
        type="text"
        onChange={onChangeMock}
      />
    );
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(onChangeMock).toHaveBeenCalled();
  });
});
