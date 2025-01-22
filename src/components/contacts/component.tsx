'use client';

import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

const rows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 25 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 30 },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 35 },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
];

export const Contacts = () => {
  const handleColumnHeaderClick = (params: GridRowParams) => {
    console.log(params.id);
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      disableColumnMenu
      onRowClick={handleColumnHeaderClick}
    />
  );
};
