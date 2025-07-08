import { StyleSheet, View } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

const Style = StyleSheet.create({
  keyboardView: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  inner: {
   
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
    color: '#012d4a',
    marginTop:10,
  },
  err: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingLeft:5,
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  butt: {
    borderRadius:8,
    overflow: 'hidden',
    marginVertical: 20,
    backgroundColor: 'red'
  },
  signup: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainview: {
    flex: 1,
    backgroundColor: '#577d95',
  },
  headerstyle: {
    color: 'white',
    // height: 30
    justifyContent: 'center',
    alignContent: 'center',
  }
});
export default Style;