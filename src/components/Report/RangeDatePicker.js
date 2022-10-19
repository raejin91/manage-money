import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { getReportByMonth } from '../../features/reportSlice';

const RangeDatePicker = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    dispatch(getReportByMonth(startDate));
  }, [startDate]);
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      dateFormat='MMMM, yyyy'
      showMonthYearPicker
      showFullMonthYearPicker
      showFourColumnMonthYearPicker
    />
  );
};

export default RangeDatePicker;
