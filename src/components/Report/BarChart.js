import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getReportByMonth } from '../../features/reportSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ options }) => {
  const dispatch = useDispatch();
  const { labels, datasets } = useSelector(state => state.report);
  useEffect(() => {
    if (datasets.length === 0) dispatch(getReportByMonth(new Date()));
  });
  return (
    <Bar
      data={{
        labels: labels,
        datasets: datasets,
      }}
      options={options}
    />
  );
};

export default BarChart;
