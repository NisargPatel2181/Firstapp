import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store';
import { removeFromCart } from './cartslice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';

const CartScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((total: any, item: { price: any; }) => total + item.price, 0);

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => dispatch(removeFromCart(item.id))}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>please fill your cart.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
