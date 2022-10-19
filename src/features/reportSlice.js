import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import daysInMonth from '../hooks/daysInMonth';
import transactionNumberType from '../hooks/transactionNumberType';

const initialState = {
  datasets: [],
  labels: [],
  display: {
    income: 0,
    expense: 0,
  },
};

export const getReportByMonth = createAsyncThunk(
  'report/getReportByMonth',
  (dateData, thunkApi) => {
    try {
      const { transactions } = thunkApi.getState().transaction;
      const month = dateData.getMonth();
      return {
        reportTime: { month: dateData.getMonth() + 1, year: dateData.getFullYear() },
        data: transactions.filter(transaction => {
          const timeInfo = new Date(transaction.date);
          if (month === undefined && timeInfo.getMonth() === new Date().getMonth()) {
            return transaction;
          } else if (month === timeInfo.getMonth()) {
            return transaction;
          }
        }),
      };
    } catch (error) {
      console.log(`Get report by month error: ${error}`);
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducer: {},
  extraReducers: {
    [getReportByMonth.pending]: state => {},
    [getReportByMonth.fulfilled]: (state, { payload: { reportTime, data } }) => {
      const totalDays = daysInMonth(reportTime.year, reportTime.month);
      const result = {
        income: new Array(totalDays.length),
        expense: new Array(totalDays.length),
      };
      data.forEach(transaction => {
        const index = +(new Date(transaction.date).getDate() - 1);
        if (transactionNumberType(transaction.type, transaction.categoryId) === '+') {
          result.income[index] = result.income[index]
            ? result.income[index] + transaction.amount
            : transaction.amount;
        } else {
          result.expense[index] = result.expense[index]
            ? result.expense[index] - transaction.amount
            : -transaction.amount;
        }
      });
      state.labels = totalDays;
      state.datasets = [
        { label: 'Income', data: result.income, backgroundColor: 'rgba(53, 162, 235, 0.5)' },
        { label: 'Expense', data: result.expense, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
      ];
      state.display = {
        income: result.income.reduce((total, amount) => {
          return (total += amount);
        }, 0),
        expense: result.expense.reduce((total, amount) => {
          return (total += amount);
        }, 0),
      };
    },
    [getReportByMonth.rejected]: state => {},
  },
});

export default reportSlice.reducer;
