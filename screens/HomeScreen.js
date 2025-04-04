import React from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import MainScreen from '../components/MainScreen';
import MyButton from '../components/MyButton';
import {Text} from 'react-native';

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

  return (
    <MainScreen
      isHomeScreen={true}
      userDetails={Auth()?.currentUser}
      headerRight={<MyButton title="Sign Out" onPress={handleSignOut} />}
      headerFloatingView={[
        {
          tabName: 'Dashboard',
          components: () => {
            <Text>123</Text>;
          },
        },
        {
          tabName: 'Profile',
          components: () => {
            <Text>112233</Text>;
          },
        },
      ]}>
      <></>
    </MainScreen>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#d1d1d1',
//     backgroundColor: '#333',
//     padding: 10,
//     margin: 'auto',
//     borderRadius: 8,
//   },
//   button: {
//     marginBottom: 0,
//     marginTop: 'auto',
//   },
// });
