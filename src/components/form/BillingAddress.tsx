import Address from './Address';

export default function BillingAddress({ register, errors }) {
  return (
    <div>
      <h3>Billing Address</h3>
      <Address register={register} errors={errors} />
    </div>
  );
}
