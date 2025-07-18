import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import MyButton from './MyButton';

const ThemeSwitcher = () => {
    const { isDark, toggleTheme } = useContext(ThemeContext);
    console.log(isDark, 'isDark');
    return (
        <MyButton isIconButton iconName={isDark ? 'sunny' : 'moon'} iconColor={isDark ? '#FAF9F6' : '#1E1E1E'} iconSize={20} onPress={toggleTheme} />
    );
};

export default ThemeSwitcher;
