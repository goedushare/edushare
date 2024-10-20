"use client";

import { Button, Radio, RadioGroup } from "@nextui-org/react";
import TextField from "./TextField";

const NewQuestion = ({
  number,
  question,
  setQuestion,
  answers,
  setAnswers,
  correct,
  setCorrect,
  removeQuestion,
}: {
  number: number;
  question: string;
  setQuestion: (question: string) => void;
  answers: string[];
  setAnswers: (answers: string[]) => void;
  correct: number;
  setCorrect: (correct: number) => void;
  removeQuestion: () => void;
}) => {
  return (
    <div className="relative p-4 bg-slate-50 border-1 rounded-2xl">
      <button
          className="absolute bottom-4 right-4 text-gray-500 hover:text-red-500 transition-all duration-200"
          onClick={removeQuestion}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      <div className="flex flex-row justify-between space-x-6">
        <h2 className="text-2xl font-semibold content-end">{String(number)}</h2>
        <TextField
          placeholder="Question"
          value={question}
          setValue={setQuestion}
        />
      </div>
      <div>
        <RadioGroup value={String(correct)}>
          {answers.map((answer, index) => (
            <div
              key={index}
              className="flex flex-row justify-between space-x-2 mt-4"
            >
              <Radio
                value={String(index)}
                key={index}
                onChange={() => {
                  setCorrect(index);
                }}
              ></Radio>
              <TextField
                placeholder="Answer"
                value={answer}
                setValue={(newAnswer: string) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = newAnswer;
                  setAnswers(newAnswers);
                }}
              />
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="mt-4">
        <p
          onClick={() => {
            setAnswers([...answers, ""]);
          }}
          className="text-[#0E793C] hover:underline cursor-pointer"
        >
          Add Answer
        </p>
      </div>
    </div>
  );
};

export default NewQuestion;
