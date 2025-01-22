'use client';

import { useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { getContactsSelector } from '@/shared/lib/store/selectors';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'phone', headerName: 'Phone' },
];

export const Contacts = () => {
  const contacts = useSelector(getContactsSelector);

  const handleColumnHeaderClick = (params: GridRowParams) => {
    console.log(params.id);
  };

  return (
    <DataGrid
      rows={contacts}
      columns={columns}
      checkboxSelection
      disableColumnMenu
      onRowClick={handleColumnHeaderClick}
    />
  );
};
