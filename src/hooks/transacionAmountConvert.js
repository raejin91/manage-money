import transactionNumberType from './transactionNumberType';

const transacionAmountConvert = (amount, type, categoryId) =>
  +`${transactionNumberType(type, categoryId)}${amount}`;

export default transacionAmountConvert;
