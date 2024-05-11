// import { useState } from 'react';
// import Checkbox from '../../../../components/ui/checkbox/Checkbox';
// import { CountrySelect, CountryOption } from './CountrySelect';
// import { FormInfoProps } from '../interfaceRegister';
// import classes from '../Rigister.module.scss';
// import Input from '../../../../components/ui/input/Input';

// export default function AddressForm({
//   register,
//   errors,
//   typeAddress,
// }: FormInfoProps) {
//   const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
//     null
//   );

//   const handleCountryChange = (selectedOption: CountryOption) => {
//     setSelectedCountry(selectedOption);
//   };

//   const postcodeShipping = `postcode_${typeAddress}`;

//   return (
//     <div className={`${classes.address}`}>
//       <div className={`${classes.address__information}`}>
//         <div>
//           <CountrySelect
//             onCountryChange={handleCountryChange}
//             {...register('country', {})}
//           />
//           {errors.country && (
//             <div className={`${classes.error}`}>{errors.country.message}</div>
//           )}
//         </div>

//         <div>
//           <Input
//             {...register('street', {
//               required: 'Street must have at least 1 character',
//             })}
//             id={`street_${typeAddress}`}
//             fieldName="Street"
//             type="text"
//             placeholder="Street"
//             onChange={(value) => value}
//           />
//           {errors.street && (
//             <div className={`${classes.error}`}>{errors.street.message}</div>
//           )}
//         </div>

//         <div className={`${classes.address__code}`}>
//           <div>
//             <Input
//               {...register('city', {
//                 required: 'City must have at least 1 character',
//                 pattern: {
//                   value: /^[a-zA-Z\s]+$/,
//                   message: 'Street name must contain only letters',
//                 },
//               })}
//               id={`{city_${typeAddress}`}
//               fieldName="City"
//               type="text"
//               placeholder="City"
//               onChange={(value) => value}
//             />
//             {errors.city && (
//               <div className={`${classes.error}`}>{errors.city.message}</div>
//             )}
//           </div>

//           <div>
//             <Input
//               {...register(`postcode_${typeAddress}`, {
//                 required: 'Postcode is required',
//                 validate: (value) => {
//                   if (
//                     selectedCountry &&
//                     !selectedCountry.regex.test(value) &&
//                     value.length !== selectedCountry.lengthPostalcode
//                   ) {
//                     return 'Invalid postcode for this country';
//                   }
//                   return true;
//                 },
//               })}
//               id={`postcode_${typeAddress}`}
//               fieldName="Postcode"
//               type="text"
//               placeholder="Postcode"
//               disabled={!selectedCountry}
//               onChange={(value) => value}
//             />
//             {errors.postcodeShipping && (
//               <div className={`${classes.error}`}>
//                 {errors.postcodeShipping.message}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Checkbox label="Use as default address" />
//     </div>
//   );
// }
