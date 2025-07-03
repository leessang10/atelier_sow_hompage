import { createContact } from '@/lib/supabase';
import { ContactFormData } from '@/types/project.types';
import { redirect } from 'next/navigation';
import PageHeader from '../../components/PageHeader';
import ContactForm from './ContactForm';
import GoogleMap from './GoogleMap';

// Server Action for contact form submission
async function submitContact(formData: FormData) {
  'use server';

  const contactData: ContactFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: (formData.get('phone') as string) || undefined,
    message: formData.get('message') as string,
  };

  // 서버 사이드 유효성 검사
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
    console.error('Contact form submission error:', error);
    throw new Error('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }

  // 성공 후 리다이렉트 (try-catch 밖에서 실행)
  redirect('/contact?success=true');
}

interface ContactPageProps {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}

export default async function Contact({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
      <PageHeader title="문의하기" description="프로젝트에 대해 상담해보세요" />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">문의하기</h2>

            {/* 성공/에러 메시지 표시 */}
            {params.success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md">
                <p className="text-green-700 dark:text-green-300 text-center">문의가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.</p>
              </div>
            )}

            {params.error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md">
                <p className="text-red-700 dark:text-red-300 text-center">{decodeURIComponent(params.error)}</p>
              </div>
            )}

            <ContactForm submitAction={submitContact} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">오시는 길</h2>

            <div className="mb-4">
              <GoogleMap />
            </div>

            <p className="text-gray-600 dark:text-gray-400">서울특별시 서초구 서초대로 78길 44, 서초나산스위트</p>
          </div>
        </div>
      </section>
    </main>
  );
}
