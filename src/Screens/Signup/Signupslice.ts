// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { UserData } from './type';


// export const initialState: UserData = {
//   firstname: '',
//   lastname: '',
//   email: '',
//   phone: '',
//   gender: '',
//   password: '',
//   termsAccepted: false
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     addUser: (state, action: PayloadAction<UserData>) => {
//       return { ...state, ...action.payload };
//     },
//     setCurrentUser: (state, action: PayloadAction<string>) => {
//       state.email = action.payload;
//     },
//   },
// });

// export const { addUser, setCurrentUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from './type';

export const initialState: UserData = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  gender: '',
  password: '',
  termsAccepted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      // Direct mutation is safe because of Immer
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.password = action.payload.password;
      state.termsAccepted = action.payload.termsAccepted;
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { addUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
