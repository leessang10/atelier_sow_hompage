'use client';

import PageHeader from "../../components/PageHeader";
import ContactForm from "./ContactForm";
import GoogleMap from "./GoogleMap";

export default function Contact() {
    return (
        <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
            <PageHeader
                title="문의하기"
                description="프로젝트에 대해 상담해보세요"
            />

            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                            문의하기
                        </h2>
                        <ContactForm />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            오시는 길
                        </h2>

                        <div className="mb-4">
                            <GoogleMap />
                        </div>

                        <p className="text-gray-600 dark:text-gray-400">
                            서울특별시 서초구 서초대로 78길 44, 서초나산스위트
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
} 