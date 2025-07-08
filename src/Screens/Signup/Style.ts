import { StyleSheet } from "react-native"
export const Style = StyleSheet.create({

  main: {
    marginTop: 30,
    marginHorizontal: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
    color: '#012d4a',
  },
  err: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingLeft: 5,
    fontSize: 16,
    marginBottom: 5,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  chkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  bhome: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerstyle: {
    color: 'white',
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
