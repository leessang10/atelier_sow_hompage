'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const heroSlides = [
  {
    body: '정성을 다해 공간의 기준을 세우고, 생활의 장면이 오래 머물 수 있는 구조를 만듭니다.',
    image: '/images/누나매형.jpeg',
    title: '정성의 기준',
  },
  {
    body: '건축, 인테리어, 가구와 빛의 결정을 하나의 목소리로 조율합니다.',
    image: '/images/매형.jpeg',
    title: '지혜의 소리',
  },
  {
    body: '삶의 방식과 장소의 온도를 관찰하고, 필요한 만큼만 선명하게 남깁니다.',
    image: '/images/누나.jpeg',
    title: '차분한 균형',
  },
];

const principles = [
  {
    body: '공간의 표면보다 오래 남는 태도와 감각을 설계합니다. 일상의 장면 안에 차분한 균형과 따뜻한 긴장을 만듭니다.',
    title: 'Sow Meaning',
  },
  {
    body: '건축, 인테리어, 가구, 조명, 재료의 결정을 하나의 흐름으로 다루며 공간의 완성도를 끝까지 밀어 올립니다.',
    title: 'Sound Of Wise',
  },
  {
    body: '사용자의 생활 방식과 장소가 가진 결을 관찰하고, 필요한 만큼만 덜어낸 구조 안에 선명한 인상을 남깁니다.',
    title: 'Atelier Method',
  },
];

const architects = [
  {
    image: '/images/매형.jpeg',
    name: '김정민',
    role: 'Co-Founder / Architect',
  },
  {
    image: '/images/누나.jpeg',
    name: '이혜은',
    role: 'Co-Founder / Architect',
  },
];

export default function About() {
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 0.34], ['0%', '14%']);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1.05, 1]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.24], ['0%', '-34%']);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const galleryX = useTransform(galleryProgress, [0, 1], ['6%', '-34%']);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3600);

    return () => window.clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-[#e9e5dc] text-neutral-950">
      <section className="relative h-screen min-h-[680px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.title}
            className="absolute inset-0"
            style={{ y: heroImageY, scale: heroScale }}
            initial={false}
            animate={{
              clipPath: activeSlide === index ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)',
              opacity: activeSlide === index ? 1 : 0.001,
            }}
            transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image src={slide.image} alt={slide.title} fill priority={index === 0} sizes="100vw" className="object-cover object-[50%_38%]" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/42" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.26),transparent_42%,rgba(0,0,0,0.55))]" />

        <div className="absolute left-1/2 top-1/2 w-[min(92vw,1160px)] -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <motion.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="sow-kicker-on-image mb-7">Profile</p>
            <motion.h1
              key={heroSlides[activeSlide].title}
              className="mx-auto max-w-[10ch] break-keep text-[clamp(4.8rem,12vw,12rem)] font-medium leading-[0.86] tracking-[-0.07em]"
              initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroSlides[activeSlide].title}
            </motion.h1>
            <motion.p
              key={heroSlides[activeSlide].body}
              className="mx-auto mt-8 max-w-3xl text-lg font-light leading-relaxed text-white/78 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroSlides[activeSlide].body}
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-40 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-36">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`${slide.title} 보기`}
              onClick={() => setActiveSlide(index)}
              className="relative h-[2px] w-12 overflow-hidden bg-white/28"
            >
              <motion.span
                className="absolute inset-y-0 left-0 bg-white"
                initial={false}
                animate={{ width: activeSlide === index ? '100%' : '0%' }}
                transition={{ duration: activeSlide === index ? 3.45 : 0.25, ease: 'linear' }}
              />
            </button>
          ))}
        </div>

        <div className="absolute bottom-8 left-6 right-6 grid gap-6 text-white md:left-10 md:right-10 md:grid-cols-4">
          {[
            ['Studio', 'Atelier SOW'],
            ['Meaning', 'Sound Of Wise'],
            ['Field', 'Architecture / Interior'],
            ['Base', 'Seoul, Korea'],
          ].map(([label, value]) => (
            <motion.div
              key={label}
              className="border-t border-white/24 pt-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs text-white/48">{label}</p>
              <p className="mt-2 text-sm md:text-base">{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 py-24 md:grid-cols-[0.75fr_1.25fr] md:px-10 md:py-32">
        <div className="sow-kicker">Overview</div>
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[clamp(2.1rem,4.7vw,5.2rem)] font-light leading-[0.99] tracking-[-0.055em]">
            우리는 건축이 단순한 구조물이 아니라 삶의 지혜를 심고 가꾸는 그릇이라고 믿습니다.
          </p>
          <p className="mt-9 max-w-3xl text-lg font-light leading-[1.7] text-neutral-650 md:text-2xl">
            국민대학교 테크노디자인 건축대학원을 졸업한 김정민, 이혜은은 내외부의 경계가 모호한 건축의 본질에 접근하며 공간과 관련된 모든 디자인 요소를 정교하게 다룹니다.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 pb-24 md:grid-cols-[0.75fr_1.25fr] md:px-10 md:pb-32">
        <div className="sow-kicker md:sticky md:top-32 md:h-fit">Services</div>
        <div className="space-y-6">
          {principles.map((item, index) => (
            <motion.article
              key={item.title}
              className="sticky top-28 min-h-[430px] border-t border-neutral-950/20 bg-[#e9e5dc] pt-6 md:min-h-[520px]"
              style={{ top: `${112 + index * 28}px` }}
              initial={{ opacity: 0, y: 70, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-16% 0px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="sow-kicker mb-16">0{index + 1}</p>
              <h2 className="max-w-3xl text-[clamp(3rem,7vw,7.5rem)] font-light leading-[0.9] tracking-[-0.065em]">{item.title}</h2>
              <p className="mt-8 max-w-2xl text-lg font-light leading-[1.65] text-neutral-700 md:text-2xl">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section ref={galleryRef} className="overflow-hidden py-16 md:py-24">
        <motion.div
          className="flex w-max gap-8 px-6 md:px-10"
          style={{ x: galleryX }}
        >
          {['/images/누나매형.jpeg', '/images/매형.jpeg', '/images/누나.jpeg', '/images/누나매형.jpeg'].map((src, index) => (
            <motion.figure
              key={`${src}-${index}`}
              className="relative h-[58vw] max-h-[680px] min-h-[380px] w-[72vw] max-w-[920px] overflow-hidden bg-neutral-200 md:w-[54vw]"
              whileHover={{ scale: 0.985 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div className="absolute -inset-[7%]" whileHover={{ scale: 1.08 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <Image src={src} alt={`Atelier SOW ${index + 1}`} fill sizes="80vw" className="object-cover" />
              </motion.div>
            </motion.figure>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 py-24 md:grid-cols-[0.75fr_1.25fr] md:px-10 md:py-32">
        <div className="sow-kicker">Architects</div>
        <div className="grid gap-10 md:grid-cols-2">
          {architects.map((architect, index) => (
            <motion.article
              key={architect.name}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                <motion.div className="absolute -inset-[5%]" whileHover={{ scale: 1.08 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <Image src={architect.image} alt={architect.name} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover object-[50%_35%]" />
                </motion.div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-6 border-t border-neutral-950/20 pt-5">
                <div>
                  <h2 className="text-3xl font-light tracking-[-0.04em] md:text-5xl">{architect.name}</h2>
                  <p className="mt-3 text-sm uppercase tracking-[0.16em] text-neutral-500">{architect.role}</p>
                </div>
                <span className="text-xs text-neutral-500">0{index + 1}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

    </main>
  );
}
