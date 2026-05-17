'use client';

import { isSupabaseStorageUrl } from '@/lib/image';
import { SupabaseProject, TiptapNode } from '@/types/project.types';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProjectDetailExperienceProps {
  project: SupabaseProject;
}

interface IncomingTransition {
  image: string;
  projectId: number;
  timestamp: number;
  title: string;
}

interface BodySection {
  level: number;
  text: string;
  type: 'heading' | 'paragraph';
}

function collectText(node: TiptapNode): string {
  if (node.type === 'text') {
    return node.text || '';
  }

  return node.content?.map(collectText).join('') || '';
}

function collectBody(node: unknown, sections: BodySection[], images: string[]) {
  if (!node || typeof node !== 'object') {
    return;
  }

  const tiptapNode = node as TiptapNode;

  if (tiptapNode.type === 'image' && typeof tiptapNode.attrs?.src === 'string') {
    const src = tiptapNode.attrs.src.trim();
    if (src) {
      images.push(src);
    }
    return;
  }

  if (tiptapNode.type === 'heading' || tiptapNode.type === 'paragraph') {
    const text = collectText(tiptapNode).trim();
    if (text) {
      sections.push({
        level: Number(tiptapNode.attrs?.level || 2),
        text,
        type: tiptapNode.type,
      });
    }
    return;
  }

  tiptapNode.content?.forEach((child) => collectBody(child, sections, images));
}

function getProjectContent(project: SupabaseProject) {
  const sections: BodySection[] = [];
  const images: string[] = [];
  collectBody(project.body, sections, images);

  const uniqueImages = Array.from(new Set([project.main_image, ...images])).filter(Boolean);
  const overviewSection = sections.find((section) => section.type === 'paragraph');
  const bodySections = overviewSection ? sections.filter((section) => section !== overviewSection) : sections;

  return {
    bodySections,
    galleryImages: uniqueImages,
    overview: overviewSection?.text || project.subtitle || project.title,
  };
}

function getProjectYear(createdAt: string) {
  return new Date(createdAt).getFullYear().toString();
}

const DETAIL_TRANSITION_KEY = 'atelier-sow-project-transition';

export function ProjectDetailExperience({ project }: ProjectDetailExperienceProps) {
  const [incomingTransition, setIncomingTransition] = useState<IncomingTransition | null>(null);
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.38], ['0%', '16%']);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.32], [1.06, 1]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.28], ['0%', '-30%']);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.23], [1, 0]);
  const { bodySections, galleryImages, overview } = getProjectContent(project);
  const leadGallery = galleryImages.slice(1, 7);

  useEffect(() => {
    const rawTransition = window.sessionStorage.getItem(DETAIL_TRANSITION_KEY);

    if (!rawTransition) {
      return;
    }

    try {
      const parsedTransition = JSON.parse(rawTransition) as IncomingTransition;
      const isFresh = Date.now() - parsedTransition.timestamp < 4500;

      if (isFresh && parsedTransition.projectId === project.id) {
        setIncomingTransition(parsedTransition);
      }
    } catch {
      // Ignore stale or malformed transition payloads.
    } finally {
      window.sessionStorage.removeItem(DETAIL_TRANSITION_KEY);
    }
  }, [project.id]);

  return (
    <main className="min-h-screen bg-[#e9e5dc] text-neutral-950">
      <section className="relative h-screen min-h-[680px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY, scale: heroImageScale }}>
          <Image
            src={project.main_image}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
            unoptimized={isSupabaseStorageUrl(project.main_image)}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/38" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.24),transparent_35%,rgba(0,0,0,0.18)_70%,rgba(0,0,0,0.52))]" />

        <div className="absolute left-1/2 top-1/2 w-[min(92vw,1180px)] -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <motion.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="sow-kicker-on-image mb-7">Atelier SOW Project</p>
            <h1 className="mx-auto max-w-[11ch] break-keep text-[clamp(3.6rem,8.8vw,9.8rem)] font-medium leading-[0.9] tracking-[-0.055em] [overflow-wrap:anywhere]">
              {project.title}
            </h1>
            {project.subtitle ? <p className="mx-auto mt-7 max-w-3xl text-lg font-light leading-relaxed text-white/78 md:text-2xl">{project.subtitle}</p> : null}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-6 right-6 grid gap-6 text-white md:grid-cols-4 md:left-10 md:right-10">
          {[
            ['Year', getProjectYear(project.created_at)],
            ['Studio', 'Atelier SOW'],
            ['Project', project.title],
            ['Archive', 'Sound Of Wise'],
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

      {incomingTransition ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] overflow-hidden bg-neutral-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => setIncomingTransition(null)}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.065 }}
            transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src={incomingTransition.image}
              alt={incomingTransition.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
              unoptimized={isSupabaseStorageUrl(incomingTransition.image)}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-black/28"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.38 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      ) : null}

      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 py-24 md:grid-cols-[0.75fr_1.25fr] md:px-10 md:py-32">
        <div className="sow-kicker">Overview</div>
        <motion.p
          className="max-w-5xl text-[clamp(2.1rem,4.8vw,5.4rem)] font-light leading-[0.98] tracking-[-0.055em] text-neutral-950"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {overview}
        </motion.p>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-16 md:px-10">
        <div className="grid gap-y-16 md:grid-cols-12 md:gap-x-8 md:gap-y-28">
          {leadGallery.map((src, index) => {
            const isWide = index % 3 === 0;
            const isRight = index % 3 === 1;
            const className = isWide
              ? 'md:col-span-12 aspect-[16/9]'
              : isRight
                ? 'md:col-span-6 md:col-start-7 aspect-[4/5]'
                : 'md:col-span-6 aspect-[4/5]';

            return (
              <motion.figure
                key={src}
                className={`relative overflow-hidden bg-neutral-200 shadow-[0_28px_90px_rgba(35,30,22,0.14)] ${className}`}
                initial={{ opacity: 0, y: 70, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div className="absolute -inset-[10%]" whileInView={{ y: ['-4%', '4%'] }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
                  <Image
                    src={src}
                    alt={`${project.title} ${index + 1}`}
                    fill
                    sizes={isWide ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                    className="object-cover"
                    unoptimized={isSupabaseStorageUrl(src)}
                  />
                </motion.div>
              </motion.figure>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-10 px-6 py-20 md:grid-cols-[0.75fr_1.25fr] md:px-10 md:py-28">
        <div className="sow-kicker">Project Details</div>
        <div className="max-w-4xl space-y-7">
          {bodySections.length ? (
            bodySections.map((section, index) =>
              section.type === 'heading' ? (
                <h2 key={`${section.text}-${index}`} className="pt-8 text-3xl font-normal tracking-[-0.04em] text-neutral-950 md:text-5xl">
                  {section.text}
                </h2>
              ) : (
                <p key={`${section.text}-${index}`} className="text-lg font-light leading-[1.65] text-neutral-700 md:text-2xl">
                  {section.text}
                </p>
              )
            )
          ) : (
            <p className="text-lg font-light leading-[1.65] text-neutral-700 md:text-2xl">{project.subtitle || project.title}</p>
          )}
        </div>
      </section>

    </main>
  );
}
