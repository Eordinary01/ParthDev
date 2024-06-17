import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ContactModel } from "@/models/Contact";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, email, message } = await req.json();
    const newContact = new ContactModel({ name, email, message });
    await newContact.save();

    return NextResponse.json({ message: 'Message received' }, { status: 200 });
  } catch (error) {
    console.error('Error', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Add your GET logic here if needed
  return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}

// Add handlers for other HTTP methods (PUT, DELETE, etc.) if needed