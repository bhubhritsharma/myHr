import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onAuthStateChanged(getAuth(), user => {
        const routeName = user !== null ? 'Home' : 'Login';
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
