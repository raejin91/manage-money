import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from './categoriesSlice';
import { clearTransactions } from './transactionSlice';
import { clearWallet, getCurrencyList } from './walletSlice';
import client from './baseURL';
import { clearReport } from './reportSlice';

export const getUserByUsername = createAsyncThunk(
  'user/getUserByUsername',
  async (requestData, thunkApi) => {
    try {
      const { data } = await client.get(`/users/?username=${requestData.username}`);
      if (data.length === 0) return { error: `Username doesn't exist!` };
      else {
        if (data[0].password === requestData.password) {
          thunkApi.dispatch(getCategories());
          thunkApi.dispatch(getCurrencyList());
          return { user: data[0], error: null };
        } else return { error: 'Username or password is wrong!' };
      }
    } catch (error) {
      console.log(`Get user error: ${error}`);
    }
  }
);

export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkApi) => {
  try {
    const resp = await client.put(`/users/${user.id}`, user);
    return resp.data;
  } catch (error) {
    console.log(`Update user error: ${error}`);
  }
});

export const createNewUser = createAsyncThunk('user/createNewUser', async (user, thunkApi) => {
  try {
    const { data: usernameCheck } = await client.get(`/users/?username=${user.username}`);
    if (usernameCheck.length === 0) {
      const { data: emailCheck } = await client.get(`/users?email=${user.email}`);
      if (emailCheck.length === 0) {
        const resp = await client.post(`/users`, user);
        thunkApi.dispatch(getCurrencyList());
        return { user: resp.data, error: null };
      } else {
        return { user: {}, error: `Email already exist!` };
      }
    } else {
      return { user: {}, error: `Username already exist!` };
    }
  } catch (err) {
    console.log(`Create account error: ${err.response.data}`);
  }
});

export const signOut = createAsyncThunk('user/signOut', async (_, thunkApi) => {
  try {
    thunkApi.dispatch(clearTransactions());
    thunkApi.dispatch(clearWallet());
    // thunkApi.dispatch(clearReport());
    return true;
  } catch (error) {
    console.log(`Sign out error : ${error.response.messages}`);
  }
});

const initialState = {
  isLoading: false,
  userInfo: {},
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // Get user by username reducer
    [getUserByUsername.pending]: state => {
      state.isLoading = true;
    },
    [getUserByUsername.fulfilled]: (state, { payload }) => {
      if (payload.error === null) {
        state.error = payload.error;
        state.userInfo = payload.user;
      } else {
        state.error = payload.error;
      }
    },
    [getUserByUsername.rejected]: state => {
      state.isLoading = false;
    },
    // Update user
    [updateUser.pending]: state => {},
    [updateUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
    },
    [updateUser.rejected]: state => {},
    // Create new user
    [createNewUser.pending]: state => {},
    [createNewUser.fulfilled]: (state, { payload }) => {
      state.error = payload.error;
      state.userInfo = payload.user;
    },
    [createNewUser.rejected]: state => {},
    // Sign out
    [signOut.pending]: state => {},
    [signOut.fulfilled]: (state, { payload }) => {
      if (payload) state.userInfo = {};
    },
    [signOut.rejected]: state => {},
  },
});

// export const {  } = userSlice.actions;

export default userSlice.reducer;
