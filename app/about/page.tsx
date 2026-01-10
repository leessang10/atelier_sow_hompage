'use client';

import PageHeader from "../../components/PageHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import ArchitectProfile from "./ArchitectProfile";

export default function About() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors pb-20">
      <PageHeader
        title="About Us"
        description="창의적인 공간 설계로 새로운 가치를 만들어갑니다"
      />

      {/* Meaning of SOW Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-gray-50 dark:text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0">
          SOUND OF WISE
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">Our Identity</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
                  심다, <br />
                  <span className="text-gray-400 font-light italic">그리고</span> <br />
                  지혜의 소리
                </h2>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    아틀리에 소우(Atelier SOW)는 &apos;심다&apos;라는 본연의 뜻과 
                    &apos;Sound Of Wise&apos;를 결합한 의미를 담고 있습니다. 
                  </p>
                  <p>
                    우리는 건축이 단순한 구조물이 아닌, 삶의 지혜를 심고 가꾸는 
                    그릇이 되어야 한다고 믿습니다.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="md:col-span-6 lg:col-span-7 relative">
               <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/누나매형.jpeg"
                  alt="아틀리에 소우"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 38%' }}
                />
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500" />
              </motion.div>
              {/* Floating Decorative Element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-900 dark:bg-white/10 -z-10 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Details - Asymmetrical Grid */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-7">
               <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">본질에 접근하는 건축</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  국민대학교 테크노디자인 건축대학원을 졸업한 김정민, 이혜은 부부는 
                  내·외부의 경계가 모호한 건축의 본질에 접근하며, 단순한 외관 디자인을 넘어 
                  공간과 관련된 모든 디자인 요소를 중요하게 다룹니다.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  우리는 정성이 가득한 공간을 만들어내고, 
                  본질적 의미의 &apos;Architecture&apos;에 한걸음 더 다가가고자 합니다.
                </p>
              </motion.div>
            </div>
            <div className="md:col-span-5 flex items-center justify-center">
               <div className="w-full h-px bg-gray-200 dark:bg-gray-800 hidden md:block" />
               <div className="text-gray-200 dark:text-gray-800 font-serif italic text-6xl md:text-8xl px-8 select-none">
                 SOW
               </div>
               <div className="w-full h-px bg-gray-200 dark:bg-gray-800 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Architects Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Architects</h2>
            <div className="w-12 h-1 bg-gray-900 dark:bg-white mx-auto" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-24 lg:gap-32">
            <ArchitectProfile 
                name="김정민"
                image="/images/매형.jpeg"
                role="공동 대표 / 건축가"
            />
            <ArchitectProfile 
                name="이혜은"
                image="/images/누나.jpeg"
                role="공동 대표 / 건축가"
            />
          </div>
        </div>
      </section>
    </main>
  );
} 