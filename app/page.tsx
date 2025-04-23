'use client';

import CustomNextButton from '@/components/slider/CustomNextButton';
import CustomPrevButton from '@/components/slider/CustomPrevButton';
import Image from 'next/image';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { projects } from './projectsv2/projects';

export default function Home() {
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

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors relative overflow-hidden">
      <div className="relative h-screen w-screen">
        <Slider ref={sliderRef} {...settings}>
          {projects.map((project, index) => (
            <div key={index} className="relative h-screen w-screen">
              <Image src={project.mainImage} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="100vw" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40">
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-lg text-gray-200">{project.description}</p>
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

      <section className="py-20 px-4 bg-white dark:bg-dark-bg relative z-0">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">본질에 다가가는 건축을 만듭니다</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">공간의 본질을 담다</h3>
              <p className="text-gray-600 dark:text-gray-400">내·외부의 경계를 넘어서는 공간을 만듭니다. 건축과 공간을 기반으로 모든 디자인 요소를 섬세하게 다루어 새로운 가치를 창조합니다.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">정성을 심다</h3>
              <p className="text-gray-600 dark:text-gray-400">각 프로젝트에 정성과 혼을 담아 삶에 영감을 주는 공간을 만들어갑니다. 이것이 우리가 추구하는 건축입니다.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
