"use client";
import React from 'react';
import {motion, useScroll} from "framer-motion";

const ProgressBar = () => {
    const {scrollYProgress} = useScroll();
    return <motion.div className="fixed bottom-0 left-[25vw] bg-gradient-to-r from-cyan-500 to-blue-500 origin-[0%] h-1 w-3/4 z-50" style={{scaleX: scrollYProgress}}></motion.div>;
}

export default ProgressBar;