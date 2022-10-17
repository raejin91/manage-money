import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createNewTransaction, deleteAllTransactions } from './transactionSlice';
import useCurrentDate from '../hooks/useCurrentDate';
import transactionNumberType from '../hooks/transactionNumberType';

// const client = axios.create({
//   baseURL: 'https://api.apilayer.com/currency_data',
//   headers: {
//     apiKey: 'N64bLLewquc35LyEaKWkB324OsyC8404',
//   },
// });

const client = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getCurrencyList = createAsyncThunk('wallet/getCurrencyList', async () => {
  try {
    const resp = await client.get(`/currencies`);
    return resp.data;
  } catch (error) {
    console.log('get currency list fail: ' + error);
  }
});

export const getWalletById = createAsyncThunk('wallet/getWalletById', async (id, thunkApi) => {
  try {
    const { data } = await client.get(`/wallets?id=${id}`);
    return data[0];
  } catch (error) {
    console.log(`Get Wallet by Id error: ${error}`);
  }
});

export const getWalletByUserId = createAsyncThunk(
  'wallet/getWalletByUserId',
  async (userId, thunkApi) => {
    try {
      const { data } = await client.get(`/wallets?userId=${userId}`);
      return data;
    } catch (error) {
      console.log(`Get wallet by user id error: ${error.response}`);
    }
  }
);

export const createWallet = createAsyncThunk(
  'wallet/createWallet',
  async (requestData, thunkApi) => {
    try {
      const { data } = await client.post(`/wallets`, requestData);
      const finalData = data;
      if (data.balance > 0) {
        const newTransaction = {
          categoryId: 3,
          type: 'income',
          amount: data.balance,
          note: 'Initial Balance',
          date: useCurrentDate(),
          walletId: data.id,
        };
        thunkApi.dispatch(createNewTransaction(newTransaction));
      }
      return finalData;
    } catch (error) {
      console.log('Create new wallet fail: ' + error);
    }
  }
);

export const updateWallet = createAsyncThunk('wallet/updateWallet', async (wallet, thunkApi) => {
  try {
    const { balance } = thunkApi.getState().wallet.walletInfo;
    const { data } = await client.put(`/wallets/${wallet.id}`, wallet);
    if (data.balance !== balance) {
      const amount = data.balance - balance;
      const newTransaction = {
        categoryId: amount > 0 ? 3 : 20,
        type: amount > 0 ? 'income' : 'expense',
        amount: Math.abs(amount),
        note: 'Initial Balance',
        date: useCurrentDate(),
        walletId: data.id,
      };
      thunkApi.dispatch(createNewTransaction(newTransaction));
    }
    return data;
  } catch (error) {
    console.log(`Update Wallet error: ${error}`);
  }
});

export const adjustBalance = createAsyncThunk(
  'wallet/adjustBalance',
  async (newBalance, thunkApi) => {
    try {
      const wallet = thunkApi.getState().wallet.walletInfo;
      const { data } = await client.put(`/wallets/${wallet.id}`, {
        ...wallet,
        balance: newBalance,
      });
      if (newBalance !== wallet.balance) {
        const amount = newBalance - wallet.balance;
        const newTransaction = {
          categoryId: amount > 0 ? 3 : 20,
          type: amount > 0 ? 'income' : 'expense',
          amount: Math.abs(amount),
          note: 'Adjust balance',
          date: useCurrentDate(),
          walletId: wallet.id,
        };
        thunkApi.dispatch(createNewTransaction(newTransaction));
        return data;
      }
    } catch (error) {
      console.log(`Adjust balance error: ${error.response.messages}`);
    }
  }
);

export const transactionBalanceChange = createAsyncThunk(
  'wallet/transactionBalanceChange',
  async (_, thunkApi) => {
    try {
      const { inflow, outflow } = thunkApi.getState().transaction;
      const { walletInfo: wallet } = thunkApi.getState().wallet;
      const { data } = await client.put(`/wallets/${wallet.id}`, {
        ...wallet,
        balance: inflow - outflow,
      });
      return data;
    } catch (error) {
      console.log(
        `Change balance when transaction change/create error: ${error.response.messages}`
      );
    }
  }
);

export const deleteWallet = createAsyncThunk('wallet/deleteWallet', async (walletId, thunkApi) => {
  try {
    thunkApi.dispatch(deleteAllTransactions());
    const resp = await client.delete(`/wallets/${walletId}`);
    return resp.data;
  } catch (error) {
    console.log(`Delete wallet error: ${error.response.data}`);
  }
});

const initialState = {
  walletInfo: {},
  currencyList: [],
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearWallet: state => {
      state.walletInfo = {};
    },
  },
  extraReducers: {
    [getCurrencyList.pending]: state => {},
    [getCurrencyList.fulfilled]: (state, { payload }) => {
      state.currencyList = Object.entries(payload);
    },
    [getCurrencyList.rejected]: state => {},
    // create new wallet reducer
    [createWallet.pending]: state => {},
    [createWallet.fulfilled]: (state, { payload }) => {
      state.walletInfo = payload;
    },
    [createWallet.rejected]: state => {},
    // Get wallet by id
    [getWalletById.pending]: state => {},
    [getWalletById.fulfilled]: (state, { payload }) => {
      state.walletInfo = payload;
    },
    [getWalletById.rejected]: state => {},
    // get wallet by userid
    [getWalletByUserId.pending]: state => {},
    [getWalletByUserId.fulfilled]: (state, { payload }) => {
      if (payload.length === 0) state.walletInfo = {};
      else state.walletInfo = payload[0];
    },
    [getWalletByUserId.rejected]: state => {},
    // Update wallet
    [updateWallet.pending]: state => {},
    [updateWallet.fulfilled]: (state, { payload }) => {
      state.walletInfo = payload;
    },
    [updateWallet.rejected]: state => {},
    // Adjust balance
    [adjustBalance.pending]: state => {},
    [adjustBalance.fulfilled]: (state, { payload }) => {
      state.walletInfo = payload;
    },
    [adjustBalance.rejected]: state => {},
    // Adjust balance when add/edit transaction
    [transactionBalanceChange.pending]: state => {},
    [transactionBalanceChange.fulfilled]: (state, { payload }) => {
      state.walletInfo = payload;
    },
    [transactionBalanceChange.rejected]: state => {},
    // Delete wallet
    [deleteWallet.pending]: state => {},
    [deleteWallet.fulfilled]: (state, { payload }) => {
      state.walletInfo = payload;
    },
    [deleteWallet.rejected]: state => {},
  },
});

export const { clearWallet } = walletSlice.actions;

export default walletSlice.reducer;
