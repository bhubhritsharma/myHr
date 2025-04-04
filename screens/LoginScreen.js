import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';

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
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Login</Text>
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
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        {message && <Text style={styles.error}>{message}</Text>}
      </View>
      <View style={styles.signUp}>
        <Text>Do not have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpButton}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    marginVertical: 'auto',
    height: window.height,
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
    marginBottom: 0,
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  signUpButton: {
    color: 'blue',
  },
});
