export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IContacts {
  db: IContact[] | undefined;
}
