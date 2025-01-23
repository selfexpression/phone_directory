'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid2 } from '@mui/material';
import { Directory } from '@/components/directory/component';
import type { IContact } from '@/shared/types/contacts';
import { actions } from '@/shared/lib/store';

interface MainPageProps {
  contacts: IContact[];
}
export const MainPage: React.FC<MainPageProps> = ({ contacts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setContacts(contacts));
  }, [dispatch, contacts]);

  return (
    <Grid2 container sx={{ height: '100vh' }}>
      <Directory />
    </Grid2>
  );
};
