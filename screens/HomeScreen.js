/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import MainScreen from '../components/MainScreen';
import MyButton from '../components/MyButton';
import {ScrollView, StyleSheet, Text} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await Auth().signOut();
      navigation.navigate(StackActions.popToTop());
    } catch (error) {
      console.error(error);
    }
  };

  const DashboardTab = () => (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Text>Dashboard Content</Text>
    </ScrollView>
  );

  const ProfileTab = () => (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Text>Profile Content</Text>
    </ScrollView>
  );

  return (
    <MainScreen
      isHomeScreen={true}
      userDetails={Auth()?.currentUser}
      headerRight={<MyButton title="Sign Out" onPress={handleSignOut} />}
      headerFloatingView={[
        {
          tabName: 'Dashboard',
          components: DashboardTab,
        },
        {
          tabName: 'Profile',
          components: ProfileTab,
        },
      ]}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 16,
  },
});
