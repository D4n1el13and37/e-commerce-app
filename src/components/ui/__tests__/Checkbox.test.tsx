import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Checkbox from '../checkbox/Checkbox';

describe('Checkbox component tests', () => {
  it('render disabled checkbox', () => {
    render(<Checkbox isDisabled={true} />);
    expect(screen.getByTestId('checkbox')).toBeDisabled();
  });

  it('render checked checkbox', () => {
    render(<Checkbox isChecked={true} />);
    expect(screen.getByTestId('checkbox')).toBeChecked();
  });

  it('render required checkbox', () => {
    render(<Checkbox isRequred={true} />);
    expect(screen.getByTestId('checkbox')).toBeRequired();
  });
});

describe('Checkbox component Label test', () => {
  it('render checkbox with label', () => {
    render(<Checkbox label={'New label'} />);
    expect(screen.getByTestId('checkbox-label')).toHaveTextContent('New label');
  });
});
