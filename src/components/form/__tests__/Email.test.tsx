// import { fireEvent, render, screen } from '@testing-library/react';
// import { describe, expect, it } from 'vitest';
// import { FormProvider, useForm } from 'react-hook-form';
// import EmailInput from '../email/EmailInput';

// // Обёртка для использования useFormContext
// const Wrapper = ({ children }) => {
//   const { error, useForm } = methods;
//   return <FormProvider {...methods}>{children}</FormProvider>;
// };

// describe('EmailInput test', () => {
//   it('renders input with correct attributes', () => {
//     render(
//       <Wrapper>
//         <EmailInput />
//         <div>
//           {errors.email && (
//             <span className="error">{errors.email.message as string}</span>
//           )}
//         </div>
//       </Wrapper>
//     );
//     const input = screen.getByLabelText('Email address');
//     expect(input).toHaveAttribute('type', 'text');
//     expect(input).toHaveAttribute('id', 'email');
//     expect(input).toHaveAttribute('placeholder', 'user@example.com');
//     expect(input).toHaveAttribute('autocomplete', 'email');
//   });

//   it('shows error message for required field', async () => {
//     render(
//       <Wrapper>
//         <EmailInput />
//       </Wrapper>
//     );
//     fireEvent.blur(screen.getByLabelText('Email address'));
//     expect(await screen.findByText('Email is required')).toBeInTheDocument();
//   });

//   it('validates email format', async () => {
//     render(
//       <Wrapper>
//         <EmailInput />
//       </Wrapper>
//     );

//     const input = screen.getByLabelText('Email address');

//     // Test invalid email (missing @)
//     fireEvent.change(input, { target: { value: 'invalidemail' } });
//     fireEvent.blur(input);
//     expect(
//       await screen.findByText('Email should contain @')
//     ).toBeInTheDocument();

//     // Test invalid email (Cyrillic characters)
//     fireEvent.change(input, { target: { value: 'пользователь@example.com' } });
//     fireEvent.blur(input);
//     expect(
//       await screen.findByText('Email should not contain Cyrillic characters')
//     ).toBeInTheDocument();

//     // Test invalid email (invalid domain)
//     fireEvent.change(input, { target: { value: 'user@domain..com' } });
//     fireEvent.blur(input);
//     expect(
//       await screen.findByText(
//         'Invalid sequence of special characters in domain'
//       )
//     ).toBeInTheDocument();

//     // Test valid email
//     fireEvent.change(input, { target: { value: 'user@example.com' } });
//     fireEvent.blur(input);
//     expect(
//       screen.queryByText('Email should contain @')
//     ).not.toBeInTheDocument();
//     expect(
//       screen.queryByText('Email should not contain Cyrillic characters')
//     ).not.toBeInTheDocument();
//     expect(
//       screen.queryByText('Invalid sequence of special characters in domain')
//     ).not.toBeInTheDocument();
//   });
// });
