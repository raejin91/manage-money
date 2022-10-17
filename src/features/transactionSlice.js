import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import transacionAmountConvert from '../hooks/transacionAmountConvert';
import transactionNumberType from '../hooks/transactionNumberType';

const client = axios.create({
  baseURL: 'http://localhost:3001/transactions',
});

export const createNewTransaction = createAsyncThunk(
  'transaction/createNewTransaction',
  async (transaction, thunkApi) => {
    try {
      const resp = await client.post(``, transaction);
      return resp.data;
    } catch (error) {
      console.log(`Create new transaction error: ${error.response.data}`);
    }
  }
);

export const deleteAllTransactions = createAsyncThunk(
  'transaction/deleteTransactionByWalletId',
  async (_, thunkApi) => {
    try {
      const idList = thunkApi.getState().transaction.transactions.map(e => e.id);
      const promises = idList.map(id => client.delete(`/${id}`));
      const response = await Promise.allSettled(promises);
      return response.reduce(
        (result, resp) => {
          return result && resp.status === 'fulfilled';
        },
        [true]
      );
    } catch (error) {
      console.log(`Delete transactions by wallet id error: ${error.response.messages}`);
    }
  }
);

export const deleteTransactionById = createAsyncThunk(
  'transaction/deleteTransactionById',
  async (id, thunkApi) => {
    try {
      await client.delete(`/${id}`);
      return id;
    } catch (error) {
      console.log(`Delete transaction by id error: ${error.response.messages}`);
    }
  }
);

export const editTransaction = createAsyncThunk(
  'transaction/editTransaction',
  async (transaction, thunkApi) => {
    try {
      const { data } = await client.put(`/${transaction.id}`, transaction);
      return data;
    } catch (error) {
      console.log(`Edit transaction error: ${error.response.messages}`);
    }
  }
);

export const getTransactionByWalletId = createAsyncThunk(
  'transaction/getTransactionByWalletId',
  async (walletId, thunkApi) => {
    try {
      const resp = await client.get(`?walletId=${walletId}`);
      return resp.data;
    } catch (error) {
      console.log(`Get Transactions by Wallet id error: ${error.response.data}`);
    }
  }
);

const initialState = {
  isLoading: false,
  transactions: [],
  selectedTransaction: {},
  inflow: 0,
  outflow: 0,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearTransactions: state => {
      state.transactions = [];
      state.selectedTransaction = {};
      state.inflow = 0;
      state.outflow = 0;
    },
    selectingTransactionById: (state, { payload }) => {
      state.selectedTransaction = state.transactions.filter(item => item.id === payload)[0];
    },
  },
  extraReducers: {
    // Create new transaction
    [createNewTransaction.pending]: state => {},
    [createNewTransaction.fulfilled]: (state, { payload }) => {
      const amount = transacionAmountConvert(payload.amount, payload.type, payload.categoryId);
      if (amount > 0) state.inflow += payload.amount;
      else state.outflow += payload.amount;
      state.transactions = [...state.transactions, payload];
    },
    [createNewTransaction.rejected]: state => {},
    // Get transactions by wallet id
    [getTransactionByWalletId.pending]: state => {},
    [getTransactionByWalletId.fulfilled]: (state, { payload }) => {
      payload.forEach(item => {
        const amount = transacionAmountConvert(item.amount, item.type, item.categoryId);
        if (amount > 0) state.inflow += item.amount;
        else state.outflow += item.amount;
      });
      state.transactions = payload;
    },
    [getTransactionByWalletId.rejected]: state => {},
    // Delete all transactions of currenct wallet
    [deleteAllTransactions.pending]: state => {},
    [deleteAllTransactions.fulfilled]: state => {
      state.transactions = [];
      state.inflow = 0;
      state.outflow = 0;
      state.selectedTransaction = {};
    },
    [deleteAllTransactions.rejected]: state => {},
    // Delete transaction by id
    [deleteTransactionById.pending]: state => {},
    [deleteTransactionById.fulfilled]: (state, { payload: deletedId }) => {
      state.selectedTransaction = {};
      state.transactions = state.transactions.filter(transaction => {
        if (transaction.id === deletedId) {
          const amount = transacionAmountConvert(
            transaction.amount,
            transaction.type,
            transaction.categoryId
          );
          if (amount > 0) state.inflow -= transaction.amount;
          else state.outflow -= transaction.amount;
        } else {
          return transaction;
        }
      });
    },
    [deleteTransactionById.rejected]: state => {},
    // Edit transaction
    [editTransaction.pending]: state => {},
    [editTransaction.fulfilled]: (state, { payload }) => {
      state.selectedTransaction = payload;
      if (transactionNumberType(payload.type, payload.categoryId) === '+') {
        const calculating = state.transactions.reduce(
          (result, tran) => {
            if (payload.id === tran.id) {
              if (transactionNumberType(payload.type, payload.categoryId) === '+') {
                return { ...result, inflow: result.inflow + payload.amount };
              } else {
                return { ...result, outflow: result.outflow + payload.amount };
              }
            } else {
              if (transactionNumberType(tran.type, tran.categoryId) === '+') {
                return { ...result, inflow: result.inflow + tran.amount };
              } else return { ...result, outflow: result.outflow + tran.amount };
            }
          },
          { inflow: 0, outflow: 0 }
        );
        state.inflow = calculating.inflow;
        state.outflow = calculating.outflow;
      } else {
        const calculating = state.transactions.reduce(
          (result, tran) => {
            if (payload.id === tran.id) {
              if (transactionNumberType(payload.type, payload.categoryId) === '+') {
                return { ...result, inflow: result.inflow + payload.amount };
              } else {
                return { ...result, outflow: result.outflow + payload.amount };
              }
            } else {
              if (transactionNumberType(tran.type, tran.categoryId) === '+') {
                return { ...result, inflow: result.inflow + tran.amount };
              } else return { ...result, outflow: result.outflow + tran.amount };
            }
          },
          { inflow: 0, outflow: 0 }
        );
        state.inflow = calculating.inflow;
        state.outflow = calculating.outflow;
      }
      state.transactions = state.transactions.map(item => {
        if (item.id === payload.id) item = payload;
        return item;
      });
    },
    [editTransaction.rejected]: state => {},
  },
});

export const { clearTransactions, selectingTransactionById } = transactionSlice.actions;

export default transactionSlice.reducer;
