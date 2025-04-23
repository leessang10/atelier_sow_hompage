'use client';

import {FaChevronRight} from "react-icons/fa";
import Slider from "react-slick";
import React from "react";

interface CustomButtonProps {
    sliderRef: React.RefObject<Slider | null>;
}

function CustomNextButton({sliderRef}: CustomButtonProps) {
    return (
        <button
            className="p-2 bg-gray-100 bg-opacity-20 hover:bg-opacity-70 text-gray-700 dark:text-gray-300 rounded-l-md"
            onClick={() => {
                sliderRef.current?.slickNext();
            }}
        >
            <FaChevronRight size={24}/>
        </button>
    );
}

export default CustomNextButton; 