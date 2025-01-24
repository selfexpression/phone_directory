import fs from 'fs';
import path from 'path';
import type { IContact } from '../types/contacts';

const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');

export const readDb = (): IContact[] => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

export const writeDb = (data: IContact[]): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};
