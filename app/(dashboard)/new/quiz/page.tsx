"use client";

import NewQuestion from "@/components/NewQuestion";
import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const NewQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answers: [""], correct: 0 }]);
  };

  const createQuiz = () => {};

  return (
    <div>
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
