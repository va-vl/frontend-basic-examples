import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { booksApi } from './booksApi';

const rootReducer = combineReducers({
  [booksApi.reducerPath]: booksApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});
