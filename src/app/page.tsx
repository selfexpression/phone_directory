import { MainPage } from '@/pages/main-page';
import { getContacts } from '@/shared/api';
import type { IContacts } from '@/shared/types/contacts';

export default async function App() {
  const { data }: IContacts = await getContacts();
  return <MainPage contacts={data} />;
}
