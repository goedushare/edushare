'use client';

import Video from "@/components/Video";

import Modules from "@/assets/modules.json";
import path from "path";
import { readFileSync } from "fs";
import { useEffect, useState } from "react";
import { ModuleForm } from "@/interfaces";
import { getDocumentById } from "@/lib/firestoreHelpers";

// export function generateStaticParams() {
//   return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
// }
// export const dynamicParams = false;

// export const dynamic = "force-static";

const VideoPage = ({ params }: { params: { module: string, submodule: number } }) => {

  const [modules, setModules] = useState<ModuleForm>();
  useEffect(() => {
    const getModules = async () => {
      try {
        const moduleData = await getDocumentById('modules', params.module); 
        console.log('Module Data:', moduleData); 
        if (!moduleData) return;
        setModules(moduleData as ModuleForm);
        console.log('Modules:', modules);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getModules();
  }, []);


  if (!modules?.videos[params.submodule]["title"] || !modules?.videos[params.submodule]["videoUrl"] || !modules?.authors) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Video
        title={modules?.videos[params.submodule]["title"]}
        link={modules?.videos[params.submodule]["videoUrl"]}
        authors={modules?.authors}
    />
    </>

  );
};

export default VideoPage;
