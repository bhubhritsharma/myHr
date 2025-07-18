import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { Colors } from '../utils/styles';
import { ThemeContext } from './ThemeProvider';

const SectionHeading = ({
  heading = '',
  smallHeading = null,
  headingContainerStyle = {},
  headingTextStyle = {},
  smallTextStyle = {},
}) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <View style={[styles.containerStyle, headingContainerStyle]}>
      <Text style={[styles.textStyle, headingTextStyle, { color: isDark ? Colors.textDark : Colors.textLight }]}>{heading}</Text>
      {smallHeading && (
        <Text style={[styles.smallTextStyle, smallTextStyle, { color: isDark ? Colors.textDark : Colors.textLight }]}>
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
  },
  smallTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
  },
});
