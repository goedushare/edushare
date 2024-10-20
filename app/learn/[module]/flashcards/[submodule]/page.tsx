'use client';

import Flashcards from "@/components/Flashcards";
import { useEffect, useState } from "react";
import { ModuleForm } from "@/interfaces";
import { getDocumentById } from "@/lib/firestoreHelpers";


// export function generateStaticParams() {
//   return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
// }
// export const dynamicParams = false;
//
// export const dynamic = "force-static";

const FlashcardsPage = ({ params }: { params: { module: string, submodule: number } }) => {

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

  if (!modules?.flashcards[params.submodule]["title"] || !modules?.flashcards[params.submodule]["flashcards"] || !modules?.authors) {
    return <div>Loading...</div>;
  }
  return (
    <Flashcards
      authors={modules?.authors}
      flashcards={modules?.flashcards[params.submodule]["flashcards"]}
      flashcardsName={modules?.flashcards[params.submodule]["title"]}
    />
  );
};

export default FlashcardsPage;
