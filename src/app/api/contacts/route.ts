import { NextResponse } from 'next/server';
import db from '@/data/db.json';
import type { IContact } from '@/shared/types/contacts';

interface IResponse<T> {
  data?: T;
  error?: string;
}

export async function GET(): Promise<NextResponse<IResponse<IContact[]>>> {
  try {
    if (!db) {
      throw new Error('Database is empty or not found');
    }

    return NextResponse.json({ data: db }, { status: 200 });
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
    const response = await request.json();
    const contactIndex = db.findIndex(
      (contact) => contact.id === Number(response.id)
    );

    if (contactIndex !== -1) {
      const currentContact = db[contactIndex];
      db[contactIndex] = { ...currentContact, ...response };

      return NextResponse.json({ data: db[contactIndex] }, { status: 200 });
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
    const response = await request.json();
    db.push(response);

    return NextResponse.json({ data: response }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in POST /api:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
