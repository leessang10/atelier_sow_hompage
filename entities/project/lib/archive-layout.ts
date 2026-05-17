import { SupabaseProject } from '@/types/project.types';

export interface CanvasProjectPosition {
  height: number;
  width: number;
  x: number;
  y: number;
  z: number;
}

const CANVAS_POSITIONS: CanvasProjectPosition[] = [
  { x: 1020, y: 620, width: 470, height: 310, z: 4 },
  { x: 1740, y: 520, width: 320, height: 480, z: 2 },
  { x: 2380, y: 720, width: 560, height: 370, z: 5 },
  { x: 1420, y: 1250, width: 360, height: 520, z: 3 },
  { x: 2500, y: 1460, width: 370, height: 250, z: 1 },
  { x: 620, y: 1430, width: 360, height: 540, z: 2 },
  { x: 3260, y: 620, width: 430, height: 290, z: 3 },
  { x: 2920, y: 1840, width: 520, height: 350, z: 4 },
  { x: 980, y: 2220, width: 520, height: 350, z: 1 },
  { x: 300, y: 620, width: 390, height: 520, z: 2 },
  { x: 460, y: 2280, width: 440, height: 300, z: 3 },
  { x: 1940, y: 1780, width: 330, height: 510, z: 2 },
  { x: 3540, y: 1280, width: 430, height: 610, z: 5 },
  { x: 3140, y: 180, width: 500, height: 330, z: 2 },
  { x: 160, y: 1320, width: 300, height: 430, z: 4 },
  { x: 1380, y: 140, width: 460, height: 300, z: 1 },
  { x: 2380, y: 2360, width: 390, height: 540, z: 3 },
  { x: 3500, y: 2360, width: 540, height: 350, z: 2 },
  { x: 720, y: 120, width: 360, height: 260, z: 4 },
  { x: 1980, y: 1180, width: 360, height: 250, z: 1 },
  { x: 2480, y: 120, width: 330, height: 470, z: 3 },
  { x: 1780, y: 2400, width: 300, height: 430, z: 2 },
  { x: 3780, y: 820, width: 360, height: 260, z: 4 },
  { x: 0, y: 1880, width: 370, height: 520, z: 1 },
  { x: 2980, y: 1220, width: 300, height: 450, z: 2 },
  { x: 2850, y: 2640, width: 480, height: 220, z: 4 },
];

const RATIOS = ['aspect-[4/5]', 'aspect-[5/4]', 'aspect-[3/4]', 'aspect-[1/1]', 'aspect-[4/3]', 'aspect-[2/3]'];

export function getProjectRatio(index: number) {
  return RATIOS[index % RATIOS.length];
}

export function getProjectColumnOffset(index: number) {
  const offsets = ['md:mt-0', 'md:mt-24', 'md:mt-10', 'md:mt-36'];
  return offsets[index % offsets.length];
}

export function getProjectYear(project: Pick<SupabaseProject, 'created_at'>) {
  if (!project.created_at) {
    return '';
  }

  return new Date(project.created_at).getFullYear().toString();
}

export function getCanvasProjectPosition(index: number): CanvasProjectPosition {
  return CANVAS_POSITIONS[index % CANVAS_POSITIONS.length];
}
