'use client';

import CustomNextButton from '@/components/slider/CustomNextButton';
import CustomPrevButton from '@/components/slider/CustomPrevButton';
import { SupabaseProject } from '@/types/project.types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProjectSliderProps {
  projects: SupabaseProject[];
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,
    fade: true, // 부드러운 전환을 위해 fade 효과 추가
    cssEase: 'linear'
  };

  if (projects.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">등록된 프로젝트가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {projects.map((project, index) => (
          <div key={project.id} className="relative h-screen w-screen outline-none">
            <div className="absolute inset-0">
               <Image
                src={project.main_image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
                priority={index === 0}
                className="transform scale-105 transition-transform duration-[10000ms] ease-linear hover:scale-100" // 미세한 줌 아웃 효과
              />
            </div>
            
            {/* 그라데이션 오버레이 개선 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="text-lg md:text-xl text-gray-100 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
                    {project.subtitle}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>

      {/* 커스텀 네비게이션 버튼 */}
      <div className="absolute inset-y-0 left-0 flex items-center z-20 pl-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <CustomPrevButton sliderRef={sliderRef} />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-20 pr-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <CustomNextButton sliderRef={sliderRef} />
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-[30px] h-[50px] border-2 border-white/50 rounded-full flex justify-center p-2 box-border">
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ 
              y: [0, 24, 0],
              opacity: [1, 0, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <span className="text-white/70 text-xs tracking-widest uppercase font-light">스크롤</span>
      </motion.div>
    </div>
  );
}
