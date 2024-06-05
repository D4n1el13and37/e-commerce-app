// import React, { useEffect, useState } from 'react';
// import { SingleValue } from 'react-select';
// import {
//   CustomerChangeAddressAction,
//   CustomerSetDefaultShippingAddressAction,
//   CustomerSetDefaultBillingAddressAction,
//   CustomerRemoveAddressAction,
// } from '@commercetools/platform-sdk';
// import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

// import { updateCustomer } from '../../../../api/Customer/customer';
// import { RootState } from '../../../../store/store';
// import { setDataUser } from '../../../../store/customerSlice';

// import classes from '../../userProfile.module.scss';
// import CountrySelect from '../../../Register/Component/AddressForm/CountrySelect';
// import {
//   CountryOptionInterface,
//   countryOptions,
// } from '../../../Register/Component/AddressForm/countryOptions';
// import Button from '../../../../components/ui/button/Button';
// import SuccessModal from '../SuccesModal/SuccessModal';
// import City from '../../../../components/form/address/city/city';
// import Street from '../../../../components/form/address/street/street';
// import Postcode from '../../../../components/form/address/postcode/postcode';
// import Checkbox from '../../../../components/ui/checkbox/Checkbox';
// import useAppDispatch from '../../../../hooks/useAppDispatch';
// import useAppSelector from '../../../../hooks/useAppSelector';

// export interface AddressInfoData {
//   id: string;
//   countryShipping: string;
//   cityShipping: string;
//   streetNameShipping: string;
//   postalCodeShipping: string;
//   defaultShippingAddress: string;
//   countryBilling: string;
//   cityBilling: string;
//   streetNameBilling: string;
//   postalCodeBilling: string;
//   defaultBillingAddress: string;
// }

// interface AddressProps {
//   addressType: 'Shipping' | 'Billing';
// }

// const AddressInfo: React.FC<AddressProps> = ({ addressType }) => {
//   const dispatch = useAppDispatch();
//   const dataUser = useAppSelector(
//     (state: RootState) => state.customer.dataUser
//   );

//   const methods = useForm<AddressInfoData>({ mode: 'onChange' });
//   const { control, handleSubmit, setValue, reset, watch, trigger, register } =
//     methods;

//   const addresses = dataUser?.addresses;

//   const [isEdit, setIsEdit] = useState(false);
//   const [isEditSuccess, setIsEditSuccess] = useState(false);
//   const [selectedCountries, setSelectedCountries] = useState<
//     Record<string, SingleValue<CountryOptionInterface> | null>
//   >({});

//   useEffect(() => {
//     if (dataUser) {
//       const initialCountries: Record<
//         string,
//         SingleValue<CountryOptionInterface> | null
//       > = {};
//       addresses.forEach((address) => {
//         initialCountries[address.id] =
//           countryOptions.find((option) => option.value === address.country) ||
//           null;
//       });
//       setSelectedCountries(initialCountries);
//     }
//   }, [dataUser, addresses]);

//   function removeMessage() {
//     setTimeout(() => setIsEditSuccess(false), 3000);
//   }

//   const onSubmit: SubmitHandler<AddressInfoData> = async (data) => {
//     try {
//       if (dataUser) {
//         const setAddress: CustomerChangeAddressAction = {
//           action: 'changeAddress',
//           addressId: data.id,
//           address: {
//             country: data[`country${addressType}`],
//             city: data[`city${addressType}`],
//             streetName: data[`streetName${addressType}`],
//             postalCode: data[`postalCode${addressType}`],
//           },
//         };

//         const setDefaultAddress:
//           | CustomerSetDefaultBillingAddressAction
//           | CustomerSetDefaultShippingAddressAction = {
//           action: `setDefault${addressType}Address`,
//           addressId: data.id,
//         };

//         const updateData = {
//           version: dataUser.version,
//           actions: [setAddress, setDefaultAddress],
//         };

//         const updatedCustomer = await updateCustomer(dataUser.id, updateData);
//         dispatch(setDataUser(updatedCustomer));

//         setIsEdit(false);
//         setIsEditSuccess(true);
//         removeMessage();
//       }
//     } catch (e) {
//       if (e instanceof Error) {
//         throw new Error(e.message);
//       }
//     }
//   };

//   const removeAddress = async (addressId: string) => {
//     if (dataUser) {
//       try {
//         const removeAddressAction: CustomerRemoveAddressAction = {
//           action: 'removeAddress',
//           addressId,
//         };

//         const updateData = {
//           version: dataUser.version,
//           actions: [removeAddressAction],
//         };

//         const updatedCustomer = await updateCustomer(dataUser.id, updateData);
//         dispatch(setDataUser(updatedCustomer));
//       } catch (e) {
//         if (e instanceof Error) {
//           throw new Error(e.message);
//         }
//       }
//     }
//   };

//   const handleInputClick = (id: string) => {
//     setIsEdit(true);
//     setValue('id', id);
//   };

//   const handleCheckboxClick = (id: string) => {
//     setValue(`default${addressType}Address`, id);
//     setIsEdit(true);
//   };

//   const country = watch(`country${addressType}`);
//   const city = watch(`city${addressType}`);
//   const streetName = watch(`streetName${addressType}`);
//   const postalCode = watch(`postalCode${addressType}`);

//   useEffect(() => {
//     methods.trigger(`country${addressType}`);
//     methods.trigger(`city${addressType}`);
//     methods.trigger(`streetName${addressType}`);
//     methods.trigger(`postalCode${addressType}`);
//   }, [country, city, streetName, postalCode, methods, addressType]);

//   const idAdress = `${addressType.toLowerCase()}AddressIds`;
//   const defaultAddressValue = dataUser?.[`default${addressType}AddressId`];

//   return (
//     <div className={classes.profileData__data}>
//       {dataUser?.[idAdress]?.map((id: string) =>
//         addresses?.map((ad) => {
//           if (ad.id === id) {
//             return (
//               <FormProvider {...methods} key={ad.id}>
//                 {ad.id === defaultAddressValue ? (
//                   <span className={classes.default}>
//                     Default {addressType} Address
//                   </span>
//                 ) : (
//                   ''
//                 )}
//                 <form
//                   className={classes.profileData__address}
//                   onSubmit={handleSubmit(onSubmit)}
//                 >
//                   <div className={classes.profileData__wrapper}>
//                     <div
//                       className={classes.profileData__country}
//                       onClick={() => handleInputClick(ad.id)}
//                     >
//                       <CountrySelect
//                         control={control}
//                         name={`country${addressType}`}
//                         setSelectedCountry={(c) => {
//                           setSelectedCountries((prev) => ({
//                             ...prev,
//                             [ad.id]: c,
//                           }));
//                           setValue(`country${addressType}`, c?.value || '');
//                         }}
//                         value={selectedCountries[ad.id]}
//                         isDisabled={!isEdit}
//                       />
//                     </div>
//                     <City
//                       name={ad.city}
//                       id={ad.id}
//                       onChange={(value) =>
//                         setValue(`city${addressType}`, value.target.value)
//                       }
//                     />
//                     <Street
//                       name={ad.streetName}
//                       id={ad.id}
//                       onClick={() => handleInputClick(ad.id)}
//                       onChange={(value) =>
//                         setValue(`streetName${addressType}`, value.target.value)
//                       }
//                     />
//                     <Postcode
//                       name={ad.postalCode}
//                       id={ad.id}
//                       onClick={() => handleInputClick(ad.id)}
//                       onChange={(value) =>
//                         setValue(`postalCode${addressType}`, value.target.value)
//                       }
//                       selectedCountry={selectedCountries[ad.id]}
//                     />
//                   </div>
//                   <div className={classes.profileData__contolContainer}>
//                     <Checkbox
//                       label={`Use as default ${addressType.toLowerCase()} address`}
//                       {...register(`default${addressType}Address`)}
//                       onClick={() => handleCheckboxClick(ad.id)}
//                       checked={ad.id === watch(`default${addressType}Address`)}
//                     />

//                     <div className={classes.profileData__buttonWrapper}>
//                       <Button
//                         type="submit"
//                         isFilled={true}
//                         isMain={true}
//                         disabled={!isEdit}
//                       >
//                         Save Changes
//                       </Button>

//                       <Button
//                         type="button"
//                         isMain={true}
//                         onClick={() => removeAddress(ad.id)}
//                       >
//                         Delete Address
//                       </Button>
//                     </div>
//                   </div>
//                 </form>
//                 <SuccessModal isOpen={isEditSuccess} />
//               </FormProvider>
//             );
//           }
//           return null;
//         })
//       )}
//       <Button type="button" isMain={true} disabled={!isEdit}>
//         Add New Address
//       </Button>
//     </div>
//   );
// };

// export default AddressInfo;
