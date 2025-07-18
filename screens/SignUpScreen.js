import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import MainScreen from '../components/MainScreen';
import MyButton from '../components/MyButton';

const window = Dimensions.get('window');
const db = getFirestore();

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  const isValidPassword = p => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(p);
  };

  const handleSignUp = async () => {
    try {
      if (email.length === 0 && password.length === 0) {
        setMessage('Email or Password cannot be empty');
        return;
      }

      if (!isValidPassword(password)) {
        Alert.alert('Alert', 'Password must be at least 8 characters, include upper and lower case letters, a number, and no more than 2 repeating characters.', [{ text: 'OK' }]);
        return;
      }

      const isUserCreated = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );

      const { user } = isUserCreated;
      setMessage('');
      const userData = {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        createdAt: new Date(),
      };

      try {
        await db.collection('users').add(userData);
        ToastAndroid.show('Welcome to myHr', ToastAndroid.SHORT);
      } catch (firestoreError) {
        console.error('Failed to save user data:', firestoreError);
        await user.delete();
        setMessage('Signup failed. Please try again.');
      }

    } catch (error) {
      console.error(error, 'Signup error');
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
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor={'white'}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor={'white'}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'white'}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
            placeholderTextColor={'white'}
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
            buttonContainerStyle={styles.secondaryButtonContainerStyle}
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
    height: window.height - StatusBar.currentHeight - 31,
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
    marginBottom: 10,
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
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonContainerStyle: {
    padding: 6,
  },
});
