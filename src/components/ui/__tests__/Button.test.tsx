import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from '../button/Button';

describe('Button', () => {
  it('renders disabled button', () => {
    render(<Button isDisabled={true}>other</Button>);
    screen.debug();
    expect(screen.getByTestId('button-element')).toBeDisabled();
  });

  it('renders button with class main', () => {
    render(<Button isMain={true}>main button</Button>);
    screen.debug();
    expect(screen.getByTestId('button-element')).toHaveClass('_main_0c4bfa');
  });
});
