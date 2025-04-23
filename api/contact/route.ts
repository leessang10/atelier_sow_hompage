import dayjs from "dayjs";
import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,  // Gmail 이메일 주소
        pass: process.env.SMTP_PASS,  // 앱 비밀번호
    },
});

export async function POST(req: Request) {
    const formData: FormData = await req.json();

    const {name, email, phone, message} = formData;

    // 현재 날짜와 시간을 "YYYY년 MM월 DD일 hh:mm:ss" 형식으로 포맷
    const formattedDate = dayjs().format('YYYY년 MM월 DD일 HH:mm:ss');

    // 이메일 내용 설정
    const mailOptions = {
        from: process.env.SMTP_USER,  // 보내는 이메일 주소
        to: process.env.SMTP_USER,    // 받는 사람 이메일 (본인 이메일로 설정)
        subject: '문의사항',
        text: `이름: ${name}\n이메일: ${email}\n전화번호: ${phone}\n발송 일자: ${formattedDate}\n\n문의내용: ${message}\n`,
    };

    try {
        // 이메일 발송
        await transporter.sendMail(mailOptions);
        return NextResponse.json({message: '이메일이 성공적으로 전송되었습니다.'});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: '이메일 전송에 실패했습니다.'}, {status: 500});
    }
}
