import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceInterest } = body;

    // Server-side validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, Email, and Phone are required.' },
        { status: 400 }
      );
    }

    // Insert into DB using Prisma
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        serviceInterest,
      },
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error: any) {
    console.error('Database error:', error);
    
    // Check for specific Prisma errors if needed
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}