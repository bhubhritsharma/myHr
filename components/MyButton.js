import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const MyButton = ({
  title = 'OK',
  onPress = () => {},
  buttonContainerStyle = {},
  buttonTextStyle = {},
  buttonType = 'primary',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonContainerStyle,
        buttonType === 'primary' ? styles.containerStyle1 : styles.containerStyle2,
      ]}>
      <Text style={[buttonTextStyle, styles.textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  containerStyle1: {
    paddingHorizontal: 15,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#d1d1d1',
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
