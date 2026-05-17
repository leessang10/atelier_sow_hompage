import { SupabaseProject, TiptapNode } from '@/types/project.types';

export interface ProjectCanvasItem {
  created_at: string;
  id: string;
  image: string;
  isMainImage: boolean;
  projectId: number;
  subtitle?: string;
  title: string;
}

interface BuildProjectCanvasItemsOptions {
  maxExtraImagesPerProject?: number;
  maxItems?: number;
}

function stableHash(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function byStableRandom(seed: string) {
  return (left: string, right: string) => stableHash(`${seed}:${left}`) - stableHash(`${seed}:${right}`);
}

function collectImageSources(node: unknown, sources: string[]) {
  if (!node || typeof node !== 'object') {
    return;
  }

  const tiptapNode = node as TiptapNode;
  const src = tiptapNode.type === 'image' && typeof tiptapNode.attrs?.src === 'string' ? tiptapNode.attrs.src.trim() : '';

  if (src) {
    sources.push(src);
  }

  if (Array.isArray(tiptapNode.content)) {
    tiptapNode.content.forEach((child) => collectImageSources(child, sources));
  }
}

function getInternalProjectImages(project: SupabaseProject, maxImages: number) {
  const sources: string[] = [];
  collectImageSources(project.body, sources);

  const uniqueSources = Array.from(new Set(sources)).filter((source) => source && source !== project.main_image);

  return uniqueSources.sort(byStableRandom(`project-${project.id}`)).slice(0, maxImages);
}

export function buildProjectCanvasItems(projects: SupabaseProject[], options: BuildProjectCanvasItemsOptions = {}): ProjectCanvasItem[] {
  const maxExtraImagesPerProject = options.maxExtraImagesPerProject ?? 2;
  const maxItems = options.maxItems ?? 26;
  const items = projects.flatMap<ProjectCanvasItem>((project) => {
    const mainItem: ProjectCanvasItem = {
      created_at: project.created_at,
      id: `${project.id}:main`,
      image: project.main_image,
      isMainImage: true,
      projectId: project.id,
      subtitle: project.subtitle,
      title: project.title,
    };

    const internalItems = getInternalProjectImages(project, maxExtraImagesPerProject).map<ProjectCanvasItem>((image, index) => ({
      created_at: project.created_at,
      id: `${project.id}:internal:${index}:${stableHash(image)}`,
      image,
      isMainImage: false,
      projectId: project.id,
      subtitle: project.subtitle,
      title: project.title,
    }));

    return [mainItem, ...internalItems];
  });

  return items.sort((left, right) => stableHash(`canvas:${left.id}`) - stableHash(`canvas:${right.id}`)).slice(0, maxItems);
}
