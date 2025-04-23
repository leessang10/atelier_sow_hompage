'use client';

import PageHeader from "../../components/PageHeader";
import {motion} from "framer-motion";
import {steps} from "@/app/process/steps";
import ProcessStep from "./ProcessStep";

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function Process() {
    return (
        <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
            <PageHeader
                title="진행 과정"
                description="프로젝트의 시작부터 완성까지"
            />

            <section className="py-20 px-4">
                <motion.div
                    className="max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <ProcessStep 
                                key={step.number}
                                step={step}
                                index={index}
                            />
                        ))}
                    </div>
                </motion.div>
            </section>
        </main>
    );
} 