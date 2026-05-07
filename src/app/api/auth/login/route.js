import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    const user = await User.findOne({ username });
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const safeUser = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      schoolName: user.schoolName,
      subject: user.subject
    };
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
