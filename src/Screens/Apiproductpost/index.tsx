// AddProductScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { styles } from './Style';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Butt} from '../../component/Button';
import { Header } from '../../component/header';
import { useNavigation } from '@react-navigation/native';

const AddProductScreen = () => {

    const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const postProduct = async () => {
    const product = {
      title,
      price: parseFloat(price),
      description,
      category,
      image: image || 'https://i.pravatar.cc',
    };

    try {
      const res = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product),
      });

      const data = await res.json();
      Alert.alert('Success', 'Product created!');
      console.log('Created Product:', data);
    } catch (err) {
      Alert.alert('Error', 'Failed to create product');
      console.error('POST error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        
        <Header
          source={require('../../assets/Larrow.png')}
          title={'Add Product'}
          text={styles.headerstyle}
          imagestyle={''}
          onPress={() => navigation.goBack()}
          // bell={require('../../assets/bell.png')}
        />
    <ScrollView style={{backgroundColor: '#fff', padding: 20,}}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Image URL (optional)</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} />

      <Butt
                  title="Sign Up"
                  onPress={postProduct}
                  Buttoncolor="#577d95"
                  containerStyle={styles.bhome}
                />
    </ScrollView>
    </SafeAreaView>
  );
};



export default AddProductScreen;
