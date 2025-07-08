// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import { RadioButton } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Style } from './Style';
// import { Butt } from '../component/Button';
// import InputText from '../component/InputText';

// export const Data = ({ navigation }: { navigation: any }) => {
//   const [Fname, setFName] = useState('');
//   const [Lname, setLName] = useState('');
//   const [email, setEmail] = useState('');
//   const [originalEmail, setOriginalEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [checked, setChecked] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmpassword] = useState('');

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

//   const Firstname = useRef<TextInput>(null);
//   const Lastname = useRef<TextInput>(null);
//   const Email = useRef<TextInput>(null);
//   const Phone = useRef<TextInput>(null);
//   const Password = useRef<TextInput>(null);
//   const Confirmpassword = useRef<TextInput>(null);

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const currentEmail = await AsyncStorage.getItem('currentUserEmail');
//         const data = await AsyncStorage.getItem('users');
//         if (currentEmail && data) {
//           const users = JSON.parse(data);
//           const currentUser = users.find((user: { email: string }) => user.email === currentEmail);
//           if (currentUser) {
//             setFName(currentUser.Firstname || '');
//             setLName(currentUser.Lastname || '');
//             setEmail(currentUser.email || '');
//             setOriginalEmail(currentUser.email || '');
//             setPhone(currentUser.Phoneno || '');
//             setChecked(currentUser.gender || '');
//             setPassword(currentUser.password || '');
//             setConfirmpassword(currentUser.password || '');
//           }
//         }
//       } catch (err) {
//         console.error('Error loading data', err);
//       }
//     };

//     loadUserData();
//   }, []);

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
//     } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
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
//       newError.password = 'Password must be at least 6 characters long';
//       isValid = false;
//     }

//     if (!confirmpassword) {
//       newError.confirmpassword = 'Password is required';
//       isValid = false;
//     } else if (password !== confirmpassword) {
//       newError.confirmpassword = 'Password Does not match';
//       isValid = false;
//     }

//     setError(newError);
//     return isValid;
//   };

//   const handleupdateData = async () => {
//     if (validate()) {
//       try {
//         const existingUsers = await AsyncStorage.getItem('users');
//         let users = existingUsers ? JSON.parse(existingUsers) : [];

//         const updatedUser = {
//           Firstname: Fname,
//           Lastname: Lname,
//           email: email,
//           Phoneno: phone,
//           gender: checked,
//           password: password,
//         };

//         const index = users.findIndex((u: any) => u.email === originalEmail);
//         if (index !== -1) {
//           users[index] = updatedUser;
//           if (originalEmail !== email) {
//             await AsyncStorage.setItem('currentUserEmail', email);
//             setOriginalEmail(email);
//           }
//         } else {
//           users.push(updatedUser);
//         }

//         await AsyncStorage.setItem('users', JSON.stringify(users));
//         Alert.alert('Data Updated Successfully');
//         navigation.navigate('Main');
//       } catch (error) {
//         console.error('Error updating user:', error);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={Style.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
//         style={Style.main}>
//         <ScrollView keyboardShouldPersistTaps="handled">
//           <View>
//             <Text style={Style.text}>First Name:</Text>

//             <InputText placeholder={'First Name '} onChangeText={setFName} onSubmitEditing={() => Lastname.current?.focus()} ref={Firstname} containerStyle={Style.input} value={Fname}
//             ></InputText>
//             {/* <TextInput
//               placeholder="First Name"
//               style={Style.input}
//               onChangeText={setFName}
//               value={Fname}
//               returnKeyType="next"
//               onSubmitEditing={() => Firstname.current?.focus()}
//             /> */}
//             {error.firstname ? <Text style={Style.err}>{error.firstname}</Text> : null}
//           </View>

//           <View>
//             <Text style={Style.text}>Last Name:</Text>

//             <InputText placeholder={'Last Name'} onChangeText={setLName} onSubmitEditing={() => Email.current?.focus()} ref={Lastname} containerStyle={Style.input} value={Lname}
//             ></InputText>
//             {/* <TextInput
//               placeholder="Last Name"
//               style={Style.input}
//               onChangeText={setLName}
//               value={Lname}
//               returnKeyType="next"
//               onSubmitEditing={() => Lastname.current?.focus()}
//               ref={Firstname}
//             /> */}
//             {error.lastname ? <Text style={Style.err}>{error.lastname}</Text> : null}
//           </View>

//           <View>
//             <Text style={Style.text}>Email Id:</Text>

//             <InputText placeholder={'Email Id'} onChangeText={setEmail} onSubmitEditing={() => Phone.current?.focus()} ref={Email} containerStyle={Style.input} value={email}
//             ></InputText>
//             {/* <TextInput
//               placeholder="Email Id"
//               style={Style.input}
//               onChangeText={setEmail}
//               value={email}
//               returnKeyType="next"
//               onSubmitEditing={() => Email.current?.focus()}
//               ref={Lastname}
//             /> */}
//             {error.email ? <Text style={Style.err}>{error.email}</Text> : null}
//           </View>

//           <View>
//             <Text style={Style.text}>Phone No:</Text>

//             <InputText placeholder={'Phone No'} onChangeText={setPhone} onSubmitEditing={() => Password.current?.focus()} ref={Phone} containerStyle={Style.input} keyboardType={"phone-pad"} value={phone}
//             ></InputText>
//             {/* <TextInput
//               placeholder="Phone No"
//               style={Style.input}
//               onChangeText={setPhone}
//               value={phone}
//               keyboardType="phone-pad"
//               returnKeyType="next"
//               onSubmitEditing={() => Phone.current?.focus()}
//               ref={Email}
//             /> */}
//             {error.phone ? <Text style={Style.err}>{error.phone}</Text> : null}
//           </View>

//           <View>
//             <Text style={Style.text}>Gender:</Text>
//             <View style={Style.radio}>
//               <RadioButton
//                 value="male"
//                 color="gray"
//                 uncheckedColor="gray"
//                 status={checked === 'male' ? 'checked' : 'unchecked'}
//                 onPress={() => setChecked('male')}
//               />
//               <Text style={Style.radio}>Male</Text>
//             </View>
//             <View style={Style.radio}>
//               <RadioButton
//                 value="female"
//                 color="gray"
//                 uncheckedColor="gray"
//                 status={checked === 'female' ? 'checked' : 'unchecked'}
//                 onPress={() => setChecked('female')}
//               />
//               <Text style={Style.radio}>Female</Text>
//             </View>
//             <View style={Style.radio}>
//               <RadioButton
//                 value="other"
//                 color="gray"
//                 uncheckedColor="gray"
//                 status={checked === 'other' ? 'checked' : 'unchecked'}
//                 onPress={() => setChecked('other')}
//               />
//               <Text style={Style.radio}>Other</Text>
//             </View>
//             {error.gender ? <Text style={Style.err}>{error.gender}</Text> : null}
//           </View>

//           <View>
//             <Text style={Style.text}>Password:</Text>

//             <InputText placeholder={'Password'} onChangeText={setPassword} onSubmitEditing={() => Confirmpassword.current?.focus()} ref={Password} containerStyle={Style.input} value={password}
//             ></InputText>
//             {/* <TextInput
//               placeholder="Password"
//               style={Style.input}
//               onChangeText={setPassword}
//               value={password}
//               secureTextEntry={true}
//               returnKeyType="next"
//               onSubmitEditing={() => Password.current?.focus()}
//             /> */}
//             {error.password ? <Text style={Style.err}>{error.password}</Text> : null}
//           </View>

//           <View>
//             <Text style={Style.text}>Confirm password:</Text>

//             <InputText placeholder={'Confirm password'} onChangeText={setConfirmpassword} ref={Confirmpassword} containerStyle={Style.input} value={confirmpassword}
//             ></InputText>
//             {/* <TextInput
//               placeholder="Confirm password"
//               style={Style.input}
//               onChangeText={setConfirmpassword}
//               value={confirmpassword}
//               secureTextEntry={true}
//               returnKeyType="done"
//               ref={Password}
//             /> */}
//             {error.confirmpassword ? (
//               <Text style={Style.err}>{error.confirmpassword}</Text>
//             ) : null}
//           </View>

//           <Butt
//             title={'Update Data'}
//             onPress={handleupdateData}
//             Buttoncolor={'#577d95'}
//             containerStyle={Style.bhome}
//           />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default Data;

import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Style} from './Style';
import {Butt} from '../../component/Button';
import InputText from '../../component/InputText';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import {updateUser} from './Dataslice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../component/header';

export const Data = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.data);

  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmpassword: '',
  });

  const [confirmpassword, setConfirmpassword] = useState(user.password);

  const Firstname = useRef<TextInput>(null);
  const Lastname = useRef<TextInput>(null);
  const Email = useRef<TextInput>(null);
  const Phone = useRef<TextInput>(null);
  const Password = useRef<TextInput>(null);
  const Confirmpassword = useRef<TextInput>(null);

  useEffect(() => {
    const hydrateUser = async () => {
      const email = await AsyncStorage.getItem('currentUserEmail');
      const allUsers = JSON.parse(await AsyncStorage.getItem('users') || '[]');
      const currentUser = allUsers.find((u: { email: string | null; }) => u.email === email);
  
      if (currentUser) {
        dispatch(updateUser(currentUser));

      }
    };
  
    hydrateUser();
  }, []);
  
  const validate = () => {
    let newError = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      gender: '',
      password: '',
      confirmpassword: '',
    };
    let isValid = true;

    if (!user.firstname.trim()) {
      newError.firstname = 'First name is required';
      isValid = false;
    }

    if (!user.lastname.trim()) {
      newError.lastname = 'Last name is required';
      isValid = false;
    }

    if (!user.email) {
      newError.email = 'Email is required';
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)
    ) {
      newError.email = 'Invalid email';
      isValid = false;
    }

    if (!user.phone || user.phone.length < 10) {
      newError.phone = 'Invalid phone number';
      isValid = false;
    }

    if (!user.gender) {
      newError.gender = 'Gender is required';
      isValid = false;
    }

    if (!user.password || user.password.length < 6) {
      newError.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmpassword || confirmpassword !== user.password) {
      newError.confirmpassword = 'Passwords do not match';
      isValid = false;
    }

    console.log('Validation Errors:', newError);
    setError(newError);
    return isValid;
  };

  const handleupdateData = async () => {
    if (validate()) {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        let users = storedUsers ? JSON.parse(storedUsers) : [];

        const index = users.findIndex((u: any) => u.email === user.email);
        if (index !== -1) {
          users[index] = user;
          console.log('User updated in AsyncStorage:', user);
        } else {
          users.push(user);
          console.log('New user added to AsyncStorage:', user);
        }

        await AsyncStorage.setItem('users', JSON.stringify(users));
        await AsyncStorage.setItem('currentUserEmail', user.email);

        Alert.alert('Data Updated Successfully');
        navigation.navigate('Main');
      } catch (err) {
        console.error('Update Error:', err);
      }
    }
  };
  return (
    <SafeAreaView style={Style.container}>
      <View>
        <Header
          source={require('../../assets/left-arrow.png')}
          title={'Sign Up Data'}
          text={Style.headerstyle}
          imagestyle={''}
          // bell={require('../../assets/bell.png')}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
        style={Style.main}>
        <ScrollView keyboardShouldPersistTaps="handled">
           <Text style={Style.text}>First Name:</Text>
          <InputText
            placeholder="First Name"
            onChangeText={text => dispatch(updateUser({firstname: text}))}
            value={user.firstname}
            ref={Firstname}
            containerStyle={Style.input}
          />
          {error.firstname && <Text style={Style.err}>{error.firstname}</Text>}

          <Text style={Style.text}>Last Name:</Text>
          <InputText
            placeholder="Last Name"
            onChangeText={text => dispatch(updateUser({lastname: text}))}
            value={user.lastname}
            ref={Lastname}
            containerStyle={Style.input}
          />
          {error.lastname && <Text style={Style.err}>{error.lastname}</Text>}

          <Text style={Style.text}>Email:</Text>
          <InputText
            placeholder="Email"
            onChangeText={text => dispatch(updateUser({email: text}))}
            value={user.email}
            ref={Email}
            containerStyle={Style.input}
          />
          {error.email && <Text style={Style.err}>{error.email}</Text>}

           <Text style={Style.text}>Phone No:</Text>
          <InputText
            placeholder="Phone No"
            keyboardType="phone-pad"
            onChangeText={text => dispatch(updateUser({phone: text}))}
            value={user.phone}
            ref={Phone}
            containerStyle={Style.input}
          />
          {error.phone && <Text style={Style.err}>{error.phone}</Text>}

           <Text style={Style.text}>Gender:</Text>
          <View style={Style.radio}>
            <RadioButton
              value="male"
              status={user.gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => dispatch(updateUser({gender: 'male'}))}
            />
            <Text>Male</Text>
          </View>
          <View style={Style.radio}>
            <RadioButton
              value="female"
              status={user.gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => dispatch(updateUser({gender: 'female'}))}
            />
            <Text>Female</Text>
          </View>
          <View style={Style.radio}>
            <RadioButton
              value="other"
              status={user.gender === 'other' ? 'checked' : 'unchecked'}
              onPress={() => dispatch(updateUser({gender: 'other'}))}
            />
            <Text>Other</Text>
          </View>
          {error.gender && <Text style={Style.err}>{error.gender}</Text>}

          <Text style={Style.text}>Password:</Text>
          <InputText
            placeholder="Password"
            secureTextEntry
            onChangeText={text => dispatch(updateUser({password: text}))}
            value={user.password}
            ref={Password}
            containerStyle={Style.input}
          />
          {error.password && <Text style={Style.err}>{error.password}</Text>}

          <Text style={Style.text}>Confirm Password:</Text>
          <InputText
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={setConfirmpassword}
            value={confirmpassword}
            ref={Confirmpassword}
            containerStyle={Style.input}
          />
          {error.confirmpassword && (
            <Text style={Style.err}>{error.confirmpassword}</Text>
          )}

          <Butt
            title="Update Data"
            onPress={handleupdateData}
            Buttoncolor="#577d95"
            containerStyle={Style.bhome}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Data;

function setUser(currentUser: any): any {
  throw new Error('Function not implemented.');
}
