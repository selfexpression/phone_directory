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

export const EditToolbar = (props: GridSlotProps['toolbar']) => {
  const apiRef = useGridApiContext();
  const { setRows, setRowModesModel } = props;
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handleClick = () => {
    const id = Math.floor(Math.random() * 1000);

    setRows((oldRows) => [
      ...oldRows,
      { id, firstName: '', lastName: '', phone: '' },
    ]);

    setRowModesModel((oldModel) => ({
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
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};
