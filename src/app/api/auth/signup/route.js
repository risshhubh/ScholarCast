import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const { name, username, password, role, schoolName, subject } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      role,
      schoolName,
      subject
    });

    const safeUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      schoolName: user.schoolName,
      subject: user.subject
    };

    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
