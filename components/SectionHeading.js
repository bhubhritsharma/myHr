import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SectionHeading = ({
  heading = '',
  smallHeading = null,
  headingContainerStyle = {},
  headingTextStyle = {},
  smallTextStyle = {},
}) => {
  return (
    <View style={[headingContainerStyle, styles.containerStyle]}>
      <Text style={[headingTextStyle, styles.textStyle]}>{heading}</Text>
      {smallHeading && (
        <Text style={[smallTextStyle, styles.smallTextStyle]}>
          {smallHeading}
        </Text>
      )}
    </View>
  );
};

export default SectionHeading;

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  smallTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginTop: 5,
  },
});
