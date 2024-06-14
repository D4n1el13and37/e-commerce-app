const madeCorrectOutputPrice = (price: number, currency = '€') =>
  `${(price / 100).toFixed(2)} ${currency}`;

export default madeCorrectOutputPrice;
