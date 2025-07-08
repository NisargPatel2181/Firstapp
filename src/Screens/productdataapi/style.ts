import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    flex:1
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'justify',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  headerstyle: {
    color: 'white',
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  }
});

