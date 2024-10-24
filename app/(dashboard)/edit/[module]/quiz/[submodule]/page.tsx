"use client";

import NewQuestion from "@/components/NewQuestion";
import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { QuestionForm, QuizForm, ModuleForm, ClassForm } from "@/interfaces";
import { updateDocument, getDocumentById, fetchCollectionData } from "@/lib/firestoreHelpers"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const NewQuiz = ({ params }: { params: { module: string, submodule: number } }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionForm[]>([]);

  const router = useRouter();


  const [modules, setModules] = useState<ModuleForm>();
  const [classId, setClassId] = useState("");
  useEffect(() => {
    const getModules = async () => {
      try {
        const moduleData = await getDocumentById('modules', params.module); 
        console.log('Module Data:', moduleData); 
        if (!moduleData) return;
        setModules(moduleData as ModuleForm);
        console.log('Modules:', modules);

        if (moduleData?.flashcards) {
          setQuestions(moduleData.quizzes[params.submodule]["questions"]);
          setTitle(moduleData.quizzes[params.submodule]["title"]);
        }

        const classData = await fetchCollectionData('classes');
        const class1 = classData.find((class1) => class1.modules.includes(params.module)) as ClassForm;
        setClassId(class1.id);

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getModules();
  }, []);

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answers: [""], correct: 0 }]);
  };

  const createQuiz = () => {
    const modules = getDocumentById('modules', params.module);

    modules.then((data) => {
      const updatedQuiz: QuizForm = {
        ...data?.quizzes[params.submodule],
        title: title,
        questions: questions
      };
      let currentQuizzes = data?.quizzes;
      currentQuizzes[params.submodule || 0] = updatedQuiz;

      updateDocument('modules', params.module, {quizzes: currentQuizzes});
    });



    setTitle("");
    setQuestions([]);
    router.push(`/dashboard/${classId}`);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">Edit Quiz</h1>
        <Button className="bg-[#0E793C] text-white" onPress={createQuiz}>
          Save Quiz
        </Button>
      </div>
      <div className="mt-12">
        <TextField label="Title" value={title} setValue={setTitle} />
      </div>
      <div className="mt-12 flex flex-col justify-between space-y-4">
        {questions.map((question, index) => (
          <NewQuestion
            key={index}
            number={index + 1}
            question={question.question}
            setQuestion={(newQuestion: string) => {
              const newQuestions = [...questions];
              newQuestions[index].question = newQuestion;
              setQuestions(newQuestions);
            }}
            answers={question.answers}
            setAnswers={(newAnswers) => {
              const newQuestions = [...questions];
              newQuestions[index].answers = newAnswers;
              setQuestions(newQuestions);
            }}
            correct={question.correct}
            setCorrect={(newCorrect) => {
              const newQuestions = [...questions];
              newQuestions[index].correct = newCorrect;
              setQuestions(newQuestions);
            }}
            removeQuestion={() => {
              const newQuestions = [...questions];
              newQuestions.splice(index, 1);
              setQuestions(newQuestions);
            }}
          />
        ))}
      </div>
      <div className="mt-6">
        <Button className="bg-[#0E793C] text-white" onPress={addQuestion}>
          Add Question
        </Button>
      </div>
    </div>
  );
};

export default NewQuiz;
