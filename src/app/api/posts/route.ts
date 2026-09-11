import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get posts endpoint placeholder
  return NextResponse.json({ message: 'Posts API endpoint' });
}

export async function POST(request: Request) {
  // Create post endpoint placeholder
  return NextResponse.json({ message: 'Create post endpoint' });
}
