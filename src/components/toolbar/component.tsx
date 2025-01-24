'use client';

import { useCreateContactMutation } from '@/shared/lib/store/api';
import {
  GridRowModes,
  GridToolbarContainer,
  GridSlotProps,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { ToggleThemeButton } from '../toggle-theme-button';
import { SearchContacts } from '../search-contacts';

export const Toolbar = (props: GridSlotProps['toolbar']) => {
  const [createContact] = useCreateContactMutation();
  const apiRef = useGridApiContext();
  const { setRowModesModel, setRows, rows } = props;
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handleAddRecord = async () => {
    const id = Math.floor(Math.random() * 1000);
    const newRow = { id, firstName: '', lastName: '', phone: '' };

    await createContact(newRow);
    setRows([...rows, newRow]);
    setRowModesModel?.((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
    }));
    if (pageCount > 1) {
      const lastPage = pageCount - 1;
      apiRef.current.setPage(lastPage);
    }
  };

  return (
    <GridToolbarContainer>
      <ToggleThemeButton />
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRecord}>
        Add record
      </Button>
      <SearchContacts rows={rows} setRows={setRows} />
    </GridToolbarContainer>
  );
};
