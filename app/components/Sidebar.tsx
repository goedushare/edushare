import React from "react";
import video from "../assets/video.svg";
import article from "../assets/article.svg";
import quiz from "../assets/quiz.svg";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function Sidebar() {
    return (
        <div className="w-1/4 h-fit pt-4 flex flex-col sticky top-[10vh]">
        <h1 className="font-bold text-center mb-4">AP®︎/College US Government and Politics</h1>

        <ScrollShadow className="p-0">
        <Accordion selectionMode="multiple" className="p-0 flex flex-col w-full">
            <AccordionItem key="1" aria-label="Module 1: How a Bill Becomes a Law" title="Module 1: How a Bill Becomes a Law" className="px-6 py-2 bg-[#f0fce9]">
                <div className="flex flex-col">
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full border-b-1">
                    <img src={video.src} className="w-10 h-10"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">How a Bill Becomes a Law</p>
                    </div>
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full border-b-1">
                    <img src={article.src} className="w-10 h-10"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">How a Bill Becomes a Law</p>
                    </div>
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full">
                    <img src={quiz.src} className="w-10 h-10"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">Quiz</p>
                    </div>
                </div>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Module 2: How to get Mr. C on the SCOTUS" title="Module 2: How to get Mr. C on the SCOTUS" className="px-6 py-2 bg-[#f0fce9]">
                <div className="flex flex-col">
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full border-b-1">
                    <img src={video.src} className="w-6 h-6"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">How a Bill Becomes a Law</p>
                    </div>
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full border-b-1">
                    <img src={video.src} className="w-6 h-6"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">How a Bill Becomes a Law</p>
                    </div>
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full ">
                    <img src={video.src} className="w-6 h-6"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">Quiz</p>
                    </div>
                </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Module 3: The World of Campaign Finance" title="Module 3: The World of Campaign Finance" className="px-6 py-2 bg-[#f0fce9]">
                <div className="flex flex-col">
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full border-b-1">
                    <img src={video.src} className="w-6 h-6"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">How a Bill Becomes a Law</p>
                    </div>
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full border-b-1">
                    <img src={video.src} className="w-6 h-6"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">How a Bill Becomes a Law</p>
                    </div>
                    <div className="flex flex-row bg-[#f0fce9] items-center py-4 pl-8 w-full">
                    <img src={video.src} className="w-6 h-6"></img>
                    <p className="ml-4 leading-5 text-sm text-[#3E8914]">Quiz</p>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>            
        </ScrollShadow>
    </div>
    );
  }