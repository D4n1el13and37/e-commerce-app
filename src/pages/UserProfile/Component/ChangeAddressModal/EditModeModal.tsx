// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { FormProvider, useForm } from 'react-hook-form';
// import { SingleValue } from 'react-select';
// import { CustomerChangeAddressAction } from '@commercetools/platform-sdk';

// import Button from '../../../../components/ui/button/Button';
// import classes from './EditModeModal.module.scss';
// import CountrySelect from '../../../Register/Component/AddressForm/CountrySelect';
// import City from '../../../../components/form/address/city/city';
// import Street from '../../../../components/form/address/street/street';
// import Postcode from '../../../../components/form/address/postcode/postcode';
// import {
//   CountryOptionInterface,
//   countryOptions,
// } from '../../../Register/Component/AddressForm/countryOptions';
// import useAppDispatch from '../../../../hooks/useAppDispatch';
// import useAppSelector from '../../../../hooks/useAppSelector';
// import { RootState } from '../../../../store/store';
// import { updateAddress } from '../../../../store/addressSlice';

// interface CustomModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   address: {
//     id: string;
//     country: string;
//     city: string;
//     streetName: string;
//     postalCode: string;
//   };
// }

// const EditModeModal: React.FC<CustomModalProps> = ({
//   isOpen,
//   onRequestClose,
//   address,
// }) => {
//   const dispatch = useAppDispatch();
//   const dataUser = useAppSelector(
//     (state: RootState) => state.customer.dataUser
//   );

//   const methods = useForm({
//     defaultValues: {
//       country: address.country,
//       city: address.city,
//       streetName: address.streetName,
//       postalCode: address.postalCode,
//     },
//   });

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = methods;

//   const [selectedCountry, setSelectedCountry] =
//     useState<SingleValue<CountryOptionInterface> | null>(
//       countryOptions.find((option) => option.value === address.country) || null
//     );

//   const onSubmit = (data: any) => {
//     console.log('data', data);
//     const customerId = dataUser?.id;

//     const setAddress: CustomerChangeAddressAction = {
//       action: 'changeAddress',
//       addressId: address.id,
//       address: data,
//     };
//     const actions = [setAddress];

//     const updateData = {
//       version: dataUser?.version,
//       actions,
//     };

//     console.log('setAddress', updateData);

//     dispatch(updateAddress({ customerId, data: updateData }))
//       .then((response) => {
//         console.log('Response:', response);
//         onRequestClose();
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       className={classes.ReactModal__Content}
//       overlayClassName={classes.ReactModal__Overlay}
//     >
//       <FormProvider {...methods}>
//         <form onSubmit={handleSubmit(onSubmit)} className={classes.modal}>
//           <h2 className={classes.modal__header}>Edit address</h2>
//           <div>
//             <CountrySelect
//               control={control}
//               name="country"
//               setSelectedCountry={setSelectedCountry}
//               value={selectedCountry}
//             />
//             <div className={classes.error_container}>
//               {errors.country && (
//                 <span className="error">
//                   {errors.country.message as string}
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className={classes.input_container}>
//             <City name={address.city} id="city" />
//             <Street name={address.streetName} id="streetName" />
//           </div>
//           <Postcode
//             name={address.postalCode}
//             id="postalCode"
//             selectedCountry={selectedCountry}
//           />

//           <div className={classes.button_container}>
//             <Button isMain={true} isFilled={true} type="submit">
//               Save changes
//             </Button>
//             <Button isMain={true} type="button" onClick={onRequestClose}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </FormProvider>
//     </Modal>
//   );
// };

// export default EditModeModal;
