'use client';

import React from "react";
import video from "../assets/video.svg";
import article from "../assets/article.svg";
import quiz from "../assets/quiz.svg";
import flashcard from "../assets/flashcard.svg";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Accordion, AccordionItem } from "@nextui-org/react";
import modules from "../assets/modules.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModuleForm, ClassForm } from "../interfaces";
import { useEffect, useState } from "react";
import { fetchCollectionData } from "../lib/firestoreHelpers";


export default function Sidebar() {
  const path = usePathname();

  const [modules, setModules] = useState<ModuleForm[]>([]);
  const [classes, setClasses] = useState<ClassForm[]>([]);

  const [classModules , setClassModules] = useState<ModuleForm[]>([]);


  const getClass = () => {
    const pathArray = path?.split("/").slice(1) || [];
    // return classes.find((class1) => class1.id === pathArray[0]);
    return classes.find((class1) => class1.modules.includes(pathArray[1]));
  };

  const getClassFromModule = (moduleId: string) => {
    return classes.find((class1) => class1.modules.includes(moduleId));
  }


  useEffect(() => {
    const getStuff = async () => {
      try {
        const moduleData = await fetchCollectionData('modules');
        const classData = await fetchCollectionData('classes');

        setModules(moduleData);
        setClasses(classData);

        const class1 = classData.find((class1) => class1.modules.includes((path?.split("/").slice(1) || [])[1])) as ClassForm;
        console.log('Class:', class1);
        let classModules: ModuleForm[] = [];
        class1?.modules.map((moduleId) => {
          const module = moduleData.find((module1) => module1.id === moduleId);
          if (module) {
            classModules.push(module);
          }
        });
        console.log('Class Modules:', classModules);  

        setClassModules(classModules);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getStuff();
  }, []);

  // useEffect(() => {
  //   const getClasses = async () => {
  //     try {
  //       const classData = await fetchCollectionData('classes'); 
  //       console.log('Class Data:', classData); 
  //       setClasses(classData);
  //       console.log('Classes:', classes);


  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };

  //   getClasses();
  // }, []);

  return (
    <div className="w-1/4 pt-4 flex flex-col sticky top-[10vh] h-[calc(100vh-64px)] border-r-1 border-gray-100">
      <h1 className="font-bold text-center mb-4">
        {getClass()?.title}
      </h1>

      <ScrollShadow className="p-0">
        <Accordion
          selectionMode="multiple"
          className="p-0 flex flex-col w-full"
          defaultExpandedKeys={path?.split("/").slice(1) || []}
        >
            {classModules.map((module) => {
              return  (
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
                    {module["flashcards"].map((flashcard1, index) => (
                    <Link key={index} href={`/learn/${module["id"]}/flashcards/${flashcard1.id}`}>
                      <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                        <img src={flashcard.src} className="w-10 h-10" />
                        <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                          {flashcard1.title}
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
