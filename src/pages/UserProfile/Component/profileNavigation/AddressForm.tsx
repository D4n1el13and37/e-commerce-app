// import React, { useEffect, useState } from 'react';
// import { Address } from '@commercetools/platform-sdk';
// import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
// import { SingleValue } from 'react-select';
// import {
//   CountryOptionInterface,
//   countryOptions,
// } from '../../../Register/Component/AddressForm/countryOptions';
// import CountrySelect from '../../../Register/Component/AddressForm/CountrySelect';
// import City from '../../../../components/form/address/city/city';
// import Street from '../../../../components/form/address/street/street';
// import Postcode from '../../../../components/form/address/postcode/postcode';
// import Checkbox from '../../../../components/ui/checkbox/Checkbox';
// import Button from '../../../../components/ui/button/Button';
// import { AddresesForm, AddressInfoData } from './AddressInfo';
// import classes from '../../userProfile.module.scss';

// // interface CustomAddress {
// //     country: 'countryShipping' | 'countryBilling' | '';
// //     city: string;
// //     streetName: string;
// //     postalCode: string;
// //     defaultAddress: boolean;
// //   }

// interface AddressFormProps {
//   address: Address;
//   addressType: 'Shipping' | 'Billing';
//   defaultAddressId: string | undefined;
//   onSubmit: (data: AddressInfoData) => unknown;
//   onRemove: (id: string) => Promise<void>;
// }

// const AddressForm: React.FC<AddressFormProps> = ({
//   address,
//   addressType,
//   defaultAddressId,
//   onSubmit,
//   onRemove,
// }) => {
//   const addressId = address.id!;
//   const methods = useForm<AddresesForm>(/* { defaultValues: address } */);
//   const {
//     handleSubmit,
//     setValue,
//     getValues,
//     // formState: { errors },
//   } = methods;

//   const [isEdit, setIsEdit] = useState(false);
//   const [selectedCountry, setSelectedCountry] =
//     useState<SingleValue<CountryOptionInterface> | null>(
//       countryOptions.find((option) => option.value === address.country) || null
//     );

//   // console.log('INDEX', defaultAddressId, addressId);
//   const [isDefault, setIsDefault] = useState<boolean>(
//     addressId === defaultAddressId
//   );

//   const handleCountryChange = (
//     selectedOption: SingleValue<CountryOptionInterface> | null
//   ) => {
//     setSelectedCountry(selectedOption);
//     setValue('country', selectedOption?.value || '');
//     // setValue(`country${addressType}`, selectedOption?.value || '');
//   };

//   const handleEditClick = () => {
//     setIsEdit(true);
//   };

//   const handleSave: SubmitHandler<AddressInfoData> = async () => {
//     const dataFromForm = getValues();

//     console.log('dataFromForm', dataFromForm);

//     const formData = {
//       id: addressId,
//       address: {
//         country: selectedCountry?.value,
//         city: dataFromForm[`city${addressId}`],
//         streetName: dataFromForm[`streetName${addressId}`],
//         postalCode: dataFromForm[`postalCode${addressId}`],
//       },
//     };

//     // Добавила проверку, что если не установлено значение то оно и в форму не добавляется.
//     if (isDefault) {
//       formData[`default${addressType}Address`] = addressId;
//     }

//     // console.log('data from form', formData);
//     await onSubmit(formData);
//     setIsEdit(false);
//   };

//   const handleRemove = () => {
//     onRemove(addressId);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form
//         className={classes.profileData__address}
//         onSubmit={handleSubmit(handleSave)}
//       >
//         {addressId === defaultAddressId && (
//           <span className={classes.default}>Default {addressType} Address</span>
//         )}
//         <div className={classes.profileData__wrapper}>
//           <div
//             className={classes.profileData__country}
//             onClick={handleEditClick}
//           >
//             <CountrySelect
//               control={methods.control}
//               name={`country${addressType}`}
//               setSelectedCountry={handleCountryChange}
//               value={selectedCountry}
//               isDisabled={!isEdit}
//             />
//           </div>
//           <City
//             name={address.city}
//             id={addressId}
//             onClick={handleEditClick}
//             onChange={(value) =>
//               setValue(`city${addressType}`, value.target.value)
//             }
//           />
//           <Street
//             name={address.streetName}
//             id={addressId}
//             onClick={handleEditClick}
//             onChange={(value) =>
//               setValue(`streetName${addressType}`, value.target.value)
//             }
//           />
//           <Postcode
//             name={address.postalCode}
//             id={addressId}
//             onClick={handleEditClick}
//             onChange={(value) =>
//               setValue(`postalCode${addressType}`, value.target.value)
//             }
//             selectedCountry={selectedCountry}
//           />
//         </div>
//         <div className={classes.profileData__contolContainer}>
//           <Checkbox
//             label={`Use as default ${addressType.toLowerCase()} address`}
//             id={addressId}
//             // onClick={() => {
//             //   setIsEdit(true);
//             //   setValue(`default${addressType}Address`, addressId);
//             //   setIsDefault(!isDefault);
//             // }}
//             onChange={() => {
//               setIsEdit(true);
//               setIsDefault(!isDefault);
//               // setValue(`default${addressType}Address`, addressId); //
//             }}
//             checked={isDefault}
//           />
//           <div className={classes.profileData__buttonWrapper}>
//             <Button
//               type="submit"
//               isFilled={true}
//               isMain={true}
//               disabled={!isEdit}
//             >
//               Save Changes
//             </Button>
//             <Button type="button" isMain={true} onClick={handleRemove}>
//               Delete Address
//             </Button>
//           </div>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default AddressForm;
