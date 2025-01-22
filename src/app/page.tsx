import { Grid2 } from '@mui/material';
import { Contacts } from '@/components/contacts';
import { Menu } from '@/components/menu/component';

export default function App() {
  return (
    <Grid2 container sx={{ height: '100vh' }}>
      <Menu />
      <Contacts />
    </Grid2>
  );
}
