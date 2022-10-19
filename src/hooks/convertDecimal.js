const convertDecimal = string => {
  const strArr = string > 0 ? string.toString().split('') : Math.abs(string).toString().split('');
  if (strArr.length > 3) {
    for (let i = strArr.length - 3; i >= 0; i -= 3) {
      if (i === 0 || strArr[i] === '-') break;
      else strArr.splice(i, 0, '.');
    }
  }

  return string > 0 ? strArr.join('') : -strArr.join('');
};

export default convertDecimal;
