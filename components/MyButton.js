import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Title from './Title';
import { Colors } from '../utils/styles';

const MyButton = ({
  title = 'OK',
  onPress = () => { },
  buttonContainerStyle = {},
  buttonTextStyle = {},
  buttonType = 'primary',
  isSignOutBtn = false,
  isIconButton = false,
  iconName = 'checkmark',
  iconSize = 20,
  iconColor = '#000',
}) => {
  return (
    <>
      {isIconButton ?
        <TouchableOpacity onPress={onPress} style={styles.iconButton}>
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity> :
        <TouchableOpacity
          onPress={onPress}
          style={[
            isSignOutBtn
              ? styles.signOutBtn
              : buttonType === 'primary'
                ? styles.containerStyle1
                : styles.containerStyle2,
            buttonContainerStyle,
          ]}>
          <Title title={title} style={[styles.textStyle, buttonTextStyle]} />
        </TouchableOpacity>
      }
    </>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  signOutBtn: {
    paddingHorizontal: 15,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Colors.buttonBGDark,
    borderRadius: 4,
  },
  containerStyle1: {
    paddingHorizontal: 15,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#A8D5BA',
    borderRadius: 4,
  },
  containerStyle2: {
    paddingHorizontal: 15,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  textStyle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
});
