import type { IContacts } from '../types/contacts';
import { API_URL } from '../constants/api';

export const getContacts = async (): Promise<IContacts> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }

  return await response.json();
};
