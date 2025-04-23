import { createContact } from '@/lib/notion/notion';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 필수 필드 검증
    if (!name || !email || !message) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    // 이메일 형식 검증
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: '유효하지 않은 이메일 형식입니다.' }, { status: 400 });
    }

    // 노션 데이터베이스에 문의 데이터 추가
    await createContact({
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json({ message: '문의가 성공적으로 전송되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json({ error: '문의 전송 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
