import { useContext } from 'react';
import { ThemeContext } from '../lib/context';

export const useTheme = () => useContext(ThemeContext);
