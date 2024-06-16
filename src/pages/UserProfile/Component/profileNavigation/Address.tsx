// import React, { useEffect, useState } from 'react';
// import AddressBlock from './Address/AddressBlock';
// import useAppSelector from '../../../../hooks/useAppSelector';
// import useAppDispatch from '../../../../hooks/useAppDispatch';

// import {
//   fetchAddresses,
//   selectAddresses,
//   selectBillingAddressId,
//   selectDefaultBillingAddressId,
//   selectDefaultShippingAddressId,
//   selectShippingAddressId,
// } from '../../../../store/addressSlice';

// const Address: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const addresses = useAppSelector(selectAddresses);
//   const defaultShippingAddress = useAppSelector(selectDefaultShippingAddressId);
//   const defaultBillingAddress = useAppSelector(selectDefaultBillingAddressId);
//   const billingAddressId = useAppSelector(selectBillingAddressId);
//   const shippingAddressId = useAppSelector(selectShippingAddressId);

//   useEffect(() => {
//     dispatch(fetchAddresses());
//   }, [dispatch]);

//   return (
//     <>
//       {addresses
//         .filter((address) => shippingAddressId?.includes(address.id as string))
//         .map((address) => (
//           <AddressBlock
//             id={address.id}
//             default={address.id === defaultShippingAddress ? 'Default' : ''}
//             country={address.country || ''}
//             city={address.city || ''}
//             streetName={address.streetName || ''}
//             postalCode={address.postalCode || ''}
//           />
//         ))}
//     </>
//   );
// };
// export default Address;
