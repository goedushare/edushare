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
}: {
  number: number;
  question: string;
  setQuestion: (question: string) => void;
  answers: string[];
  setAnswers: (answers: string[]) => void;
  correct: number;
  setCorrect: (correct: number) => void;
}) => {
  return (
    <div className="p-4 bg-slate-50 border-1 rounded-2xl">
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
            <div key={index} className="flex flex-row justify-between mt-4">
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
      <div>
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
