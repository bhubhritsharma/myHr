import { View } from 'react-native';
import React, { useContext } from 'react';
import { Colors, globalStyle } from '../utils/styles';
import { ThemeContext } from './ThemeProvider';

const SectionContainer = ({ children }) => {
    const { isDark } = useContext(ThemeContext);
    return (
        <View style={[globalStyle.sectionContainer, { backgroundColor: isDark ? Colors.sectionBGDark : Colors.sectionBGLight }]}>
            {children}
        </View>
    );
};

export default SectionContainer;
