import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const client = axios.create({ baseURL: 'http://localhost:3001' });

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  try {
    const incomePromise = client.get(`/incomeCategories`);
    const expensePromise = client.get(`/expenseCategories`);
    const debtnLoadPromise = client.get(`/debtLoanCategories`);
    const responses = await Promise.allSettled([incomePromise, expensePromise, debtnLoadPromise]);
    const finalData = responses.map(resp => resp.value.data);
    return finalData;
  } catch (error) {
    console.log(`get categories error : ${error.response.messages}`);
  }
});

const initialState = {
  income: [],
  expense: [],
  debtLoan: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducer: {},
  extraReducers: {
    [getCategories.pending]: state => {},
    [getCategories.fulfilled]: (state, { payload }) => {
      payload.forEach((category, index) => {
        switch (index) {
          case 0:
            state.income = category;
            break;
          case 1:
            state.expense = category;
            break;
          case 2:
            state.debtLoan = category;
            break;
          default:
        }
      });
    },
    [getCategories.rejected]: state => {},
  },
});

export default categoriesSlice.reducer;
