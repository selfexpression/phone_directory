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
