'use client';

import { useGetContactsQuery } from '@/shared/lib/store/api';
import { Grid2 } from '@mui/material';
import { Directory } from '@/components/directory/component';

export const MainPage = () => {
  const { data } = useGetContactsQuery();

  return (
    <Grid2 container sx={{ height: '100vh' }}>
      <Directory data={data?.db} />
    </Grid2>
  );
};
