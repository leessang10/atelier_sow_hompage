'use client';

import {motion} from "framer-motion";
import {useEffect, useState} from "react";

interface ProjectDetailProps {
    project: {
        title: string;
        description: string;
        detail?: {
            client: string;
            position: string;
            design: string;
            location: string;
            area: {
                site: string;
                building: string;
                total: string;
            };
            scale: string;
            content: string[];
        };
    };
}

export default function ProjectDetails({project}: ProjectDetailProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <motion.div
            className="bg-gray-50 dark:bg-dark-card p-8 my-8"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.4}}
        >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">프로젝트 정보</h3>
            <dl className="grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                <dt className="font-semibold">Client</dt>
                <dd>{project.detail?.client}</dd>
                <dt className="font-semibold">Position</dt>
                <dd>{project.detail?.position}</dd>
                <dt className="font-semibold">Design Period</dt>
                <dd>{project.detail?.design}</dd>
                <dt className="font-semibold">Location</dt>
                <dd>{project.detail?.location}</dd>
                {project.detail?.area && (
                    <>
                        <dt className="font-semibold">Site Area</dt>
                        <dd>{project.detail.area.site}</dd>
                        <dt className="font-semibold">Building Area</dt>
                        <dd>{project.detail.area.building}</dd>
                        <dt className="font-semibold">Total Area</dt>
                        <dd>{project.detail.area.total}</dd>
                    </>
                )}
                <dt className="font-semibold">Scale</dt>
                <dd>{project.detail?.scale}</dd>
            </dl>
            {project.detail?.content && (
                <div className="mt-8 prose dark:prose-invert prose-sm max-w-none">
                    {project.detail.content.map((paragraph, index) => (
                        <div key={index} className="mb-4"
                             dangerouslySetInnerHTML={{__html: paragraph.replace(/<h1>/g, '<h1 class="text-xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">')}}></div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
