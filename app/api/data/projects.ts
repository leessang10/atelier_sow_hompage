export const projects = [
  {
    id: '1',
    title: '샘플 프로젝트',
    description: '임시 프로젝트 설명',
    images: [],
    published: true,
  },
];

export async function getProjects() {
  return projects;
}

export async function getProject(id: string) {
  return projects.find((p) => p.id === id);
}
