"use client";

import NewQuestion from "@/components/NewQuestion";
import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { QuestionForm, QuizForm, ClassForm } from "@/interfaces";
import { updateDocument, getDocumentById, fetchCollectionData } from "@/lib/firestoreHelpers";
import { useRouter } from "next/navigation";

const NewQuiz = ({ params }: { params: { module: string } }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionForm[]>([
    { question: "", answers: [""], correct: 0 },
  ]);
  const router = useRouter();

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answers: [""], correct: 0 }]);
  };

  const [classId, setClassId] = useState("");
  useEffect(() => {
    const getStuff = async () => {
      try {
        const classData = await fetchCollectionData('classes');

        // setClasses(classData);

        const class1 = classData.find((class1) => class1.modules.includes(params.module)) as ClassForm;
        setClassId(class1.id);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getStuff();
  }, []);

  const createQuiz = () => {
    if (
      !title ||
      !questions ||
      questions.length == 0 ||
      questions.some((question) => !question.question) ||
      questions.some((question) => !question.answers)
    )
      return;
    const defaultQuizForm: QuizForm = {
      id: 0,
      title: "",
      questions: [],
    };

    const modules = getDocumentById("modules", params.module);

    modules.then((data) => {
      console.log(data?.quizzes);
      const newQuiz: QuizForm = {
        ...defaultQuizForm,
        id: data?.quizzes.length,
        title: title,
        questions: questions,
      };
      updateDocument("modules", params.module, {
        quizzes: [...data?.quizzes, newQuiz],
      });
    });

    setTitle("");
    setQuestions([]);
    router.push(`/dashboard/${classId}`);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">New Quiz</h1>
        <Button className="bg-[#0E793C] text-white" onPress={createQuiz}>
          Create Quiz
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
