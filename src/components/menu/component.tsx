'use client';

import { AppBar, Toolbar } from '@mui/material';
import { ToggleThemeButton } from '../toggle-theme-button';

export const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ToggleThemeButton />
      </Toolbar>
    </AppBar>
  );
};
