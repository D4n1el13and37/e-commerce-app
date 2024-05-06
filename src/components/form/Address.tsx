export default function Address({ register, errors }) {
  return (
    <div>
      <div>
        <input {...register('street', { require: true })} type="text" />
        <div>
          <input {...register('town')} type="text" />
          <input {...register('postcode')} type="text" />
        </div>
        <input {...register('country')} type="text" />
      </div>
      <input type="checkbox" id="defaultAddress" />
      <label for="defaultAddress">Use as default address</label>
    </div>
  );
}
