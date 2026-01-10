import { SupabasePressItem } from '@/app/press/types';
import { getPublishedPressItems, getPublishedProjects } from '@/lib/supabase';
import { SupabaseProject } from '@/types/project.types';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.ateliersow.com';

  // 1. Static Routes
  const routes = [
    '',
    '/about',
    '/projects/v3',
    '/press',
    '/process',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Projects
  let projects: SupabaseProject[] = [];
  try {
    projects = await getPublishedProjects();
  } catch (e) {
    console.error('Sitemap: Failed to fetch projects', e);
  }

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/v3/${project.id}`,
    lastModified: project.created_at, // or updated_at if available
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Dynamic Press Items
  let pressItems: SupabasePressItem[] = [];
  try {
    pressItems = await getPublishedPressItems();
  } catch (e) {
    console.error('Sitemap: Failed to fetch press items', e);
  }

  const pressRoutes = pressItems.map((item) => ({
    url: `${baseUrl}/press/${item.id}`,
    lastModified: item.published_date, // using published_date as a proxy for modification
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes, ...pressRoutes];
}
