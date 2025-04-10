import React from 'react';
import StackNavigator from './components/MainNavigator';
import '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const App = () => {
  return <StackNavigator />;
};

export default App;
