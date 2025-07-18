import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, FontSize } from '../utils/styles';
import { ThemeContext } from './ThemeProvider';

const Title = ({ title = '', style = {} }) => {
    const { isDark } = useContext(ThemeContext);
    return (
        <Text style={[styles.defaultStyle, { color: isDark ? Colors.textDark : Colors.textLight }, style]}>
            {title}
        </Text>
    );
};

export default Title;

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: FontSize.s15,
    },
});
