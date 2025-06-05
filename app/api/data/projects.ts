import {Project} from "@/app/projects/v1/types";

export const projects: Project[] = [
  {
    id: 1,
    title: '샘플 프로젝트',
    subtitle: '임시 프로젝트 설명',
    mainImage: '',
    published: true,
  },
];

export async function getProjects() {
  return projects;
}

export async function getProject(id: number) {
  return projects.find((p) => p.id === id);
}
