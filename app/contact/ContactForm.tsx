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
    <motion.form onSubmit={handleSubmit} className="space-y-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {error && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-t border-red-700/40 pt-5">
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      <div>
        <label htmlFor="name" className="sow-kicker mb-3 block">
          이름 *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border-0 border-b border-neutral-950/25 bg-transparent px-0 py-4 text-2xl font-light text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 disabled:opacity-50"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="email" className="sow-kicker mb-3 block">
          이메일 *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border-0 border-b border-neutral-950/25 bg-transparent px-0 py-4 text-2xl font-light text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 disabled:opacity-50"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="phone" className="sow-kicker mb-3 block">
          연락처
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) || undefined })}
          className="w-full border-0 border-b border-neutral-950/25 bg-transparent px-0 py-4 text-2xl font-light text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 disabled:opacity-50"
          maxLength={13}
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="message" className="sow-kicker mb-3 block">
          문의내용 *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full resize-none border-0 border-b border-neutral-950/25 bg-transparent px-0 py-4 text-2xl font-light leading-relaxed text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 disabled:opacity-50"
          required
          disabled={isPending}
        />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-14 items-center justify-center rounded-none bg-neutral-950 px-8 text-xs uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? '전송 중...' : '문의하기'}
      </button>
    </motion.form>
  );
}
