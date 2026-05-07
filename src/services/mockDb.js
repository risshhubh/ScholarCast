export const users = [
  { id: 'teacher1', username: 'teacher', password: 'password', role: 'teacher', name: 'Mr. Teacher' },
  { id: 'principal1', username: 'principal', password: 'password', role: 'principal', name: 'Mrs. Principal' },
];

export let contentDb = [
  {
    id: 'c1',
    teacherId: 'teacher1',
    title: 'Welcome to Class',
    description: 'A brief welcome message.',
    fileUrl: 'https://placehold.co/600x400/png',
    status: 'approved',
    startTime: new Date(Date.now() - 3600000).toISOString(),
    endTime: new Date(Date.now() + 86400000).toISOString(),
  },
  {
    id: 'c2',
    teacherId: 'teacher1',
    title: 'Math Notes Chapter 1',
    description: 'Algebra basics.',
    fileUrl: 'https://placehold.co/600x400/png',
    status: 'pending',
    startTime: new Date(Date.now() + 3600000).toISOString(),
    endTime: new Date(Date.now() + 86400000).toISOString(),
  }
];

export const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));
