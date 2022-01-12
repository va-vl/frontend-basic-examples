import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'First Post!',
  },
  {
    id: '2',
    title: 'Second Post!',
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export const postsReducer = postsSlice.reducer;
