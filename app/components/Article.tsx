"use client";
import { useRef } from 'react';
import {motion, useScroll} from "framer-motion";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function Article({
  articleName,
  authors,
  body,
}: {
  articleName: string;
  authors: string;
  body: string;
}) {

  const containerRef = useRef(null)
  const {scrollYProgress} = useScroll({
      container: containerRef
  });
  return (
    <div className="w-3/4 pb-16 flex flex-col items-center h-[calc(100vh-64px)] overflow-y-scroll overflow-x-hidden px-8" ref={containerRef}>
      <h1 className="font-semibold text-3xl mt-6">{articleName}</h1>
      <h2 className="font-normal text-xl mt-2 mb-12">By: {authors}</h2>
      <ReactMarkdown>{body}</ReactMarkdown>
      <motion.div className="fixed bottom-0 left-[25vw] bg-gradient-to-r from-cyan-500 to-blue-500 origin-[0%] h-1 w-3/4 z-50" style={{scaleX: scrollYProgress}}></motion.div>
    </div>
  );
}

// <div className="w-[700px] mt-10">
// <h1 className="font-semibold text-3xl w-full text-left">
//   Introduction
// </h1>
// <p className="mt-2 leading-7 text-xl">
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//   eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//   minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//   aliquip ex ea commodo consequat. Duis aute irure dolor in
//   reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//   pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//   culpa qui officia deserunt mollit anim id est laborum
// </p>

// <p className="mt-6 leading-7 text-xl">
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//   eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//   minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//   aliquip ex ea commodo consequat. Duis aute irure dolor in
//   reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//   pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//   culpa qui officia deserunt mollit anim id est laborum
// </p>

// <p className="mt-6 leading-7 text-xl">
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//   eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//   minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//   aliquip ex ea commodo consequat. Duis aute irure dolor in
//   reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//   pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//   culpa qui officia deserunt mollit anim id est laborum
// </p>

// <p className="mt-6 leading-7 text-xl ">
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//   eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//   minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//   aliquip ex ea commodo consequat. Duis aute irure dolor in
//   reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//   pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//   culpa qui officia deserunt mollit anim id est laborum
// </p>
// </div>
