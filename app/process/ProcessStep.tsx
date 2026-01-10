import { motion } from "framer-motion";
import { 
    BiNotepad, 
    BiPencil, 
    BiLayer, 
    BiBuildingHouse, 
    BiCheckShield, 
    BiHardHat 
} from "react-icons/bi";

interface ProcessStepProps {
    step: {
        number: string;
        title: string;
        description: string[];
    };
    index: number;
    align: 'left' | 'right';
}

const icons = [
    BiNotepad,
    BiPencil,
    BiLayer,
    BiBuildingHouse,
    BiCheckShield,
    BiHardHat
];

export default function ProcessStep({ step, index, align }: ProcessStepProps) {
    const Icon = icons[index % icons.length];
    const isEven = index % 2 === 0;

    return (
        <div className={`flex items-center justify-start md:justify-center w-full relative group`}>
            {/* Desktop: Spacer for alignment */}
            <div className={`hidden md:block w-1/2 ${align === 'left' ? 'pr-12 text-right' : 'pl-12 order-last text-left'}`}>
                <motion.div
                    initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                   <div className={`inline-block`}>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3 justify-end flex-row-reverse md:flex-row">
                             {/* Mobile shows title differently, desktop uses this */}
                             <span className={`${align === 'left' ? 'order-1' : 'order-2'}`}>{step.title}</span>
                             <span className={`text-sm font-normal text-gray-400 ${align === 'left' ? 'order-2' : 'order-1'}`}>STEP {step.number}</span>
                        </h3>
                        <div className={`bg-gray-50 dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow`}>
                            <ul className={`space-y-2 ${align === 'left' ? 'items-end' : 'items-start'} flex flex-col`}>
                                {step.description.map((item, i) => (
                                    <li key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                   </div>
                </motion.div>
            </div>

            {/* Central Node (Circle) */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-12 h-12 rounded-full bg-white dark:bg-dark-bg border-4 border-gray-900 dark:border-white flex items-center justify-center shadow-lg relative group-hover:scale-110 transition-transform duration-300"
                >
                    <Icon className="w-5 h-5 text-gray-900 dark:text-white" />
                </motion.div>
            </div>

            {/* Mobile: Content */}
            <div className="md:hidden pl-16 w-full">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-sm font-bold text-gray-400 block mb-1">STEP {step.number}</span>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                    <div className="bg-gray-50 dark:bg-dark-card p-5 rounded-xl border border-gray-100 dark:border-gray-800">
                        <ul className="space-y-2">
                            {step.description.map((item, i) => (
                                <li key={i} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                                    <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
            
             {/* Desktop: Empty space counterpart */}
             <div className={`hidden md:block w-1/2 ${align === 'left' ? 'pl-12 order-last' : 'pr-12'}`} />

        </div>
    );
} 