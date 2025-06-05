import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  // 임시로 콘솔에 출력
  console.log('Contact form submission:', data);

  return NextResponse.json({ success: true });
}
