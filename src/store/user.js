import { createSlice } from '@reduxjs/toolkit';

export const asyncGetUserData = async (dispatch) => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'zhuguoqin' });
    }, 2000);
  });
  await dispatch(getUserData(data));
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
  },
  reducers: {
    getUserData: (state, action) => {
      state.name = action.payload.name;
    },
  },
});
export const { getUserData } = userSlice.actions;

export default userSlice.reducer;
