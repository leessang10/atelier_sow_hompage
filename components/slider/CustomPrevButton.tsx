'use client';

import React from "react";
import {FaChevronLeft} from "react-icons/fa";
import Slider from "react-slick";

interface CustomButtonProps {
    sliderRef: React.RefObject<Slider | null>;
}

function CustomPrevButton({sliderRef}: CustomButtonProps) {
    return (
        <button
            className="p-2 bg-gray-100 bg-opacity-20 hover:bg-opacity-70 text-gray-700 dark:text-gray-300 rounded-r-md"
            onClick={() => {
                sliderRef.current?.slickPrev();
            }}
        >
            <FaChevronLeft size={24}/>
        </button>
    );
}

export default CustomPrevButton; 