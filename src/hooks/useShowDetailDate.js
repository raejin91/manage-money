const useShowDetailDate = inputDate => {
  const data = new Date(inputDate);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = (d = data.getDate()) => {
    const lastChar = d.toString().length > 1 ? d.toString().slice(-1) : d.toString();
    if (lastChar === '1') return `${d}st`;
    else if (lastChar === '2') return `${d}nd`;
    else if (lastChar === '3') return `${d}rd`;
    else return `${d}th`;
  };
  return `${days[data.getDay()]}, ${date()} ${months[data.getMonth()]}, ${data.getFullYear()}`;
};

export default useShowDetailDate;
