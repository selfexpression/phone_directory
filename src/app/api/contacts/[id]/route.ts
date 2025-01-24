import { NextResponse } from 'next/server';
import db from '@/data/db.json';
import type { IContact } from '@/shared/types/contacts';

interface IResponse<T> {
  data?: T;
  error?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<IResponse<IContact[]>>> {
  try {
    const { id } = await params;

    if (!id) {
      throw new Error('Missing ID');
    }

    const contactIndex = db.findIndex((contact) => contact.id === Number(id));
    if (contactIndex !== -1) {
      db.splice(contactIndex, 1);
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
