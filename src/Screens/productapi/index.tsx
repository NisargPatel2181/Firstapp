// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
// import {styles} from './style';
// import { Product } from './type';

// const MovieList = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then(response => response.json())
//       .then(data => {
//         setMovies(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       });
//   }, []);

//   const renderItem = ({ item }: { item: Product }) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.desc}>{item.description.substring(0, 60)}...</Text>
//       <Text style={styles.price}>Price: ${item.price}</Text>
//     </View>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={movies}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default MovieList;

/////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import { styles } from './style';
// import { Product } from './type';
// import { FloatingAction } from 'react-native-floating-action';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Searchbar } from 'react-native-paper';

// const MovieList = ({navigation}: {navigation:any}) => {
//   const [movies, setMovies] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = React.useState('');

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then(response => response.json())
//       .then(data => {
//         setMovies(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       });
//   }, []);

//   const renderItem = ({ item }: { item: Product }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
//     >
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.desc}>{item.description.substring(0, 60)}...</Text>
//       <Text style={styles.price}>Price: ${item.price}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
//   }

//   const actions = [
//   {
//     text: 'Add',
//     icon: require('../../assets/../assets/bell.png'),
//     name: 'add',
//     position: 1,
//   }
// ];

//   return (
//     <SafeAreaView style={styles.container}>
//     <Searchbar
//       placeholder="Search"
//       onChangeText={setSearchQuery}
//       value={searchQuery}
//     />

//       <FlatList
//         data={movies}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderItem}
//       />
//        <FloatingAction
//         actions={actions}
//         onPressItem={(name) => {
//           // if (name === 'bt_add_product') {
//             navigation.navigate('AddProduct');
//           // }
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// export default MovieList;

// function setLog(arg0: string) {
//   throw new Error('Function not implemented.');
// }

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import {styles} from './style';
// import {Product} from './type';
// import {FloatingAction} from 'react-native-floating-action';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {IconButton, Searchbar} from 'react-native-paper';
// import {useDispatch, useSelector} from 'react-redux';
// import {AppDispatch, RootState} from '../../Redux/store';
// import {fetchProducts, setSelectedProductId} from './ProductApislice';
// import {Header} from '../../component/header';

// const MovieList = ({navigation}: {navigation: any}) => {
//   const dispatch: AppDispatch = useDispatch();
//   const {
//     items: Movie,
//     loading,
//     error,
//   } = useSelector((state: RootState) => state.products);

//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const filteredMovies = Movie.filter((movie: {title: string}) =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   const renderItem = ({item}: {item: Product}) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => {
//         dispatch(setSelectedProductId(item.id));
//         navigation.navigate('ProductDetail');
//       }}>
//       <Image source={{uri: item.image}} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.desc}>
//         {item.description.length > 60
//           ? item.description.slice(0, 60) + '...'
//           : item.description}
//       </Text>
//       <Text style={styles.price}>Price: ${item.price}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text style={{color: 'red', padding: 20}}>{error}</Text>
//       </View>
//     );
//   }

//   const actions = [
//     {
//       text: 'Add',
//       icon: require('../../assets/plus.png'),
//       name: 'add',
//       position: 1,
//     },
//   ];

//   const clearSearch = () => setSearchQuery('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header
//         source={require('../../assets/Larrow.png')}
//         title={'Products'}
//         text={styles.headerstyle}
//         imagestyle={''}
//         onPress={() => navigation.goBack()}
//       />
//       <View style={{backgroundColor: 'white', flex:1}}>
//         <View style={styles.mainview}>
//           <Searchbar
//             placeholder="Search"
//             onChangeText={setSearchQuery}
//             value={searchQuery}
//             icon={() => (
//               <Image
//                 source={require('../../assets/search.png')}
//                 style={{width: 26, height: 26}}
//               />
//             )}
//             right={
//               searchQuery
//                 ? props => (
//                     <IconButton
//                       {...props}
//                       icon={() => (
//                         <Image
//                           source={require('../../assets/error.png')}
//                           style={{width: 26, height: 26}}
//                         />
//                       )}
//                       onPress={clearSearch}
//                     />
//                   )
//                 : undefined
//             }
//             style={{
//               backgroundColor: '#f0f0f0',
//               borderRadius: 10,
//             }}
//           />

//           <FlatList
//             keyExtractor={item => item.id.toString()}
//             renderItem={renderItem}
//             data={filteredMovies}
//             contentContainerStyle={{paddingBottom: 100}}
//             ListEmptyComponent={() => (
//               <Text style={{textAlign: 'center', marginTop: 20}}>
//                 No products found.
//               </Text>
//             )}
//           />
//         </View>
//       </View>
//       <FloatingAction
//         actions={actions}
//         onPressItem={() => navigation.navigate('AddProduct')}
//       />
//     </SafeAreaView>
//   );
// };

// export default MovieList;


////////////////////////////////////////////////////////////////////////

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {styles} from './style';
import {Product} from './type';
import {FloatingAction} from 'react-native-floating-action';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconButton, Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../Redux/store';
import {fetchProducts, setSelectedProductId} from './ProductApislice';
import {addToCart} from '../cart/cartslice';
import {Header} from '../../component/header';

const MovieList = ({navigation}: {navigation: any}) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    items: Movie,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredMovies = Movie.filter((movie: {title: string}) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Add to Cart handler
  const handleAddToCart = (item: Product) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        description: item.description,
      }),
    );
  };

  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setSelectedProductId(item.id));
          navigation.navigate('ProductDetail');
        }}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>
          {item.description.length > 60
            ? item.description.slice(0, 60) + '...'
            : item.description}
        </Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
      </TouchableOpacity>

      <Button title="Add to Cart"  onPress={() => handleAddToCart(item)} color={'#577d95'} />
    </View>
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red', padding: 20}}>{error}</Text>
      </View>
    );
  }

  const actions = [
    {
      text: 'Add Product',
      icon: require('../../assets/plus.png'),
      name: 'add_product',
      position: 1,
    },
    {
      text: 'My Cart',
      icon: require('../../assets/cart.png'),
      name: 'my_cart',
      position: 2,
    },
  ];

  const clearSearch = () => setSearchQuery('');

  return (
    <SafeAreaView style={styles.container}>
      <Header
        source={require('../../assets/Larrow.png')}
        title={'Products'}
        text={styles.headerstyle}
        imagestyle={''}
        onPress={() => navigation.goBack()}
      />
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.mainview}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            icon={() => (
              <Image
                source={require('../../assets/search.png')}
                style={{width: 26, height: 26}}
              />
            )}
            right={
              searchQuery
                ? props => (
                    <IconButton
                      {...props}
                      icon={() => (
                        <Image
                          source={require('../../assets/error.png')}
                          style={{width: 26, height: 26}}
                        />
                      )}
                      onPress={clearSearch}
                    />
                  )
                : undefined
            }
            style={{
              backgroundColor: '#1C1C1C',
              borderRadius: 10,
            }}
          />

          <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            data={filteredMovies}
            contentContainerStyle={{paddingBottom: 100}}
            ListEmptyComponent={() => (
              <Text style={{textAlign: 'center', marginTop: 20}}>
                No products found.
              </Text>
            )}
          />
        </View>
      </View>

      
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name === 'add_product') {
            navigation.navigate('AddProduct');
          } else if (name === 'my_cart') {
            navigation.navigate('MyCart');
          }
        }}
      />
    </SafeAreaView>
  );
};

export default MovieList;
