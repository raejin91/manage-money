const transactionNumberType = (type, id) => {
  switch (type) {
    case 'income':
      return '+';
    case 'expense':
      return '-';
    case 'debtLoan':
      if (id === 1 || id === 2) return '+';
      else return '-';
    default:
  }
};

export default transactionNumberType;
