import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { DiscountCodeReference } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Input from '../../../../components/ui/input/Input';
import Button from '../../../../components/ui/button/Button';
import cl from './DiscountBlock.module.scss';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { applyDiscount, deleteDiscount } from '../../../../store/cartSlice';
import useAppSelector from '../../../../hooks/useAppSelector';

interface DiscountProps {
  discount: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const DiscountBlock = () => {
  const dispatch = useAppDispatch();
  const { discountsList, cart } = useAppSelector((state) => state.cart);

  const APPLIED_DISCOUNTS = discountsList.filter((item) =>
    cart.discountCodes.some((discount) => discount.discountCode.id === item.id)
  );

  const [isError, setIsError] = useState('');
  function removeError() {
    setTimeout(() => setIsError(''), 3000);
  }

  const handleRemoveDiscount = (id: string) => {
    const discount: DiscountCodeReference = {
      id,
      typeId: 'discount-code',
    };
    dispatch(deleteDiscount(discount));
  };

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
      await dispatch(applyDiscount(discount)).unwrap();
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
                message: 'Shoud be at least 5 symbols',
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
            <CSSTransition
              in={!!errors.discount}
              classNames="clear"
              timeout={300}
              unmountOnExit
            >
              <span className={`error`}>{errors.discount?.message}</span>
            </CSSTransition>
          </div>
          <div className={cl.discount_applied__list}>
            {APPLIED_DISCOUNTS.map((item) => (
              <div className={cl.discount_applied__item} key={item.id}>
                <span>{item.code}</span>
                <span onClick={() => handleRemoveDiscount(item.id)}>X</span>
              </div>
            ))}
          </div>
          <div className={cl.server__error}>
            <CSSTransition
              in={!!isError}
              classNames="clear"
              timeout={300}
              unmountOnExit
            >
              <span className={`error`}>Incorrect promocode</span>
            </CSSTransition>

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
