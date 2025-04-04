import React, {useEffect} from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'Home' : 'Login';
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 2000);
  });
  return <></>;
};

export default SplashScreen;
