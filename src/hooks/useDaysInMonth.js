const useDaysInMonth = (year, month) => {
  const totalDays = new Date(year, month, 0).getDate();
  let result = [];
  for (let i = 1; i <= totalDays; i++) {
    result = [...result, i];
  }
  return result;
};

export default useDaysInMonth;
