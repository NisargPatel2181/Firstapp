// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from '../Screens/Signup/index';
// import First from '../Screens/Login/index';
// import {Data} from '../Screens/datascreen/index';

// import React from 'react';
// import Main from '../Screens/Main/index';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// // import MovieList from '../Screens/movieapi/index/';
// import ProductDetail from '../Screens/productdataapi';
// import MovieList from '../Screens/movieapi';
// // import Profile from '../../Profile/Profile';

// const Stack = createNativeStackNavigator();

// type RootStackParamList = {
//   'Log in': undefined;
//   'Sign up': undefined;
//   Main: undefined;
//   EditData: undefined;
//   MovieList: undefined;
//   ProductDetail: { id: number };
// };

// const StackNavigator = createNativeStackNavigator<RootStackParamList>();
// export const Nav = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Log in"
//           screenOptions={{
//             headerTitle: '',
//             headerStyle: {backgroundColor: '#577d95'},
//             headerShown:false
//           }}>
//           <Stack.Screen
//             name="Log in"
//             component={First}
//             options={{headerBackVisible: false}}></Stack.Screen>
//           <Stack.Screen name="Sign up" component={Home}></Stack.Screen>
//           <Stack.Screen
//             name="Main"
//             component={Main}
//             options={{headerBackVisible: false}}></Stack.Screen>
//           {/* <Stack.Screen name="Profilescreen" component={Profile}></Stack.Screen> */}
//           <Stack.Screen name="EditData" component={Data}></Stack.Screen>
//           <Stack.Screen name="MovieList" component={MovieList} />
//           <Stack.Screen
//             name="ProductDetail"
//             component={ProductDetail}
//             initialParams={{ id: 1 }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };
// export default Nav;


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Signup/index';
import First from '../Screens/Login/index';
import { Data } from '../Screens/datascreen/index';
import React from 'react';
import Main from '../Screens/Main/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductDetail from '../Screens/productdataapi';
import MovieList from '../Screens/productapi';
import AddProductScreen from '../Screens/Apiproductpost/index'
import MyCart from '../Screens/cart/index'



type RootStackParamList = {
  'Log in': undefined;
  'Sign up': undefined;
  Main: undefined;
  EditData: undefined;
  MovieList: undefined;
  ProductDetail: { id: number };
  AddProduct: undefined;
   MyCart: undefined;
};


const StackNavigator = createNativeStackNavigator<RootStackParamList>();

export const Nav = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator.Navigator
          initialRouteName="Log in"
          screenOptions={{
            headerTitle: '',
            // headerStyle: { backgroundColor: '#577d95' },
            headerShown: false,
          }}>
          <StackNavigator.Screen
            name="Log in"
            component={First}
            // options={{ headerBackVisible: false }}
          />
          <StackNavigator.Screen name="Sign up" component={Home} />
          <StackNavigator.Screen
            name="Main"
            component={Main}
            options={{ headerBackVisible: false }}
          />
          <StackNavigator.Screen name="EditData" component={Data} /> 
          <StackNavigator.Screen name="MovieList" component={MovieList} /> 
          <StackNavigator.Screen
            name="ProductDetail"
            component={ProductDetail}
            initialParams={{ id: 1 }} 
          />
          <StackNavigator.Screen name="AddProduct" component={AddProductScreen} />
          <StackNavigator.Screen name="MyCart" component={MyCart} />
          
        </StackNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Nav;
