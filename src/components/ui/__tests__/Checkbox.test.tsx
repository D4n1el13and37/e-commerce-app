import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Checkbox from '../checkbox/Checkbox';

describe('Checkbox component tests', () => {
  it('render disabled checkbox', () => {
    render(<Checkbox disabled={true} />);
    expect(screen.getByTestId('checkbox')).toBeDisabled();
  });

  // it('render checked checkbox', () => {
  //   render(<Checkbox isChecked={true} />);
  //   expect(screen.getByTestId('checkbox')).toBeChecked();
  // });

  it('render required checkbox', () => {
    render(<Checkbox required={true} />);
    expect(screen.getByTestId('checkbox')).toBeRequired();
  });

  it('toggle checkbox state when click', () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

describe('Checkbox component Label test', () => {
  it('render checkbox with label', () => {
    render(<Checkbox label={'New label'} />);
    expect(screen.getByTestId('checkbox-label')).toHaveTextContent('New label');
  });

  it('does not toggle checkbox state when disabled', () => {
    render(<Checkbox disabled={true} />);
    const checkbox = screen.getByTestId('checkbox-label');
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
