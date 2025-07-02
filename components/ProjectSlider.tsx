'use client';

import CustomNextButton from '@/components/slider/CustomNextButton';
import CustomPrevButton from '@/components/slider/CustomPrevButton';
import { SupabaseProject } from '@/types/project.types';
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
    <div className="relative h-screen w-screen">
      <Slider ref={sliderRef} {...settings}>
        {projects.map((project, index) => (
          <div key={project.id} className="relative h-screen w-screen">
            <Image
              src={project.main_image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority={index === 0} // 첫 번째 이미지만 priority
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40">
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              {project.subtitle && <p className="text-lg text-gray-200">{project.subtitle}</p>}
            </div>
          </div>
        ))}
      </Slider>
      <div className="absolute inset-y-0 left-0 flex items-center z-20">
        <CustomPrevButton sliderRef={sliderRef} />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-20">
        <CustomNextButton sliderRef={sliderRef} />
      </div>
    </div>
  );
}
