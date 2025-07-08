import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../Screens/Login/loginslice';
import signupReducer from '../Screens/Signup/Signupslice';
import mainReducer from '../Screens/Main/Mainslice';
import dataReducer from '../Screens/datascreen/Dataslice';
import productsReducer from '../Screens/productapi/ProductApislice'
import cartReducer from '../Screens/cart/cartslice';

const rootReducer = combineReducers({
  user: userReducer,
  signup: signupReducer,
  main: mainReducer,
  data: dataReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
