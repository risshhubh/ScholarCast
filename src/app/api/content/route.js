import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get('teacherId');
    const status = searchParams.get('status');

    let query = {};
    if (teacherId) query.teacherId = teacherId;
    if (status) query.status = status;

    const content = await Content.find(query).sort({ createdAt: -1 });
    const normalizedContent = content.map(item => ({
      ...item._doc,
      id: item._id
    }));
    return NextResponse.json(normalizedContent);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const content = await Content.create(body);
    return NextResponse.json({ ...content._doc, id: content._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
