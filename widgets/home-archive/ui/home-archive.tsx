'use client';

import { getCanvasProjectPosition, getProjectYear } from '@/entities/project/lib/archive-layout';
import { ProjectCanvasItem, buildProjectCanvasItems } from '@/entities/project/lib/project-canvas-items';
import { isSupabaseStorageUrl } from '@/lib/image';
import { SupabaseProject } from '@/types/project.types';
import {
  CANVAS_DRAG_BOUNDS,
  clampCanvasX,
  clampCanvasY,
  getCanvasDragTransition,
  getCanvasInitialPosition,
  getDimmedCanvasItemStyle,
  getWheelPanDelta,
  shouldPreventCanvasContextMenu,
} from '@/widgets/home-archive/lib/canvas-motion';
import { MotionValue, motion, useDragControls, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, PointerEvent, WheelEvent, useEffect, useMemo, useState } from 'react';

interface HomeArchiveProps {
  projects: SupabaseProject[];
}

const CANVAS_WIDTH = 4200;
const CANVAS_HEIGHT = 3000;
const DETAIL_TRANSITION_MS = 980;
const DETAIL_TRANSITION_KEY = 'atelier-sow-project-transition';
const CARD_HOVER_SCALE = 1.035;

interface DetailTransitionState {
  href: string;
  image: string;
  projectId: number;
  rect: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
  title: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getCanvasLayer(index: number) {
  return index % 5 === 0 || index % 5 === 2 ? 'foreground' : 'background';
}

export function HomeArchive({ projects }: HomeArchiveProps) {
  const router = useRouter();
  const initialPosition = getCanvasInitialPosition();
  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);
  const dragControls = useDragControls();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [hoveredItem, setHoveredItem] = useState<ProjectCanvasItem | null>(null);
  const [detailTransition, setDetailTransition] = useState<DetailTransitionState | null>(null);

  const canvasItems = useMemo(() => buildProjectCanvasItems(projects), [projects]);
  const canvasProjects = useMemo(
    () =>
      canvasItems.map((item, index) => ({
        index,
        item,
        layer: getCanvasLayer(index),
        position: getCanvasProjectPosition(index),
      })),
    [canvasItems]
  );
  const backgroundProjects = canvasProjects.filter((project) => project.layer === 'background');
  const foregroundProjects = canvasProjects.filter((project) => project.layer === 'foreground');
  const canvasDragTransition = useMemo(() => getCanvasDragTransition(), []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousHtmlTouchAction = html.style.touchAction;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverscroll = body.style.overscrollBehavior;
    const previousBodyTouchAction = body.style.touchAction;

    const preventPagePull = (event: TouchEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }
    };

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    html.style.touchAction = 'none';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    body.style.touchAction = 'none';
    document.addEventListener('touchmove', preventPagePull, { passive: false });

    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      html.style.touchAction = previousHtmlTouchAction;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscroll;
      body.style.touchAction = previousBodyTouchAction;
      document.removeEventListener('touchmove', preventPagePull);
    };
  }, []);

  if (!canvasItems.length) {
    return (
      <main className="grid h-screen place-items-center overflow-hidden bg-[#e9e5dc] text-neutral-950">
        <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">No published projects</p>
      </main>
    );
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    dragControls.start(event, { snapToCursor: false });
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    cursorX.set(event.clientX + 18);
    cursorY.set(event.clientY + 18);

    const hoveredCard = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('article[data-canvas-item-id]');
    const hoveredId = hoveredCard?.dataset.canvasItemId ?? null;
    const nextHoveredItem = hoveredId ? canvasItems.find((item) => item.id === hoveredId) ?? null : null;
    setHoveredItem(nextHoveredItem);
  };

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    const panDelta = getWheelPanDelta(event);

    x.set(clampCanvasX(x.get() + panDelta.x));
    y.set(clampCanvasY(y.get() + panDelta.y));
  };

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    if (shouldPreventCanvasContextMenu()) {
      event.preventDefault();
    }
  };

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, item: ProjectCanvasItem) => {
    const shouldUseNativeNavigation = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

    if (shouldUseNativeNavigation || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    event.preventDefault();

    if (detailTransition) {
      return;
    }

    const card = event.currentTarget.getBoundingClientRect();
    const href = `/projects/v3/${item.projectId}`;
    const transitionPayload = {
      image: item.image,
      projectId: item.projectId,
      timestamp: Date.now(),
      title: item.title,
    };

    setHoveredItem(null);
    window.sessionStorage.setItem(DETAIL_TRANSITION_KEY, JSON.stringify(transitionPayload));
    setDetailTransition({
      href,
      image: item.image,
      projectId: item.projectId,
      rect: {
        height: card.height,
        left: card.left,
        top: card.top,
        width: card.width,
      },
      title: item.title,
    });

    window.setTimeout(() => {
      router.push(href);
    }, DETAIL_TRANSITION_MS - 210);
  };

  return (
    <main
      className="relative h-screen touch-none overflow-hidden overscroll-none bg-[#e9e5dc] text-neutral-950 cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
      onContextMenu={handleContextMenu}
      onPointerLeave={() => setHoveredItem(null)}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.42)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.42)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(233,229,220,0.12)_45%,rgba(233,229,220,0.72)_100%)]" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 select-none"
        style={{ x, y, width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        drag
        dragControls={dragControls}
        dragConstraints={CANVAS_DRAG_BOUNDS}
        dragListener={false}
        dragTransition={canvasDragTransition}
        dragElastic={0}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 select-none"
        style={{ x, y, width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {backgroundProjects.map(({ index, item, position }) => (
          <CanvasProjectCard
            key={item.id}
            canvasX={x}
            canvasY={y}
            index={index}
            isDimmed={Boolean(hoveredItem && hoveredItem.projectId !== item.projectId)}
            item={item}
            position={position}
            onNavigate={handleNavigate}
            onHoverEnd={() => setHoveredItem(null)}
            onHoverStart={() => setHoveredItem(item)}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none fixed left-1/2 top-1/2 z-20 w-[min(78vw,1040px)] -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[clamp(4.4rem,12vw,12rem)] font-medium leading-[0.86] tracking-[-0.065em] text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.05)]">
            Atelier
            <br />
            SOW
          </h1>
          <p className="mt-8 text-xs uppercase tracking-[0.26em] text-white/80">Sound Of Wise</p>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 select-none"
        style={{ x, y, width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {foregroundProjects.map(({ index, item, position }) => (
          <CanvasProjectCard
            key={item.id}
            canvasX={x}
            canvasY={y}
            index={index}
            isDimmed={Boolean(hoveredItem && hoveredItem.projectId !== item.projectId)}
            item={item}
            position={position}
            onNavigate={handleNavigate}
            onHoverEnd={() => setHoveredItem(null)}
            onHoverStart={() => setHoveredItem(item)}
          />
        ))}
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-[7px] bg-neutral-950 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
        style={{ x: cursorX, y: cursorY }}
        initial={false}
        animate={{ opacity: hoveredItem ? 1 : 0, scale: hoveredItem ? 1 : 0.96 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {hoveredItem?.title}
      </motion.div>

      {detailTransition ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden bg-[#e9e5dc]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.34)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.34)_1px,transparent_1px)] bg-[size:60px_60px]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute overflow-hidden bg-neutral-200 shadow-[0_36px_110px_rgba(25,21,15,0.28)]"
            initial={{
              borderRadius: 0,
              height: detailTransition.rect.height,
              left: detailTransition.rect.left,
              top: detailTransition.rect.top,
              width: detailTransition.rect.width,
            }}
            animate={{
              borderRadius: 0,
              height: window.innerHeight + 48,
              left: -24,
              top: -24,
              width: window.innerWidth + 48,
            }}
            transition={{ duration: DETAIL_TRANSITION_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: DETAIL_TRANSITION_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image
                src={detailTransition.image}
                alt={detailTransition.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                unoptimized={isSupabaseStorageUrl(detailTransition.image)}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-black/28"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-white md:inset-x-10"
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.45, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="sow-kicker-on-image mb-5">Opening Project</p>
            <p className="text-[clamp(3.4rem,8vw,8rem)] font-light leading-[0.9] tracking-[-0.06em]">{detailTransition.title}</p>
          </motion.div>
        </motion.div>
      ) : null}

      <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden text-[10px] uppercase tracking-[0.22em] text-neutral-500 md:block">
        Drag to explore
      </div>
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
        {canvasItems.length.toString().padStart(2, '0')} images
      </div>
    </main>
  );
}

interface CanvasProjectCardProps {
  canvasX: MotionValue<number>;
  canvasY: MotionValue<number>;
  index: number;
  isDimmed: boolean;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, item: ProjectCanvasItem) => void;
  onHoverEnd: () => void;
  onHoverStart: () => void;
  position: ReturnType<typeof getCanvasProjectPosition>;
  item: ProjectCanvasItem;
}

function CanvasProjectCard({ canvasX, canvasY, index, isDimmed, onHoverEnd, onHoverStart, onNavigate, position, item }: CanvasProjectCardProps) {
  const imageX = useTransform(canvasX, (value) => {
    const cardCenter = value + position.x + position.width / 2;
    return clamp((cardCenter - 420) * -0.16, -190, 190);
  });
  const imageY = useTransform(canvasY, (value) => {
    const cardCenter = value + position.y + position.height / 2;
    return clamp((cardCenter - 430) * -0.145, -170, 170);
  });

  return (
    <motion.article
      className="pointer-events-auto absolute group"
      style={{
        left: position.x,
        top: position.y,
        width: position.width,
        height: position.height + 58,
        zIndex: position.z,
      }}
      data-canvas-item-id={item.id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={getDimmedCanvasItemStyle(isDimmed)}
      transition={{ duration: 0.32, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ zIndex: 20, scale: CARD_HOVER_SCALE }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onPointerEnter={onHoverStart}
      onPointerLeave={onHoverEnd}
    >
      <Link
        href={`/projects/v3/${item.projectId}`}
        className="relative block h-full w-full cursor-none bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-white"
        onClick={(event) => onNavigate(event, item)}
      >
        <div className="relative overflow-hidden bg-neutral-200 shadow-[0_24px_80px_rgba(31,27,20,0.16)]" style={{ height: position.height }}>
          <motion.div
            className="absolute -inset-[72%]"
            style={{ x: imageX, y: imageY }}
            whileHover={{ scale: 1.13 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 72vw, 560px"
              priority={index < 4}
              className="object-cover"
              unoptimized={isSupabaseStorageUrl(item.image)}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        </div>
        <div className="flex w-full items-start justify-between gap-5 pt-3 text-[11px] uppercase tracking-[0.16em] text-neutral-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="min-w-0">
            <h2 className="truncate text-neutral-950">{item.title}</h2>
            {item.subtitle ? <p className="mt-1 truncate normal-case tracking-normal text-neutral-500">{item.subtitle}</p> : null}
          </div>
          <span>{getProjectYear(item)}</span>
        </div>
      </Link>
    </motion.article>
  );
}
