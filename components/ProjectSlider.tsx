'use client';

import CustomNextButton from '@/components/slider/CustomNextButton';
import CustomPrevButton from '@/components/slider/CustomPrevButton';
import { SupabaseProject } from '@/types/project.types';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProjectSliderProps {
  projects: SupabaseProject[];
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500, // 약간 더 느리고 부드러운 전환
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    pauseOnHover: false,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
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
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <Slider ref={sliderRef} {...settings}>
        {projects.map((project, index) => (
          <div key={project.id} className="relative h-screen w-screen outline-none">
            {/* Ken Burns Effect Image */}
            <div className="absolute inset-0 overflow-hidden">
               <motion.div 
                className="relative w-full h-full"
                initial={{ scale: 1 }}
                animate={currentSlide === index ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
               >
                  <Image
                    src={project.main_image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="100vw"
                    priority={index === 0}
                  />
               </motion.div>
            </div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.div
                    key={`text-${project.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                    >
                      <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-2xl mb-2">
                        {project.title}
                      </h2>
                      <div className="w-12 h-1 bg-white mx-auto mb-6 opacity-50" />
                    </motion.div>
                    
                    {project.subtitle && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-lg md:text-2xl text-gray-200 font-light tracking-widest max-w-3xl mx-auto drop-shadow-lg"
                      >
                        {project.subtitle}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </Slider>

      {/* Slide Counter */}
      <div className="absolute bottom-12 right-12 z-20 flex items-end gap-3 text-white">
        <span className="text-4xl font-bold leading-none">
          {(currentSlide + 1).toString().padStart(2, '0')}
        </span>
        <div className="w-12 h-px bg-white/30 mb-2" />
        <span className="text-xl text-white/50 leading-none mb-1">
          {projects.length.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <motion.div 
          key={currentSlide}
          className="h-full bg-white origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-8 flex items-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <CustomPrevButton sliderRef={sliderRef} />
      </div>
      <div className="absolute inset-y-0 right-8 flex items-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <CustomNextButton sliderRef={sliderRef} />
      </div>
    </div>
  );
}
