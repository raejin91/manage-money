const transactionColor = (type, id) => {
  switch (type) {
    case 'income':
      return 'text-primary';
    case 'expense':
      return 'text-danger';
    case 'debtLoan':
      if (id === 1 || id === 2) return 'text-primary';
      else return 'text-danger';
    default:
  }
};

export default transactionColor;
