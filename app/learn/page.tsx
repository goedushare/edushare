'use client';

import Module from "@/components/Module";
import modules from "@/assets/modules.json";
import { ModuleForm } from "@/interfaces";
import { useEffect, useState } from "react";
import { fetchCollectionData } from "@/lib/firestoreHelpers";
import withAuth from "@/lib/withAuth";


const Learn = () => {

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
    <div className="h-[calc(100vh-64px)] overflow-y-scroll">
      <div className="mx-16 my-12">
        <h1 className="text-4xl font-montserrat font-bold">Modules</h1>
        <h2 className="">AP®︎/College US Government and Politics</h2>
        <div className="mt-4 mb-8">
          {modules.map((module) => {
            return <Module module={module} key={module.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Learn);
