import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
  
    container: { flex: 1, 
      justifyContent:'center' , 
      borderColor:'#012d4a',
  },
      
  
    view: { flex: 1 ,  justifyContent: 'center'},
    text:{borderWidth: 1, 
      marginHorizontal: 16,
      borderRadius: 16,
      padding:10},
  
    mainbutt: {
      
      justifyContent: 'flex-end',
      gap: 5,
      borderRadius:8,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginHorizontal: 16,
    },
  
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#012d4a'
    },
    headerstyle: {
      color: 'white',
      height: 30,
      justifyContent: 'center',
      alignContent: 'center',
    },
  });

  export default Style;