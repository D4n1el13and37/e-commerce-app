// import React, { /* useEffect, */ useState } from 'react';
// // import { SingleValue } from 'react-select';
// import {
//   CustomerChangeAddressAction,
//   CustomerSetDefaultShippingAddressAction,
//   CustomerSetDefaultBillingAddressAction,
//   CustomerRemoveAddressAction,
// } from '@commercetools/platform-sdk';
// // import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
// import { updateCustomer } from '../../../../api/Customer/customer';
// import { RootState } from '../../../../store/store';
// import { setDataUser } from '../../../../store/customerSlice';
// import AddressForm from './AddressForm';
// import classes from '../../userProfile.module.scss';
// import Button from '../../../../components/ui/button/Button';
// import SuccessModal from '../SuccesModal/SuccessModal';
// import useAppDispatch from '../../../../hooks/useAppDispatch';
// import useAppSelector from '../../../../hooks/useAppSelector';

// export interface AddresesForm {
//   [key: string]: string | undefined;
//   country: string;
//   city: string;
//   streetName: string;
//   postalCode: string;
// }

// export interface AddressInfoData {
//   id: string;
//   address: AddresesForm;
//   // country: string;
//   // city: string;
//   // streetName: string;
//   // postalCode: string;
//   // countryBilling: string;
//   // cityBilling: string;
//   // streetNameBilling: string;
//   // postalCodeBilling: string;
//   defaultShippingAddress: string;
//   defaultBillingAddress: string;
// }

// type adressesIds = 'shippingAddressIds' | 'billingAddressIds';

// interface AddressProps {
//   addressType: 'Shipping' | 'Billing';
// }

// const AddressInfo: React.FC<AddressProps> = ({ addressType }) => {
//   const dispatch = useAppDispatch();
//   const dataUser = useAppSelector(
//     (state: RootState) => state.customer.dataUser
//   );

//   const idAdress = `${addressType.toLowerCase()}AddressIds` as adressesIds;
//   const defaultAddressValue = dataUser?.[`default${addressType}AddressId`];
//   const arrayOfAddreses = dataUser[idAdress];
//   const { addresses } = dataUser;

//   const [isEditSuccess, setIsEditSuccess] = useState(false);

//   const removeMessage = () => {
//     setTimeout(() => setIsEditSuccess(false), 3000);
//   };

//   // Если дефолтный адрес совпадает с редактируемым адресом, но галочка снята
//   const checkAndSetDefaultAddress = (data: AddressInfoData) =>
//     data[`default${addressType}Address`] === undefined &&
//     data.id === defaultAddressValue;

//   const onSubmit = async (data: AddressInfoData): Promise<void> => {
//     try {
//       // console.log('data from a', data);
//       // const country = data.country
//       const setAddress: CustomerChangeAddressAction = {
//         action: 'changeAddress',
//         addressId: data.id,
//         address: { ...data.address },
//       };

//       // console.log('setAddress', setAddress);

//       const isdefaultValueOff = checkAndSetDefaultAddress(data);

//       console.log('checkAndSetDefaultAddress', isdefaultValueOff);
//       console.log('DATA', data);

//       const actions = [setAddress];
//       // Проверка, если дефолтный адрес установлен
//       if (data.defaultShippingAddress || data.defaultBillingAddress) {
//         const setDefaultAddressAction:
//           | CustomerSetDefaultBillingAddressAction
//           | CustomerSetDefaultShippingAddressAction = {
//           action: `setDefault${addressType}Address`,
//           addressId: data[`default${addressType}Address`],
//         };
//         actions.push(setDefaultAddressAction);
//       } else if (isdefaultValueOff) {
//         const setDefaultAddressAction:
//           | CustomerSetDefaultBillingAddressAction
//           | CustomerSetDefaultShippingAddressAction = {
//           action: `setDefault${addressType}Address`,
//           addressId: undefined,
//         };
//         actions.push(setDefaultAddressAction);
//       }

//       const updateData = {
//         version: dataUser.version,
//         actions,
//       };

//       const updatedCustomer = await updateCustomer(dataUser.id, updateData);
//       dispatch(setDataUser(updatedCustomer));
//       setIsEditSuccess(true);
//       removeMessage();
//     } catch (e) {
//       if (e instanceof Error) {
//         throw new Error(e.message);
//       }
//     }
//   };

//   const removeAddress = async (addressId: string): Promise<void> => {
//     try {
//       const removeAddressAction: CustomerRemoveAddressAction = {
//         action: 'removeAddress',
//         addressId,
//       };

//       const updateData = {
//         version: dataUser.version,
//         actions: [removeAddressAction],
//       };

//       const updatedCustomer = await updateCustomer(dataUser.id, updateData);
//       dispatch(setDataUser(updatedCustomer));
//     } catch (e) {
//       if (e instanceof Error) {
//         throw new Error(e.message);
//       }
//     }
//   };

//   return (
//     <div className={classes.profileData__data}>
//       {arrayOfAddreses!.map((id: string) => {
//         const currentAddress = addresses.find((address) => address.id === id);
//         if (currentAddress) {
//           return (
//             <AddressForm
//               key={currentAddress.id}
//               address={currentAddress}
//               addressType={addressType}
//               defaultAddressId={defaultAddressValue} // for render green block with default address
//               onSubmit={onSubmit}
//               onRemove={removeAddress}
//             />
//           );
//         }
//         return null;
//       })}
//       <Button type="button" isMain={true}>
//         Add New Address
//       </Button>
//       <SuccessModal isOpen={isEditSuccess} />
//     </div>
//   );
// };

// export default AddressInfo;
