import React, { createContext, useState, useMemo } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark((prev) => !prev);
    const value = useMemo(() => ({ isDark, toggleTheme }), [isDark]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
