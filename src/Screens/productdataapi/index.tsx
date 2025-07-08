// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
// import { RouteProp } from '@react-navigation/native';
// import { Product } from './type'; // Make sure you have this interface
// import { styles } from './style'; // Make sure this exists

// type ProductDetailRouteProp = RouteProp<{ params: { id: number } }, 'params'>;

// type Props = {
//   route: ProductDetailRouteProp;
// };

// const ProductDetail: React.FC<Props> = ({ route }) => {
//   const { id } = route.params;
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching product:', err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading || !product) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading product details...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={{ uri: product.image }} style={styles.image} />
//       <Text style={styles.title}>{product.title}</Text>
//       <Text style={styles.desc}>{product.description}</Text>
//       <Text style={styles.price}>Price: ${product.price}</Text>
//       <Text style={styles.category}>Category: {product.category}</Text>
//     </ScrollView>
//   );
// };

// export default ProductDetail;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, {useEffect, useState} from 'react';
// import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {styles} from './style';
// import {Product} from './type';

// type RootStackParamList = {
//   ProductDetail: {id: number};
// };

// type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

// const ProductDetail: React.FC<Props> = ({route}) => {
//   const {id} = route.params;
//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`https://fakestoreapi.com/products/${id}`);
//         const text = await response.text();

//         try {
//           const data = JSON.parse(text);
//           setProduct(data);
//         } catch (parseError) {
//           if (parseError instanceof Error) {
//             console.error('JSON parse error:', parseError.message);
//           } else {
//             console.error('Unknown error while parsing JSON');
//           }
//           console.error('Raw response:', text);
//           setProduct(null);
//         }
//       } catch (networkError) {
//         if (networkError instanceof Error) {
//           console.error('Network error:', networkError.message);
//         } else {
//           console.error('Unknown network error');
//         }
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <ActivityIndicator style={{marginTop: 20}} />;

//   if (!product) return <Text style={{marginTop: 20}}>Product not found</Text>;

//   return (
//     <View style={styles.container}>
//       <Image source={{uri: product.image}} style={styles.image} />
//       <Text style={styles.title}>{product.title}</Text>
//       <Text style={styles.desc}>{product.description}</Text>
//       <Text style={styles.price}>Price: ${product.price}</Text>
//     </View>
//   );
// };

// export default ProductDetail;

import React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/store';
import {styles} from './style';
import {Product} from './type';

type RootStackParamList = {
  ProductDetail: {id: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetail: React.FC<Props> = ({route}) => {
  const {id} = route.params;

  const {items: products, loading} = useSelector((state: RootState) => state.products);
  const product = products.find((p: Product) => p.id === id);

  if (loading) return <ActivityIndicator style={{marginTop: 20}} />;
  if (!product) return <Text style={{marginTop: 20}}>Product not found</Text>;

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
    </View>
  );
};

export default ProductDetail;
