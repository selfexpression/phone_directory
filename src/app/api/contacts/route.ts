import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/shared/utils/db';
import type { IContact } from '@/shared/types/contacts';
import type { IResponse } from '@/shared/types/api';

export async function GET(): Promise<NextResponse<IResponse<IContact[]>>> {
  try {
    const db = readDb();

    return NextResponse.json({ db }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in GET /api:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(
  request: Request
): Promise<NextResponse<IResponse<IContact>>> {
  try {
    const db = readDb();
    const response = await request.json();
    const contactIndex = db.findIndex(
      (contact) => contact.id === Number(response.id)
    );

    if (contactIndex !== -1) {
      const currentContact = db[contactIndex];
      db[contactIndex] = { ...currentContact, ...response };
      writeDb(db);

      return NextResponse.json({ db: db[contactIndex] }, { status: 200 });
    } else {
      throw new Error('Contact not found');
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in PUT /api:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<IResponse<IContact>>> {
  try {
    const db = readDb();
    const response = await request.json();
    db.push(response);
    writeDb(db);

    return NextResponse.json({ db: response }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in POST /api:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
