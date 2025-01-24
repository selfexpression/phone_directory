import { NextResponse } from 'next/server';
import { writeDb, readDb } from '@/shared/utils/db';
import type { IContact } from '@/shared/types/contacts';
import type { IResponse } from '@/shared/types/api';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<IResponse<IContact[]>>> {
  try {
    const db = readDb();
    const { id } = await params;

    if (!id) {
      throw new Error('Missing ID');
    }

    const contactIndex = db.findIndex((contact) => contact.id === Number(id));
    if (contactIndex !== -1) {
      db.splice(contactIndex, 1);
      writeDb(db);

      return NextResponse.json({ data: db }, { status: 200 });
    } else {
      throw new Error('Contact not found');
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in DELETE /api/contacts/[id]:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
