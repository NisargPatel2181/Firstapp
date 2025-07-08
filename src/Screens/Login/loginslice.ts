// import { createSlice } from '@reduxjs/toolkit';
// import  {User}  from './type';

// const initialState: User = {
//     email: '',
//     password: '',
//     Firstname: '',
//     Lastname: '',
//     Phoneno: '',
//     gender: ''
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.email = action.payload.email;
//       state.password = action.payload.password;
//     },
//     clearUser: (state) => {
//       state.email = '';
//       state.password = '';
//     }
//   }
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './type';  // Assuming User type is defined elsewhere


const initialState: User = {
  user: {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    gender: '',
    imageUri: '' 
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<User>) => {
      state.user =  action.payload.user;
    },
    
    clearUser: (state) => {
      // state.email = '';
      // state.password = '';
      // state.firstname = '';
      // state.lastname = '';
      // state.phone = '';
      // state.gender = '';
      // state.imageUri = ''; 
      state.user;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
