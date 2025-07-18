import React from 'react';
import StackNavigator from './components/MainNavigator';
import '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { ThemeProvider } from './components/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <StackNavigator />
    </ThemeProvider>
  );
};

export default App;
