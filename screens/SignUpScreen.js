import React, { useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import MainScreen from '../components/MainScreen';
import MyButton from '../components/MyButton';

const window = Dimensions.get('window');

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const isUserCreated = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        setMessage('');
        navigation.navigate('Login');
        console.log(isUserCreated, 'user created');
      } else {
        setMessage('Email and password cannot be empty');
      }
    } catch (error) {
      console.error(error, 'error');
      setMessage(error.message);
    }
  };

  return (
    <MainScreen title={'Sign Up'}>
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>SignUp with your email.</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {message && <Text style={styles.error}>{message}</Text>}
        </View>
        <View style={styles.signUp}>
          <Text>Already have an account ?</Text>
          <MyButton
            title={'Login'}
            buttonType="secondary"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </MainScreen>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    paddingBottom: 0,
    height: window.height - StatusBar.currentHeight - 16,
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
    marginBottom: 10,
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    color: 'blue',
  },
});
