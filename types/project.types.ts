export interface Project {
    id: number;
    title: string;
    subtitle?: string;
    main_image: string;
    created_at?: string;
    is_published?: boolean;
}

export interface ProjectDetail extends Project {
    content: {
        type: string;
        text: string;
    }[];
}