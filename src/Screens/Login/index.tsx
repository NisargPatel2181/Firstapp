// import React, { useState, useRef } from 'react';
// import { Alert, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { setUser } from './Firstslice';

// import Style from './Style';
// import InputText from '../component/InputText';
// import { Butt } from '../component/Button';

// export const First = ({navigation}: {navigation: any}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState({
//     email: '',
//     password: '',
//   });

//   const useofref = useRef<TextInput>(null);
//   const dispatch = useDispatch();

//   const validate = () => {
//     const newError = { email: '', password: '' };
//     let isValid = true;

//     if (!email) {
//       newError.email = 'Email id is required';
//       isValid = false;
//     } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
//       newError.email = 'Wrong email id';
//       isValid = false;
//     }

//     if (!password) {
//       newError.password = 'Password is required';
//       isValid = false;
//     } else if (password.length < 6) {
//       newError.password = 'Password must be at least 6 characters long';
//       isValid = false;
//     }

//     setError(newError);
//     return isValid;
//   };

//   const handleSignIn = async () => {
//     if (validate()) {
//       dispatch(setUser({ email, password }));
//       Alert.alert('Sign In Successfully');
//       navigation.navigate('Main');
//     }
//   };

//   return (
//     <SafeAreaView style={Style.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />
//       <KeyboardAvoidingView
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
//         style={Style.keyboardView}>
//         <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
//           <View style={Style.inner}>
//             <Text style={Style.text}>Email Id:</Text>
//             <InputText
//               placeholder={'Email'}
//               onChangeText={setEmail}
//               onSubmitEditing={() => useofref.current?.focus()}
//               containerStyle={Style.input}
//             />
//             {error.email ? <Text style={Style.err}>{error.email}</Text> : null}

//             <Text style={Style.text}>Password:</Text>
//             <InputText
//               placeholder={'Password'}
//               onChangeText={setPassword}
//               onSubmitEditing={() => useofref.current?.focus()}
//               containerStyle={Style.input}
//               ref={useofref}
//             />
//             {error.password ? <Text style={Style.err}>{error.password}</Text> : null}

//             <Butt
//               title={'Sign In'}
//               onPress={handleSignIn}
//               containerStyle={Style.butt}
//               Buttoncolor="#577d95"
//             />

//             <View style={Style.signup}>
//               <Text>Don't have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Sign up')}>
//                 <Text style={{ color: '#012d4a' }}>Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default First;

import React, {useState} from 'react';
import {
  Alert,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from './loginslice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style from './Style';
import {Butt} from '../../component/Button';
import {Header} from '../../component/header';
import InputText from '../../component/InputText';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignIn = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const validate = () => {
    let newError = {email: '', password: ''};
    let isValid = true;

    if (!email) {
      newError.email = 'Email is required';
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      newError.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newError.password = 'Password is required';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSignIn = async () => {
    if (validate()) {
      try {
        console.log('SignIn Process Started');

        const users = JSON.parse((await AsyncStorage.getItem('users')) || '[]');
        console.log('Loaded Users:', users);

        const user = users.find(
          (u: {email: string; password: string}) =>
            u.email === email && u.password === password,
        );

        if (user) {
          dispatch(setUser(user));

          await AsyncStorage.setItem('currentUserEmail', user.email);
          console.log('User Signed In:', user.email);

          Alert.alert('Sign In Successful!');
          navigation.navigate('Main');
        } else {
          console.log('User not found or invalid credentials');
          Alert.alert('Invalid email or password');
        }
      } catch (error) {
        console.error('Error during sign-in process:', error);
        Alert.alert(
          'Error',
          'There was a problem signing in. Please try again.',
        );
      }
    }
  };

  return (
    <SafeAreaView style={Style.mainview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Style.keyboardView}>
     
      {/* <View> */}
        <Header
          title={'Login Screen'}
          text={Style.headerstyle}
        />
      {/* </View> */}

      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Style.keyboardView}> */}
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View>
            <Text style={Style.text}>Email:</Text>

            <InputText
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              containerStyle={Style.input}
              keyboardType="email-address"
            />
            {error.email ? <Text style={Style.err}>{error.email}</Text> : null}
          </View>

          <View>
            <Text style={Style.text}>Enter a Password:</Text>
            <InputText
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              containerStyle={Style.input}
            />
            {error.password ? (
              <Text style={Style.err}>{error.password}</Text>
            ) : null}
          </View>

          <Butt
            title="Sign In"
            onPress={handleSignIn}
            Buttoncolor="#577d95"
            containerStyle={Style.butt}
          />

          <Butt
            title="Api"
            onPress={() => navigation.navigate('MovieList')}
            Buttoncolor="#577d95"
            containerStyle={Style.butt}
          />

          <View style={Style.signup}>
            <Text>Don't have an account?  Please create account</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign up')}>
              <Text style={{color: '#012d4a', fontWeight: 'bold'}}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
