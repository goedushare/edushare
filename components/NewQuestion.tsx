"use client";

import TextField from "./TextField";

const NewQuestion = ({
  number,
  question,
  setQuestion,
  answers,
  setAnswers,
}: {
  number: number;
  question: string;
  setQuestion: (question: string) => void;
  answers: string[];
  setAnswers: (answers: string[]) => void;
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
    </div>
  );
};

export default NewQuestion;
