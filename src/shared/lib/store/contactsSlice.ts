import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IContact } from '@/shared/types/contacts';

const initialState: IContact[] = [];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (_, action: PayloadAction<IContact[]>) => {
      return action.payload;
    },
  },
});

export const contactsActions = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
