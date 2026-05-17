import Image from 'next/image';
import ContactForm from './ContactForm';
import GoogleMap from './GoogleMap';
import { submitContact } from './actions';

interface ContactPageProps {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}

const contactRows = [
  ['Email', 'sowarch@naver.com', 'mailto:sowarch@naver.com'],
  ['Phone', '+82 10 5647 4032', 'tel:+821056474032'],
  ['Address', '서울특별시 서초구 서초대로 78길 44', null],
  ['SNS', 'Instagram / Youtube / Blog', null],
];

export default async function Contact({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#e9e5dc] text-neutral-950">
      <section className="grid min-h-screen gap-0 px-6 pb-10 pt-28 md:grid-cols-2 md:px-10 md:pb-10 md:pt-10">
        <div className="relative min-h-[420px] overflow-hidden bg-neutral-200 md:min-h-0">
          <Image src="/images/누나매형.jpeg" alt="Atelier SOW contact" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-[50%_38%]" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="flex min-h-[560px] flex-col justify-between px-0 py-10 md:min-h-0 md:pl-16 md:pr-4 md:py-10">
          <div>
            <p className="sow-kicker mb-8">Contact Us</p>
            <h1 className="max-w-[9ch] text-[clamp(4.3rem,10vw,10.5rem)] font-medium leading-[0.86] tracking-[-0.07em]">
              Start
              <br />
              a Space
            </h1>
            <p className="mt-9 max-w-xl text-lg font-light leading-[1.7] text-neutral-700 md:text-2xl">
              공간에 대한 고민과 가능성을 들려주세요. 아틀리에 소우는 프로젝트의 첫 대화부터 완성까지 함께 설계합니다.
            </p>
          </div>

          <div className="mt-14 grid gap-5">
            {contactRows.map(([label, value, href]) => (
              <div key={label} className="grid grid-cols-[0.35fr_1fr] border-t border-neutral-950/20 pt-4 text-sm md:text-base">
                <span className="text-neutral-500">{label}</span>
                {href ? (
                  <a href={href} className="justify-self-start transition-opacity hover:opacity-55">
                    {value}
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 py-24 md:grid-cols-[0.75fr_1.25fr] md:px-10 md:py-32">
        <div className="sow-kicker">Inquiry</div>
        <div>
          <h2 className="max-w-4xl text-[clamp(2.4rem,5.5vw,6rem)] font-light leading-[0.98] tracking-[-0.06em]">Tell us about your next project.</h2>

          {params.success ? (
            <div className="mt-10 border-t border-green-700/40 pt-5 text-sm text-green-800">문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.</div>
          ) : null}

          {params.error ? <div className="mt-10 border-t border-red-700/40 pt-5 text-sm text-red-700">{decodeURIComponent(params.error)}</div> : null}

          <div className="mt-14">
            <ContactForm submitAction={submitContact} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 pb-28 md:grid-cols-[0.75fr_1.25fr] md:px-10">
        <div className="sow-kicker">Visit</div>
        <div>
          <div className="h-[460px] overflow-hidden bg-neutral-200 md:h-[620px]">
            <GoogleMap />
          </div>
          <div className="mt-6 grid gap-5 border-t border-neutral-950/20 pt-5 md:grid-cols-2">
            <p className="text-sm text-neutral-500">Atelier SOW</p>
            <p className="text-lg font-light leading-relaxed text-neutral-700">서울특별시 서초구 서초대로 78길 44, 서초나산스위트</p>
          </div>
        </div>
      </section>
    </main>
  );
}
