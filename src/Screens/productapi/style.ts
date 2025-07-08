import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#577d95',
  },
  mainview: {
    flex:1,
    marginHorizontal:12,
    gap: 10,
    marginTop:10
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007bff',
  },
  headerstyle: {
    color: 'white',
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  }
});

