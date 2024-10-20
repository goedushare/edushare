'use client';

import React from "react";
import video from "../assets/video.svg";
import article from "../assets/article.svg";
import quiz from "../assets/quiz.svg";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Accordion, AccordionItem } from "@nextui-org/react";
import modules from "../assets/modules.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModuleForm } from "../interfaces";
import { useEffect, useState } from "react";
import { fetchCollectionData } from "../lib/firestoreHelpers";


export default function Sidebar() {
  const path = usePathname();

  const [modules, setModules] = useState<ModuleForm[]>([]);
  useEffect(() => {
    const getModules = async () => {
      try {
        const moduleData = await fetchCollectionData('modules'); 
        console.log('Module Data:', moduleData); 
        setModules(moduleData);
        console.log('Modules:', modules);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getModules();
  }, []);

  return (
    <div className="w-1/4 pt-4 flex flex-col sticky top-[10vh] h-[calc(100vh-64px)] border-r-1 border-gray-100">
      <h1 className="font-bold text-center mb-4">
        AP®︎/College US Government and Politics
      </h1>

      <ScrollShadow className="p-0">
        <Accordion
          selectionMode="multiple"
          className="p-0 flex flex-col w-full"
          defaultExpandedKeys={path?.split("/").slice(1) || []}
        >
          {modules.map((module) => {
            return (
              <AccordionItem
                key={module["id"]}
                aria-label={module["title"]}
                title={module["title"]}
                className="px-6 py-2"
              >
                <div className="flex flex-col">
                  {module["videos"].map((video1, index) => (
                  <Link key={index} href={`/learn/${module["id"]}/video/${video1.id}`}>
                    <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                      <img src={video.src} className="w-10 h-10" />
                      <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                        {video1.title}
                      </p>
                    </div>
                  </Link>
                  ))}
                  {module["articles"].map((article1, index) => (
                  <Link key={index} href={`/learn/${module["id"]}/article/${article1.id}`}>
                    <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                      <img src={article.src} className="w-10 h-10" />
                      <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                        {article1.title}
                      </p>
                    </div>
                  </Link>
                  ))}
                  {module["quizzes"].map((quiz1, index) => (
                  <Link key={index} href={`/learn/${module["id"]}/quiz/${quiz1.id}`}>
                    <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                      <img src={quiz.src} className="w-10 h-10" />
                      <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                        {quiz1.title}
                      </p>
                    </div>
                  </Link>
                  ))}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollShadow>
    </div>
  );
}
