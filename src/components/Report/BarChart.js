import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import transactionNumberType from '../../hooks/transactionNumberType';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ transactions, labels, options }) => {
  const [datasets, setDatasets] = useState([]);
  useEffect(() => {
    setDatasets([
      {
        label: 'Income',
        data: labels.map(day => {
          return transactions.reduce((total, ele) => {
            let result;
            if (transactionNumberType(ele.type, ele.categoryId) === '+') {
              if (ele.date === day) {
                result = total + +ele.amount;
              } else result = total;
            } else result = total;
            return result;
          }, 0);
        }),
        backgroundColor: 'blue',
      },
      {
        label: 'Expense',
        data: labels.map(day => {
          return -transactions.reduce((total, ele) => {
            let result;
            if (transactionNumberType(ele.type, ele.categoryId) === '-') {
              if (ele.date === day) {
                result = total + +ele.amount;
              } else result = total;
            } else result = total;
            return result;
          }, 0);
        }),
        backgroundColor: 'red',
      },
    ]);
  }, [labels.length]);
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
