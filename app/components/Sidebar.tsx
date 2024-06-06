import React from "react";
import video from "../assets/video.svg";
import article from "../assets/article.svg";
import quiz from "../assets/quiz.svg";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Accordion, AccordionItem } from "@nextui-org/react";
import modules from "../assets/modules.json";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-1/4 pt-4 flex flex-col sticky top-[10vh] h-[calc(100vh-64px)] border-r-1 border-gray-100">
      <h1 className="font-bold text-center mb-4">
        AP®︎/College US Government and Politics
      </h1>

      <ScrollShadow className="p-0">
        <Accordion
          selectionMode="multiple"
          className="p-0 flex flex-col w-full"
        >
          {modules["modules"].map((module) => {
            return (
              <AccordionItem
                key={module["id"]}
                aria-label={module["moduleName"]}
                title={module["moduleName"]}
                className="px-6 py-2 "
              >
                <div className="flex flex-col">
                  <Link href={`/learn/${module["id"]}/video`}>
                    <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200">
                      <img src={video.src} className="w-10 h-10" />
                      <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                        {module["videoName"]}
                      </p>
                    </div>
                  </Link>
                  <Link href={`/learn/${module["id"]}/article`}>
                    <div className="group flex flex-row  items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200">
                      <img src={article.src} className="w-10 h-10" />
                      <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                        {module["articleName"]}
                      </p>
                    </div>
                  </Link>
                  <Link href={`/learn/${module["id"]}/quiz`}>
                    <div className="flex flex-row items-center py-4 pl-8 w-full group hover:bg-primary-green/10 transition-all duration-200">
                      <img src={quiz.src} className="w-10 h-10" />
                      <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                        Quiz
                      </p>
                    </div>
                  </Link>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollShadow>
    </div>
  );
}
