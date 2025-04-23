export const pressItems = [
  {
    id: '1',
    title: '샘플 보도자료',
    date: new Date().toISOString(),
    source: '샘플 출처',
    link: '#',
    published: true,
  },
];

export async function getPressItems() {
  return pressItems;
}

export async function getPressItem(id: string) {
  return pressItems.find((p) => p.id === id);
}
