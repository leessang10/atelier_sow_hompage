import PageHeader from '../../components/PageHeader';
import ContactForm from './ContactForm';
import GoogleMap from './GoogleMap';
import { submitContact } from './actions';

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
      <PageHeader title="Contact" description="새로운 프로젝트를 함께 시작해보세요" />

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Info & Map (Sticky on Desktop) */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-32 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Get in Touch</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p className="leading-relaxed">
                    공간에 대한 고민과 열정을 함께 나눌 준비가 되어 있습니다. <br/>
                    언제든 편하게 문의해주세요.
                  </p>
                  <div className="pt-4 space-y-2">
                    <p className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                      <span className="font-medium text-gray-900 dark:text-white">Email</span>
                      <span>sowarch@naver.com</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                      <span className="font-medium text-gray-900 dark:text-white">Phone</span>
                      <span>+82 10 5647-4032</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                        <span className="font-medium text-gray-900 dark:text-white">SNS</span>
                        <span className="flex gap-2">Instagram / Youtube / Blog</span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">오시는 길</h3>
                <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm mb-4 h-[300px]">
                  <GoogleMap />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  서울특별시 서초구 서초대로 78길 44, 서초나산스위트
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="bg-gray-50 dark:bg-dark-card/50 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-gray-800">
               <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">문의하기</h2>

                {params.success && (
                    <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-center text-sm">
                        문의가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.
                    </div>
                )}

                {params.error && (
                    <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-center text-sm">
                        {decodeURIComponent(params.error)}
                    </div>
                )}

                <ContactForm submitAction={submitContact} />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
