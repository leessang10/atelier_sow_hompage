'use server';

import { createContact } from '@/lib/supabase';
import { ContactFormData } from '@/types/project.types';
import { redirect } from 'next/navigation';

export async function submitContact(formData: FormData) {
  const contactData: ContactFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: (formData.get('phone') as string) || undefined,
    message: formData.get('message') as string,
  };

  if (!contactData.name || !contactData.email || !contactData.message) {
    throw new Error('이름, 이메일, 문의내용은 필수 항목입니다.');
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(contactData.email)) {
    throw new Error('유효한 이메일 주소를 입력해주세요.');
  }

  try {
    await createContact({
      name: contactData.name.trim(),
      email: contactData.email.trim().toLowerCase(),
      phone: contactData.phone?.trim() || undefined,
      message: contactData.message.trim(),
    });
  } catch (error) {
    const errorInfo =
      typeof error === 'object' && error !== null
        ? {
            message: (error as { message?: string }).message,
            details: (error as { details?: string }).details,
            hint: (error as { hint?: string }).hint,
            code: (error as { code?: string }).code,
          }
        : { message: String(error) };

    console.error('Contact form submission error:', errorInfo);

    const fallbackMessage = '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    const userMessage =
      process.env.NODE_ENV === 'production'
        ? fallbackMessage
        : errorInfo.message || fallbackMessage;

    redirect(`/contact?error=${encodeURIComponent(userMessage)}`);
  }

  redirect('/contact?success=true');
}
