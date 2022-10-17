const useCurrentDate = () => {
  const dateInfo = new Date();
  const year = dateInfo.getFullYear();
  const month =
    dateInfo.getMonth() + 1 >= 10
      ? dateInfo.getMonth() + 1
      : `0${dateInfo.getMonth() + 1}`;
  const date =
    dateInfo.getDate() > 10 ? dateInfo.getDate() : `0${dateInfo.getDate()}`;
  return `${year}-${month}-${date}`;
};

export default useCurrentDate;
