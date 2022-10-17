import { configureStore } from '@reduxjs/toolkit';
import transaction from './features/transactionSlice';
import user from './features/userSlice';
import wallet from './features/walletSlice';
import categories from './features/categoriesSlice';

const store = configureStore({
  reducer: {
    user,
    transaction,
    wallet,
    categories,
  },
});

export default store;
