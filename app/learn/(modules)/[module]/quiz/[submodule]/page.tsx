'use client';

import Quiz from "@/components/Quiz";
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

const QuizPage = ({ params }: { params: { module: number, submodule: number } }) => {

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

  if (!modules?.quizzes[params.submodule]["title"] || !modules?.quizzes[params.submodule]["questions"] || !modules?.authors) {
    return <div>Loading...</div>;
  }
  return (
    <Quiz
      quizName={modules?.quizzes[params.submodule]["title"]}
      questions={modules?.quizzes[params.submodule]["questions"]}
      authors={modules?.authors}
    />
  );
};

export default QuizPage;
