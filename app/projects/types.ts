export interface Project {
    id: number;
    title: string;
    subtitle?: string;
    mainImage: string;
    createdDate?: string;
    published?: boolean;
}

export interface ProjectDetail extends Project {
    content: {
        type: string;
        text: string;
    }[];
}