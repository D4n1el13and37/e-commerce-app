import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '../button/Button';

describe('Button test', () => {
  it('renders disabled button', () => {
    render(<Button isDisabled={true}>Disabled</Button>);
    expect(screen.getByTestId('button')).toBeDisabled();
  });

  it('renders button with class main', () => {
    render(<Button isMain={true}>Main button</Button>);
    expect(screen.getByTestId('button').className).toMatch(/_main_/);
  });

  it('renders button with class filled', () => {
    render(<Button isFilled={true}>Filled button</Button>);
    expect(screen.getByTestId('button').className).toMatch(/_filled_/);
  });

  it('renders button with text content', () => {
    render(<Button isMain={true}>Content</Button>);
    expect(screen.getByTestId('button')).toHaveTextContent('Content');
  });

  it('renders button with type "submit"', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('renders button with title attribute', () => {
    render(<Button title="My Button">Click me</Button>);
    expect(screen.getByTestId('button')).toHaveAttribute('title', 'My Button');
  });

  it('calls onClick function when button is clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
