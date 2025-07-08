import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from './type';

const initialState: UserData = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  gender: '',
  password: '',
  termsAccepted: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = dataSlice.actions;
export default dataSlice.reducer;
