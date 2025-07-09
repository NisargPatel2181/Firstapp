// import React, {useEffect, useState, useRef} from 'react';
// import {
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   Alert,
//   AppState,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Style from './Style';
// import {Butt} from '../component/Button';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const Main = ({navigation}: {navigation: any}) => {
//   const [userData, setUserData] = useState<any>(null);
//   const [isReady, setIsReady] = useState(false);
//   const mounted = useRef(true);
//   const appState = useRef(AppState.currentState);

//   useEffect(() => {
//     mounted.current = true;
//     setIsReady(false);

//     const handleAppStateChange = (nextAppState: any) => {
//       if (
//         appState.current.match(/inactive|background/) &&
//         nextAppState === 'active'
//       ) {
//         checkAndRequestPermissions(); // Only request permissions if app is active
//       }
//       appState.current = nextAppState;
//     };

//     const subscription = AppState.addEventListener(
//       'change',
//       handleAppStateChange,
//     );

//     const initialize = async () => {
//       await checkAndRequestPermissions();
//       await getUserData();
//       if (mounted.current) {
//         setIsReady(true);
//       }
//     };

//     initialize();

//     return () => {
//       mounted.current = false;
//       subscription.remove();
//     };
//   }, []);

//   const checkAndRequestPermissions = async () => {
//     if (!mounted.current || Platform.OS !== 'android') return;

//     try {
//       const permissionsToRequest = [PermissionsAndroid.PERMISSIONS.CAMERA];

//       if (Platform.Version >= 33) {
//         permissionsToRequest.push(
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//         );
//       } else {
//         permissionsToRequest.push(
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         );
//       }

//       const permissions = await PermissionsAndroid.requestMultiple(
//         permissionsToRequest,
//       );

//       const allGranted = permissionsToRequest.every(
//         perm => permissions[perm] === PermissionsAndroid.RESULTS.GRANTED,
//       );

//       if (!allGranted && mounted.current) {
//         console.log('Some permissions not granted');
//         ToastAndroid.show(
//           'Permissions are required to continue',
//           ToastAndroid.LONG,
//         );
//       }
//     } catch (error) {
//       console.warn('Permission error:', error);
//     }
//   };

//   const getUserData = async () => {
//     try {
//       const currentUserEmail = await AsyncStorage.getItem('currentUserEmail');
//       const users = await AsyncStorage.getItem('users');

//       if (currentUserEmail && users) {
//         const parsedUsers = JSON.parse(users);
//         const foundUser = parsedUsers.find(
//           (u: any) => u.email === currentUserEmail,
//         );
//         if (foundUser && mounted.current) {
//           setUserData(foundUser);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem('currentUserEmail');
//       if (mounted.current) {
//         ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
//         navigation.replace('Log in');
//       }
//     } catch (error) {
//       console.error('Error logging out:', error);
//       if (mounted.current && isReady) {
//         Alert.alert('Error', 'Failed to logout. Please try again.');
//       }
//     }
//   };

//   const handleImagePick = () => {
//     if (!mounted.current || !isReady) return;

//     setTimeout(() => {
//       if (AppState.currentState === 'active') {
//         Alert.alert(
//           'Select Profile Picture',
//           'Choose an option',
//           [
//             {
//               text: 'Take Photo',
//               onPress: () => {
//                 launchCamera(
//                   {
//                     mediaType: 'photo',
//                     quality: 0.8,
//                     saveToPhotos: true,
//                     includeBase64: false,
//                   },
//                   response => handleImageResponse(response),
//                 );
//               },
//             },
//             {
//               text: 'Choose from Gallery',
//               onPress: () => {
//                 launchImageLibrary(
//                   {
//                     mediaType: 'photo',
//                     quality: 0.8,
//                     selectionLimit: 1,
//                   },
//                   response => handleImageResponse(response),
//                 );
//               },
//             },
//             {
//               text: 'Cancel',
//               style: 'cancel',
//             },
//           ],
//           {cancelable: true},
//         );
//       } else {
//         console.warn('App is not active, cannot show alert.');
//       }
//     }, 300);
//   };

//   const handleImageResponse = async (response: any) => {
//     if (!mounted.current) return;

//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.errorCode) {
//       if (isReady) {
//         Alert.alert('Error', response.errorMessage || 'Failed to pick image');
//       }
//     } else if (response.assets && response.assets[0].uri) {
//       const uri = response.assets[0].uri;
//       await updateUserImage(uri);
//     }
//   };

//   const updateUserImage = async (uri: string) => {
//     try {
//       const users = await AsyncStorage.getItem('users');
//       const email = await AsyncStorage.getItem('currentUserEmail');

//       if (users && email) {
//         const parsedUsers = JSON.parse(users);
//         const updatedUsers = parsedUsers.map((user: any) => {
//           if (user.email === email) {
//             user.imageUri = uri;
//             if (mounted.current) {
//               setUserData(user);
//             }
//           }
//           return user;
//         });

//         await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
//         if (mounted.current && isReady) {
//           ToastAndroid.show('Profile picture updated!', ToastAndroid.SHORT);
//         }
//       }
//     } catch (err) {
//       console.error('Failed to update image:', err);
//       if (mounted.current && isReady) {
//         Alert.alert('Error', 'Failed to update profile picture');
//       }
//     }
//   };

//   if (!isReady) {
//     return (
//       <SafeAreaView style={Style.safe}>
//         <View
//           style={[
//             Style.view,
//             {justifyContent: 'center', alignItems: 'center'},
//           ]}>
//           <Text>Loading...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={Style.safe}>
//       <View style={Style.view}>
//         <View style={Style.container}>
//           {userData ? (
//             <View style={Style.text}>
//               <Text style={Style.heading}>Welcome, {userData.Firstname}!</Text>

//               <View style={{position: 'relative', alignItems: 'center'}}>
//                 <TouchableOpacity onPress={handleImagePick} activeOpacity={0.8}>
//                   {userData.imageUri ? (
//                     <Image
//                       source={{uri: userData.imageUri}}
//                       style={{
//                         width: 120,
//                         height: 120,
//                         borderRadius: 60,
//                         marginBottom: 15,
//                       }}
//                     />
//                   ) : (
//                     <View
//                       style={{
//                         width: 120,
//                         height: 120,
//                         borderRadius: 60,
//                         backgroundColor: '#ccc',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         marginBottom: 15,
//                       }}>
//                       <Text style={{color: '#fff'}}>Add Photo</Text>
//                     </View>
//                   )}

//                   <View
//                     style={{
//                       position: 'absolute',
//                       bottom: 10,
//                       right: 0,
//                       width: 30,
//                       height: 30,
//                       borderRadius: 15,
//                       backgroundColor: '#577d95',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       borderWidth: 2,
//                       borderColor: '#fff',
//                     }}>
//                     <Text
//                       style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
//                       +
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>

//               <Text>First name: {userData.Firstname}</Text>
//               <Text>Last name: {userData.Lastname}</Text>
//               <Text>Email: {userData.email}</Text>
//               <Text>Phone: {userData.Phoneno}</Text>
//               <Text>Gender: {userData.gender}</Text>
//               <Text>Password: {userData.password}</Text>
//             </View>
//           ) : (
//             <Text>Loading user data...</Text>
//           )}
//         </View>
//       </View>

//       <View style={{gap: 5}}>
//         <Butt
//           title={'Edit data'}
//           onPress={() => navigation.navigate('EditData')}
//           Buttoncolor={'#577d95'}
//           containerStyle={Style.mainbutt}
//         />
//         <Butt
//           title={'Logout'}
//           onPress={handleLogout}
//           Buttoncolor={'#577d95'}
//           containerStyle={Style.mainbutt}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Main;

import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
  AppState,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Style from './Style';
import {Butt} from '../../component/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, clearUser} from './Mainslice';
import {RootState} from '../../Redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Header} from '../../component/header';

const Main = ({navigation}: {navigation: any}) => {
  const userData = useSelector((state: RootState) => state.main);
  console.log('userData', userData);

  const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);
  const mounted = useRef(true);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    mounted.current = true;
    setIsReady(false);

    const handleAppStateChange = (nextAppState: any) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkAndRequestPermissions();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    const initialize = async () => {
      console.log('Initializing Main Screen...');
      await checkAndRequestPermissions();
      await getUserDataFromAsyncStorage();
      if (mounted.current) {
        setIsReady(true);
        console.log('Initialization complete');
      }
    };

    initialize();

    return () => {
      mounted.current = false;
      subscription.remove();
    };
  }, []);

  const checkAndRequestPermissions = async () => {
    if (!mounted.current || Platform.OS !== 'android') return;

    try {
      const permissionsToRequest = [PermissionsAndroid.PERMISSIONS.CAMERA];

      if (Platform.Version >= 33) {
        permissionsToRequest.push(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
      } else {
        permissionsToRequest.push(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }

      const permissions = await PermissionsAndroid.requestMultiple(
        permissionsToRequest,
      );
      console.log('Permissions:', permissions);

      const allGranted = permissionsToRequest.every(
        perm => permissions[perm] === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (!allGranted && mounted.current) {
        ToastAndroid.show(
          'Permissions are required to continue',
          ToastAndroid.LONG,
        );
        console.log('Permissions not granted');
      } else {
        console.log('All permissions granted');
      }
    } catch (error) {
      console.warn('Permission error:', error);
    }
  };

  const getUserDataFromAsyncStorage = async () => {
    try {
      const currentUserEmail = await AsyncStorage.getItem('currentUserEmail');
      const users = await AsyncStorage.getItem('users');

      if (currentUserEmail && users) {
        const parsedUsers = JSON.parse(users);
        const foundUser = parsedUsers.find(
          (u: any) => u.email === currentUserEmail,
        );

        if (foundUser) {
          console.log('User found:', foundUser);
          dispatch(setUser(foundUser));
        } else {
          console.log('No matching user found!');
        }
      } else {
        console.log('Missing currentUserEmail or users data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await AsyncStorage.removeItem('currentUserEmail');
      dispatch(clearUser());
      ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
      navigation.replace('Log in');
    } catch (error) {
      console.error('Error logging out:', error);
      if (mounted.current && isReady) {
        Alert.alert('Error', 'Failed to logout. Please try again.');
      }
    }
  };

  const handleImagePick = () => {
    if (!mounted.current || !isReady) return;

    setTimeout(() => {
      if (AppState.currentState === 'active') {
        console.log('Prompting user to select a profile picture');
        Alert.alert(
          'Select Profile Picture',
          'Choose an option',
          [
            {
              text: 'Take Photo',
              onPress: () => {
                console.log('Opening camera...');
                launchCamera(
                  {
                    mediaType: 'photo',
                    quality: 0.8,
                    saveToPhotos: true,
                    includeBase64: false,
                  },
                  response => handleImageResponse(response),
                );
              },
            },
            {
              text: 'Choose from Gallery',
              onPress: () => {
                console.log('Opening gallery...');
                launchImageLibrary(
                  {
                    mediaType: 'photo',
                    quality: 0.8,
                    selectionLimit: 1,
                  },
                  response => handleImageResponse(response),
                );
              },
            },
            {text: 'Cancel', style: 'cancel'},
          ],
          {cancelable: true},
        );
      }
    }, 300);
  };

  const handleImageResponse = async (response: any) => {
    if (!mounted.current) return;

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      if (isReady) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image');
      }
    } else if (response.assets && response.assets[0].uri) {
      const uri = response.assets[0].uri;
      console.log('Image URI:', uri);
      await updateUserImage(uri);
    }
  };

  const updateUserImage = async (uri: string) => {
    try {
      console.log('Updating user image...');
      const users = await AsyncStorage.getItem('users');
      const email = await AsyncStorage.getItem('currentUserEmail');

      if (users && email) {
        const parsedUsers = JSON.parse(users);
        const updatedUsers = parsedUsers.map((user: any) => {
          if (user.email === email) {
            user.imageUri = uri;
          }
          return user;
        });

        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        console.log('Updated users in AsyncStorage');

        // Update the user data in Redux after updating the AsyncStorage
        const updatedUser = updatedUsers.find(
          (user: any) => user.email === email,
        );
        if (updatedUser) {
          dispatch(setUser(updatedUser)); // Ensure Redux is updated
        }

        ToastAndroid.show('Profile picture updated!', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.error('Failed to update image:', err);
      if (mounted.current && isReady) {
        Alert.alert('Error', 'Failed to update profile picture');
      }
    }
  };

  if (!isReady) {
    return (
      <SafeAreaView style={Style.safe}>
        <View
          style={[
            Style.view,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={Style.safe}>
      <View>
        <Header
          source={require('../../assets/left-arrow.png')}
          title={'Profile'}
          text={Style.headerstyle}
          imagestyle={''}
          // bell={require('../../assets/bell.png')}
        />
      </View>
      <View style={Style.view}>
        <View style={Style.container}>
          {userData && userData.email ? (
            <View style={Style.text}>
              <Text style={Style.heading}>Welcome, {userData.firstname}!</Text>

              <View style={{position: 'relative', alignItems: 'center'}}>
                <TouchableOpacity onPress={handleImagePick} activeOpacity={0.8}>
                  {userData.imageUri ? (
                    <Image
                      source={{uri: userData.imageUri}}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        marginBottom: 15,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        backgroundColor: '#ccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 15,
                      }}>
                      <Text style={{color: '#fff'}}>Add image</Text>
                    </View>
                  )}
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 0,
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: '#577d95',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 2,
                      borderColor: '#fff',
                    }}>
                    <Text
                      style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                      +
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text>First name: {userData.firstname || 'Not provided'}</Text>
              <Text>Last name: {userData.lastname || 'Not provided'}</Text>
              <Text>Email: {userData.email}</Text>
              <Text>Phone: {userData.phone || 'Not provided'}</Text>
              <Text>Gender: {userData.gender || 'Not provided'}</Text>
              <Text>Password: {userData.password}</Text>
            </View>
          ) : (
            <Text>No user data found</Text>
          )}
        </View>
      </View>

      <View style={{gap: 5}}>
        <Butt
          title={'Edit data'}
          onPress={() => navigation.navigate('EditData', {userData})}
          Buttoncolor={'#577d95'}
          containerStyle={Style.mainbutt}
        />
        <Butt
          title={'Logout'}
          onPress={handleLogout}
          Buttoncolor={'#577d95'}
          containerStyle={Style.mainbutt}
        />
      </View>
    </SafeAreaView>
  );
};

export default Main;
