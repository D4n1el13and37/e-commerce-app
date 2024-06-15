import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Input from '../../../../components/ui/input/Input';
import Button from '../../../../components/ui/button/Button';
import cl from './DiscountBlock.module.scss';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import {
  applyDiscount /* , getCart */,
  //   getDiscounts,
} from '../../../../store/cartSlice';

interface DiscountProps {
  discount: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const DiscountBlock = () => {
  const dispatch = useAppDispatch();

  //   getDiscountCodes(); /* .then((data) => console.log(data)); */
  //   getDiscountCodeById(
  //     'BASKETGOAL777'
  //   ); /* .then((data) => console.log(data)); */

  const [isError, setIsError] = useState('');
  function removeError() {
    setTimeout(() => setIsError(''), 3000);
  }

  const methods = useForm<DiscountProps>({
    mode: 'onSubmit',
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<DiscountProps> = async (data) => {
    const { discount } = data;
    try {
      dispatch(applyDiscount(discount));
      //  /*  const res =  */await dispatch(getCart());
      //   console.log(res);
    } catch (e) {
      if (typeof e === 'string') {
        setIsError(e);
        removeError();
      }
    }
  };

  return (
    <div className={cl.content__wrapper}>
      <h4 className={cl.content__title}>Promocode</h4>
      <FormProvider {...methods}>
        <form className={cl.content__form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label=""
            id="discount-input"
            placeholder="Enter promo"
            {...register('discount', {
              required: 'Discount is requred',
              minLength: {
                value: 5,
                message: 'Shoud be at least 6 symbols',
              },
              validate: (value) => {
                if (!/^[a-zA-Z0-9]/.test(value)) {
                  return 'Invalid promocode';
                }
                return true;
              },
            })}
          />
          <div className={cl.error__container}>
            {errors.discount && (
              <span className={`error`}>{errors.discount.message}</span>
            )}
          </div>
          <div className={cl.server__error}>
            {isError && <span className={`error`}>Incorrect promocode</span>}
            <Button isMain={true} isFilled={true}>
              Apply
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default DiscountBlock;
