'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataGrid,
  GridColDef,
  GridRowModesModel,
  GridRowModes,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { getContactsSelector } from '@/shared/lib/store/selectors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import type { IContact } from '@/shared/types/contacts';
import { Toolbar } from '../toolbar';
import { actions } from '@/shared/lib/store';

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

interface IDirectoryColumnsActions {
  setRowModesModel: (model: GridRowModesModel) => void;
  setRows: (rows: IContact[]) => void;
  rows: IContact[];
  rowModesModel: GridRowModesModel;
}

const getDirectoryColumns = ({
  setRowModesModel,
  setRows,
  rows,
  rowModesModel,
}: IDirectoryColumnsActions): GridColDef[] => {
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const filteredRows = rows.filter((row) => row.id !== id);
    setRows(filteredRows);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  return [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First name', editable: true },
    { field: 'lastName', headerName: 'Last name', editable: true },
    { field: 'phone', headerName: 'Phone', editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              key={id}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              key={id}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            key={id}
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            key={id}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
    },
  ] as const;
};
export const Directory = () => {
  const dispatch = useDispatch();
  const rows = useSelector(getContactsSelector);
  const setRows = (newRows: IContact[]) => {
    dispatch(actions.setContacts(newRows));
  };
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const columns = getDirectoryColumns({
    setRows,
    setRowModesModel,
    rows,
    rowModesModel,
  });

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow: IContact) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    return newRow;
  };

  return (
    <DataGrid
      editMode="row"
      rows={rows}
      columns={columns}
      onRowEditStop={handleRowEditStop}
      rowModesModel={rowModesModel}
      processRowUpdate={processRowUpdate}
      onRowModesModelChange={handleRowModesModelChange}
      disableColumnMenu
      slots={{ toolbar: Toolbar }}
      slotProps={{
        toolbar: { setRowModesModel },
      }}
      autoPageSize
      pagination
    />
  );
};
