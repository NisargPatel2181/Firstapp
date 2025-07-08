// import React, { useState, useRef } from 'react';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   View,
//   TextInput,
// } from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Style } from './Style';
// import { Butt } from '../component/Button';
// import InputText from '../component/InputText';
// import { useDispatch } from 'react-redux';
// // import { addUser, setCurrentUser } from '../redux/userSlice';

// const Home = ({ navigation }: {navigation :any}) => {
//   const [Fname, setFName] = useState('');
//   const [Lname, setLName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [checked, setChecked] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmpassword] = useState('');
//   const [checkbox, setCheckbox] = useState(false);
//   const dispatch = useDispatch();

//   const [error, setError] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     phone: '',
//     gender: '',
//     password: '',
//     confirmpassword: '',
//     checkbox: '',
//   });

//   const firstnameRef = useRef<TextInput>(null);
//   const lastnameRef = useRef<TextInput>(null);
//   const emailRef = useRef<TextInput>(null);
//   const phoneRef = useRef<TextInput>(null);
//   const passwordRef = useRef<TextInput>(null);
//   const confirmpasswordRef = useRef<TextInput>(null);

//   const validate = () => {
//     let newError = {
//       firstname: '',
//       lastname: '',
//       email: '',
//       phone: '',
//       gender: '',
//       password: '',
//       confirmpassword: '',
//       checkbox: '',
//     };
//     let isValid = true;

//     if (!Fname.trim()) {
//       newError.firstname = 'First name is required';
//       isValid = false;
//     }

//     if (!Lname.trim()) {
//       newError.lastname = 'Last name is required';
//       isValid = false;
//     }

//     if (!email) {
//       newError.email = 'Email id is required';
//       isValid = false;
//     } else if (
//       !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
//     ) {
//       newError.email = 'Wrong email id';
//       isValid = false;
//     }

//     if (!phone) {
//       newError.phone = 'Phone number is required';
//       isValid = false;
//     } else if (phone.length < 10) {
//       newError.phone = 'Wrong phone number';
//       isValid = false;
//     }

//     if (!checked) {
//       newError.gender = 'Gender is required';
//       isValid = false;
//     }

//     if (!password) {
//       newError.password = 'Password is required';
//       isValid = false;
//     } else if (password.length < 6) {
//       newError.password = 'Password must be at least 6 characters';
//       isValid = false;
//     }

//     if (!confirmpassword) {
//       newError.confirmpassword = 'Confirm password is required';
//       isValid = false;
//     } else if (password !== confirmpassword) {
//       newError.confirmpassword = 'Passwords do not match';
//       isValid = false;
//     }

//     if (!checkbox) {
//       newError.checkbox = 'Please agree to the terms and conditions';
//       isValid = false;
//     }

//     setError(newError);
//     return isValid;
//   };

//   const HandleSignUp = () => {
//     if (validate()) {
//       const newUser = {
//         Firstname: Fname,
//         Lastname: Lname,
//         email: email,
//         Phoneno: phone,
//         gender: checked,
//         password: password,
//       };

//       dispatch(addUser(newUser));
//       dispatch(setCurrentUser(email));

//       Alert.alert('Sign Up Successfully');
//       navigation.navigate('Profilescreen');
//     }
//   };

//   return (
//     <SafeAreaView style={Style.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={Style.main}>
//         <ScrollView keyboardShouldPersistTaps="handled">
//           {/* Input Fields */}
//           <View>
//             <Text style={Style.text}>First Name:</Text>
//             <InputText
//               placeholder="First Name"
//               onChangeText={setFName}
//               onSubmitEditing={() => lastnameRef.current?.focus()}
//               ref={firstnameRef}
//               containerStyle={Style.input}
//             />
//             {error.firstname && <Text style={Style.err}>{error.firstname}</Text>}
//           </View>

//           <View>
//             <Text style={Style.text}>Last Name:</Text>
//             <InputText
//               placeholder="Last Name"
//               onChangeText={setLName}
//               onSubmitEditing={() => emailRef.current?.focus()}
//               ref={lastnameRef}
//               containerStyle={Style.input}
//             />
//             {error.lastname && <Text style={Style.err}>{error.lastname}</Text>}
//           </View>

//           <View>
//             <Text style={Style.text}>Email Id:</Text>
//             <InputText
//               placeholder="Email"
//               onChangeText={setEmail}
//               onSubmitEditing={() => phoneRef.current?.focus()}
//               ref={emailRef}
//               containerStyle={Style.input}
//             />
//             {error.email && <Text style={Style.err}>{error.email}</Text>}
//           </View>

//           <View>
//             <Text style={Style.text}>Phone No:</Text>
//             <InputText
//               placeholder="Phone No"
//               onChangeText={setPhone}
//               onSubmitEditing={() => passwordRef.current?.focus()}
//               ref={phoneRef}
//               containerStyle={Style.input}
//               keyboardType="phone-pad"
//             />
//             {error.phone && <Text style={Style.err}>{error.phone}</Text>}
//           </View>

//           <View>
//             <Text style={Style.text}>Gender:</Text>
//             {['male', 'female', 'other'].map((value) => (
//               <View key={value} style={Style.radio}>
//                 <RadioButton
//                   value={value}
//                   status={checked === value ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked(value)}
//                   color="gray"
//                   uncheckedColor="gray"
//                 />
//                 <Text>{value.charAt(0).toUpperCase() + value.slice(1)}</Text>
//               </View>
//             ))}
//             {error.gender && <Text style={Style.err}>{error.gender}</Text>}
//           </View>

//           <View>
//             <Text style={Style.text}>Password:</Text>
//             <InputText
//               placeholder="Password"
//               onChangeText={setPassword}
//               onSubmitEditing={() => confirmpasswordRef.current?.focus()}
//               ref={passwordRef}
//               containerStyle={Style.input}
//             />
//             {error.password && <Text style={Style.err}>{error.password}</Text>}
//           </View>

//           <View>
//             <Text style={Style.text}>Confirm Password:</Text>
//             <InputText
//               placeholder="Confirm Password"
//               onChangeText={setConfirmpassword}
//               ref={confirmpasswordRef}
//               containerStyle={Style.input}
//             />
//             {error.confirmpassword && (
//               <Text style={Style.err}>{error.confirmpassword}</Text>
//             )}
//           </View>

//           {/* Checkbox */}
//           <View style={Style.chkbox}>
//             <BouncyCheckbox
//               isChecked={checkbox}
//               disableText
//               fillColor="gray"
//               size={19}
//               iconStyle={{ borderColor: 'black' }}
//               innerIconStyle={{ borderWidth: 1.8 }}
//               onPress={(isChecked) => setCheckbox(isChecked)}
//             />
//             <Text style={{ marginLeft: 8 }}>I agree to the terms and conditions</Text>
//           </View>
//           {error.checkbox && <Text style={Style.err}>{error.checkbox}</Text>}

//           {/* Submit Button */}
//           <Butt
//             title="Submit"
//             onPress={HandleSignUp}
//             Buttoncolor="#577d95"
//             containerStyle={Style.bhome}
//           />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default Home;
// function addUser(newUser: { Firstname: string; Lastname: string; email: string; Phoneno: string; gender: string; password: string; }): any {
//   throw new Error('Function not implemented.');
// }

// function setCurrentUser(email: string): any {
//   throw new Error('Function not implemented.');
// }

//

import React, {useState} from 'react';
import {
  Alert,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {addUser, setCurrentUser} from './Signupslice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Style} from './Style';
import {Butt} from '../../component/Button';
import InputText from '../../component/InputText';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {UserData} from './type';
import {RadioButton} from 'react-native-paper';
import {Header} from '../../component/header';

const SignUp = ({navigation}: {navigation: any}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
    gender: '',
    checkbox: '',
  });

  const dispatch = useDispatch();

  const validate = () => {
    let newError = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: '',
      phone: '',
      gender: '',
      checkbox: '',
    };
    let isValid = true;

    if (!firstname) {
      newError.firstname = 'First name is required';
      isValid = false;
    }

    if (!lastname) {
      newError.lastname = 'Last name is required';
      isValid = false;
    }

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

    if (!confirmpassword) {
      newError.confirmpassword = 'Confirm password is required';
      isValid = false;
    } else if (password !== confirmpassword) {
      newError.confirmpassword = 'Passwords do not match';
      isValid = false;
    }

    if (!phone) {
      newError.phone = 'Phone number is required';
      isValid = false;
    }

    if (!gender) {
      newError.gender = 'Gender is required';
      isValid = false;
    }

    if (!checkbox) {
      newError.checkbox = 'You must accept the terms and conditions';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSignUp = async () => {
    if (validate()) {
      const newUser: UserData = {
        firstname,
        lastname,
        email,
        phone,
        gender,
        password,
        termsAccepted: checkbox,
      };

      try {
        const usersJson = await AsyncStorage.getItem('users');
        const existingUsers = usersJson ? JSON.parse(usersJson) : [];

        const alreadyExists = existingUsers.some(
          (user: UserData) => user.email === email,
        );
        if (alreadyExists) {
          Alert.alert('Error', 'User already exists');
          return;
        }

        const updatedUsers = [...existingUsers, newUser];

        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        await AsyncStorage.setItem('currentUserEmail', email);

        dispatch(addUser(newUser));
        dispatch(setCurrentUser(email));

        Alert.alert('Sign Up Successfully');

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setGender('');
        setCheckbox(false);

        navigation.navigate('Log in');
      } catch (error) {
        console.error('Error saving user:', error);
        Alert.alert('Error', 'Failed to save user data.');
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#577d95'}}>
       <View>
          <Header
            source={require('../../assets/Larrow.png')}
            title={'Sign Up'}
            text={Style.headerstyle}
            imagestyle={''}
             onPress={() => navigation.goBack()}
          />
        </View>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={Style.main}>
       
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <Text style={Style.text}>First Name:</Text>
            <InputText
              placeholder="Enter your first name"
              value={firstname}
              onChangeText={setFirstname}
              containerStyle={Style.input}
            />
            {error.firstname ? (
              <Text style={Style.err}>{error.firstname}</Text>
            ) : null}
          </View>

          <View>
            <Text style={Style.text}>Last Name:</Text>
            <InputText
              placeholder="Enter your last name"
              value={lastname}
              onChangeText={setLastname}
              containerStyle={Style.input}
            />
            {error.lastname ? (
              <Text style={Style.err}>{error.lastname}</Text>
            ) : null}
          </View>

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
            <Text style={Style.text}>Phone:</Text>
            <InputText
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              containerStyle={Style.input}
              keyboardType="phone-pad"
            />
            {error.phone ? <Text style={Style.err}>{error.phone}</Text> : null}
          </View>

          <View>
            <View>
              <Text style={Style.text}>Gender:</Text>
              <View style={Style.radio}>
                <RadioButton
                  value="male"
                  color="gray"
                  uncheckedColor="gray"
                  status={gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('male')}
                />
                <Text style={Style.radio}>Male</Text>
              </View>
              <View style={Style.radio}>
                <RadioButton
                  value="female"
                  color="gray"
                  uncheckedColor="gray"
                  status={gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('female')}
                />
                <Text style={Style.radio}>Female</Text>
              </View>
              <View style={Style.radio}>
                <RadioButton
                  value="other"
                  color="gray"
                  uncheckedColor="gray"
                  status={gender === 'other' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('other')}
                />
                <Text style={Style.radio}>Other</Text>
              </View>
              {error.gender ? (
                <Text style={Style.err}>{error.gender}</Text>
              ) : null}
            </View>
          </View>

          <View>
            <Text style={Style.text}>Password:</Text>
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

          <View>
            <Text style={Style.text}>Confirm Password:</Text>
            <InputText
              placeholder="Confirm your password"
              value={confirmpassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              containerStyle={Style.input}
            />
            {error.confirmpassword ? (
              <Text style={Style.err}>{error.confirmpassword}</Text>
            ) : null}
          </View>

          {/* Checkbox for Terms and Conditions */}
          <View style={Style.chkbox}>
            <BouncyCheckbox
              isChecked={checkbox}
              disableText
              fillColor="gray"
              size={19}
              iconStyle={{borderColor: 'black'}}
              innerIconStyle={{borderWidth: 1.8}}
              onPress={isChecked => setCheckbox(isChecked)}
            />
            <Text style={{marginLeft: 8}}>
              I agree to the terms and conditions
            </Text>
          </View>
          {error.checkbox && <Text style={Style.err}>{error.checkbox}</Text>}

          {/* Sign Up Button */}
          <Butt
            title="Sign Up"
            onPress={handleSignUp}
            Buttoncolor="#577d95"
            containerStyle={Style.bhome}
          />

          {/* Login Link */}
          <View style={Style.signup}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Log in')}>
              <Text style={{color: '#012d4a', fontWeight: 'bold'}}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
      </SafeAreaView>
  );
};

export default SignUp;
