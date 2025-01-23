'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
} from '@mui/x-data-grid';
import { getContactsSelector } from '@/shared/lib/store/selectors';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import type { IContact } from '@/shared/types/contacts';

export const Directory = () => {
  const contacts = useSelector(getContactsSelector);
  const [rows, setRows] = useState<IContact[]>(contacts);

  useEffect(() => {
    setRows(contacts);
  }, [contacts]);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: IContact) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    return newRow;
  };

  const columns: GridColDef[] = [
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
  ];

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
    />
  );
};
