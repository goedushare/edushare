"use client";

import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const NewQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answers: [], correct: 0 }]);
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
      <div className="mt-6">
        <Button className="bg-[#0E793C] text-white" onPress={addQuestion}>
          Add Question
        </Button>
      </div>
    </div>
  );
};

export default NewQuiz;
