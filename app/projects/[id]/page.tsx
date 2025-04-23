import { getProject } from "@/lib/notion/notion";
import PageHeader from "@/components/PageHeader";
import ProjectContent from "./ProjectContent";
import Image from "next/image";
import {notFound} from "next/navigation";
import { BlockContent } from "./ProjectContent";

interface ProjectDetailProps {
    params: Promise<{ id: string }>;
}
export default async function ProjectDetail({ params }: ProjectDetailProps) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }
    
    return (
        <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors">
            <PageHeader
                title={project.title}
                description={project.subtitle || ""}
            />
            <div className="relative aspect-video w-full mb-16 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
            </div>
            <div className="max-w-none mx-auto bg-gray-50 dark:bg-dark-card p-2 m-8 rounded-lg">
                <ProjectContent content={project.content as BlockContent[]} />
            </div>

        </main>
    );
} 