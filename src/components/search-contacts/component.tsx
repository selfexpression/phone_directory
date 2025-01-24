'use client';

import { useRef, FC } from 'react';
import { Paper, InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import type { IContact } from '@/shared/types/contacts';

interface ISearchContacts {
  setRows: (newRows: IContact[]) => void;
  rows: IContact[];
}

export const SearchContacts: FC<ISearchContacts> = ({ rows, setRows }) => {
  const originalRows = useRef(rows);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const filteredRows = originalRows.current.filter(
      (row) =>
        row.firstName.toLowerCase().includes(value.toLowerCase()) ||
        row.lastName.toLowerCase().includes(value.toLowerCase()) ||
        row.phone.includes(value)
    );

    setRows(filteredRows);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Contacts"
        inputProps={{ 'aria-label': 'search contacts' }}
        onChange={handleSearchChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
