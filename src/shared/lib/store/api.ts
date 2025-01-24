import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/shared/constants/api';
import type { IContact } from '@/shared/types/contacts';
import type { IResponse } from '@/shared/types/api';

export const api = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL.CONTACTS,
  }),
  endpoints: (builder) => ({
    getContacts: builder.query<IResponse<IContact[]>, void>({
      query: () => '',
    }),
    createContact: builder.mutation<void, IContact>({
      query: (contact) => ({
        url: '',
        method: 'POST',
        body: contact,
      }),
    }),
    updateContact: builder.mutation<void, IContact>({
      query: (contact) => ({
        url: '',
        method: 'PUT',
        body: contact,
      }),
    }),
    deleteContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = api;
