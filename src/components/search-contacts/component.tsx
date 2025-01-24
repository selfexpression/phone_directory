'use client';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getContactsSelector } from '@/shared/lib/store/selectors';
import { actions } from '@/shared/lib/store';

export const SearchContacts = () => {
  const dispatch = useDispatch();
  const rows = useSelector(getContactsSelector);
  const originalRows = useRef(rows);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const filteredRows = originalRows.current.filter(
      (row) =>
        row.firstName.toLowerCase().includes(value.toLowerCase()) ||
        row.lastName.toLowerCase().includes(value.toLowerCase()) ||
        row.phone.includes(value)
    );

    dispatch(actions.setContacts(filteredRows));
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
