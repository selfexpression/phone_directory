'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: IContact[]) => IContact[]) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

interface IDirectoryColumnsActions {
  onSetRowModesModel: (model: GridRowModesModel) => void;
  onSetRow: (rows: IContact[]) => void;
  rows: IContact[];
  rowModesModel: GridRowModesModel;
}

const getDirectoryColumns = ({
  onSetRowModesModel,
  onSetRow,
  rows,
  rowModesModel,
}: IDirectoryColumnsActions): GridColDef[] => {
  const handleEditClick = (id: GridRowId) => () => {
    onSetRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    onSetRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    onSetRow(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    onSetRowModesModel({
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
  const contacts = useSelector(getContactsSelector);
  const [rows, setRows] = useState<IContact[]>(contacts);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const columns = getDirectoryColumns({
    onSetRow: setRows,
    onSetRowModesModel: setRowModesModel,
    rows,
    rowModesModel,
  });

  useEffect(() => {
    setRows(contacts);
  }, [contacts]);

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
        toolbar: { setRows, setRowModesModel },
      }}
      autoPageSize
      pagination
    />
  );
};
