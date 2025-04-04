import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const MyButton = ({
  title = 'OK',
  onPress = () => {},
  buttonContainerStyle = {},
  buttonTextStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonContainerStyle, styles.containerStyle]}>
      <Text style={[buttonTextStyle, styles.textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 15,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#d1d1d1',
    borderRadius: 4,
  },
  textStyle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
});
