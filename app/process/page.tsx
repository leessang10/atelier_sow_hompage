'use client';

import PageHeader from "../../components/PageHeader";
import { motion, useScroll, useSpring } from "framer-motion";
import { steps } from "@/app/process/steps";
import ProcessStep from "./ProcessStep";
import { useRef } from "react";

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
            <PageHeader
                title="Process"
                description="아틀리에 소우의 프로젝트 진행 과정입니다"
            />

            <section className="py-20 px-4 overflow-hidden" ref={containerRef}>
                <div className="max-w-5xl mx-auto relative">
                    {/* Central Line (Desktop) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800 transform md:-translate-x-1/2">
                        <motion.div 
                            className="absolute top-0 left-0 w-full bg-gray-900 dark:bg-white origin-top"
                            style={{ height: "100%", scaleY }}
                        />
                    </div>

                    <div className="space-y-12 md:space-y-24 relative">
                        {steps.map((step, index) => (
                            <ProcessStep 
                                key={step.number}
                                step={step}
                                index={index}
                                align={index % 2 === 0 ? 'left' : 'right'}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
} 