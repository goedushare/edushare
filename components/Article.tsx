"use client";
import { useRef } from 'react';
import {motion, useScroll} from "framer-motion";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';


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


  // const numbers = useQuery(api.myFunctions.listNumbers2, { count: 5 })
  // if(!numbers) return <div>Loading...</div>
  // console.log(numbers)

  return (
    <div className="w-3/4 pb-16 flex flex-col items-center h-[calc(100vh-64px)] overflow-y-scroll overflow-x-hidden px-8" ref={containerRef}>
      <h1 className="font-semibold text-3xl mt-6">{articleName}</h1>
      <h2 className="font-normal text-xl mt-2 mb-12">By: {authors}</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">{body}</ReactMarkdown>
      <motion.div className="fixed bottom-0 left-[25vw] bg-gradient-to-r from-cyan-500 to-blue-500 origin-[0%] h-1 w-3/4 z-50" style={{scaleX: scrollYProgress}}></motion.div>
    </div>
  );
}