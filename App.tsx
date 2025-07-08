// import React from 'react';
// import {StyleSheet} from 'react-native';
// import Nav from './src/Navigation/route';

//  const App = () => {
//   return <Nav />;
// };
// export default App;

import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store'

import Nav from './src/Navigation/route';

const App = () => {
  return (
    <Provider store={store}>
      <Nav />bvvjdabvjdab
    </Provider>
  );
};

export default App;

