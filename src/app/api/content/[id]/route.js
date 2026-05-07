import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/models/Content';

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(updatedContent);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
