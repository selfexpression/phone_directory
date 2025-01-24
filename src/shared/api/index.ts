import type { IContacts, IContact } from '../types/contacts';
import { API_URL } from '../constants/api';

export const getContacts = async (): Promise<IContacts> => {
  const response = await fetch(API_URL.CONTACTS);

  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }

  return await response.json();
};

export const deleteContact = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL.CONTACTS}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
};

export const updateContact = async (newData: IContact): Promise<void> => {
  const response = await fetch(API_URL.CONTACTS, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    throw new Error('Failed to update contact');
  }
};

export const createContact = async (newData: IContact): Promise<void> => {
  const response = await fetch(API_URL.CONTACTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    throw new Error('Failed to create contact');
  }
};
