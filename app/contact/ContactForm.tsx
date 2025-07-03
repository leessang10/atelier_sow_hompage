'use client';

import { motion } from 'framer-motion';
import React, { useState, useTransition } from 'react';
import { ContactFormData } from '@/types/project.types';

interface ContactFormProps {
  submitAction: (formData: FormData) => Promise<void>;
}

export default function ContactForm({ submitAction }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (phone: string) => {
    // 숫자만 남기기
    const cleaned = phone.replace(/\D/g, '');

    // 11자리 전화번호인지 확인
    if (cleaned.length === 11) {
      // 예: 010 1234 1234 형식으로
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7, 11)}`;
    }
    // 10자리 전화번호인지 확인
    else if (cleaned.length === 10) {
      // 예: 010 123 1234 형식으로
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
    }

    // 다른 길이의 전화번호는 그대로 반환
    return phone;
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // 클라이언트 사이드 유효성 검사
    if (!validateEmail(formData.email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    const form = e.currentTarget;
    const formDataObj = new FormData(form);

    startTransition(async () => {
      try {
        await submitAction(formDataObj);
        // 성공 시 폼 초기화는 페이지 리다이렉트로 인해 자동으로 됨
      } catch (error) {
        // NEXT_REDIRECT는 정상적인 리다이렉트 동작이므로 에러로 처리하지 않음
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
          return; // 리다이렉트는 성공으로 간주하고 에러 표시하지 않음
        }

        console.error('Form submission error:', error);
        setError(error instanceof Error ? error.message : '문의 접수 중 오류가 발생했습니다.');
      }
    });
  };

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {error && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md">
          <p className="text-red-700 dark:text-red-300 text-center">{error}</p>
        </motion.div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          이름 *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-card dark:text-white"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          이메일 *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-card dark:text-white"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          연락처
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) || undefined })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-card dark:text-white"
          maxLength={13}
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          문의내용 *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-card dark:text-white"
          required
          disabled={isPending}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? '전송 중...' : '문의하기'}
      </button>
    </motion.form>
  );
}
