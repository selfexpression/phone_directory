export interface IContact {
  id: number;
  name: string;
  phone: string;
}

export interface IContacts {
  data: IContact[];
}
