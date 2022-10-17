const convertDecimal = string => {
  const strArr = string.toString().split('');
  if (strArr.length > 3) {
    for (let i = strArr.length - 3; i >= 0; i -= 3) {
      if (i === 0 || strArr[i] === '-') break;
      else strArr.splice(i, 0, '.');
    }
  }

  return strArr.join('');
};

export default convertDecimal;
