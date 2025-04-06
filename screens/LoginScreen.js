import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import MainScreen from '../components/MainScreen';
import MyButton from '../components/MyButton';

const window = Dimensions.get('window');

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const isUserLoggedIn = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        setMessage('');
        navigation.dispatch(
          StackActions.replace('Home', {
            email: isUserLoggedIn.user.email,
            name: isUserLoggedIn.user.displayName,
            uId: isUserLoggedIn.user.uid,
          }),
        );
        console.log(isUserLoggedIn, 'user');
      } else {
        setMessage('Email and password cannot be empty');
      }
    } catch (error) {
      console.error(error, 'error');
      setMessage(error.message);
    }
  };

  return (
    <MainScreen title={'Login'}>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Login with your email.</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'white'}
          />
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
            placeholderTextColor={'white'}
          />
          <View style={styles.buttonContainer}>
            <MyButton
              title={'Login'}
              onPress={handleLogin}
              buttonContainerStyle={styles.buttonContainerStyle}
            />
          </View>
          {message && <Text style={styles.error}>{message}</Text>}
        </View>
        <View style={styles.signUp}>
          <Text>Do not have an account ?</Text>
          <MyButton
            title={'SignUp'}
            buttonType="secondary"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </MainScreen>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: window.height - StatusBar.currentHeight - 55,
    padding: 16,
    paddingBottom: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    backgroundColor: '#333',
    padding: 10,
    margin: 'auto',
    borderRadius: 8,
  },
  inputField: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 4,
    color: '#fff',
    paddingHorizontal: 10,
  },
  buttonContainerStyle: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#d1d1d1',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  error: {
    fontSize: 13,
    color: 'red',
    width: 300,
    marginHorizontal: 'auto',
    marginTop: 10,
  },
  signUp: {
    marginBottom: 0,
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
  },
  signUpButton: {
    color: 'blue',
  },
});
