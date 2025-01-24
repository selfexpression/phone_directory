'use client';

import { useState, useEffect } from 'react';
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from '@/shared/lib/store/api';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import type { IContact } from '@/shared/types/contacts';
import { Toolbar } from '../toolbar';

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
    setRows: (newRows: IContact[]) => void;
    rows: IContact[];
  }
}

interface IDirectoryColumnsActions {
  handleEditClick: (id: GridRowId) => () => void;
  handleSaveClick: (id: GridRowId) => () => void;
  handleDeleteClick: (id: GridRowId) => () => Promise<void>;
  handleCancelClick: (id: GridRowId) => () => void;
  rowModesModel: GridRowModesModel;
}

const getDirectoryColumns = ({
  handleEditClick,
  handleSaveClick,
  handleDeleteClick,
  handleCancelClick,
  rowModesModel,
}: IDirectoryColumnsActions): GridColDef[] => {
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

interface IDirectory {
  data: IContact[] | undefined;
}
export const Directory: React.FC<IDirectory> = ({ data }) => {
  const [rows, setRows] = useState<IContact[] | undefined>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

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

  const processRowUpdate = async (newRow: IContact) => {
    const updatedRows = rows?.map((row) =>
      row.id === newRow.id ? newRow : row
    );

    await updateContact(newRow);
    setRows(updatedRows);
    return newRow;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const filteredRows = rows?.filter((row) => row.id !== id);
    await deleteContact(id as number);
    setRows(filteredRows);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const rowActions = {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  };

  const columns = getDirectoryColumns({
    ...rowActions,
    rowModesModel,
  });

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
        toolbar: { setRowModesModel, setRows, rows },
      }}
      autoPageSize
      pagination
    />
  );
};
