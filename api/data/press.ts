import {PressItem} from "@/app/press/types";

export const pressItems: PressItem[] = [
  {
    id: '1',
    title: '샘플 보도자료',
    date: new Date().toISOString(),
    content: [{type: '', text: ''}],
    source: '샘플 출처',
    category: 'news',
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
