import { createSlice } from "@reduxjs/toolkit";
import { MainType } from "./type";

const initialState : MainType = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmpassword: '',
    imageUri: undefined
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.gender = action.payload.gender;
        state.password = action.payload.password;
        state.confirmpassword = action.payload.confirmpassword;
        state.imageUri = action.payload.imageUri;
      },
      clearUser: (state) => {
        state.firstname = '';
        state.lastname = '';
        state.email = '';
        state.phone = '';
        state.gender = '';
        state.password = '';
        state.confirmpassword = '';
        state.imageUri= undefined
      },
    },
  });
  
  export const { setUser, clearUser } = mainSlice.actions;
  export default mainSlice.reducer;
  