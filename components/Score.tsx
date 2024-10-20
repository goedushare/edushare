import { Radio, RadioGroup } from "@nextui-org/react";
import Question from "./Question";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { QuestionForm } from "../interfaces";

export default function Score({
  answers,
  questions,
}: {
  answers: number[];
  questions: QuestionForm[];
}) {
  let total = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === 1) {
      total++;
    }
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        Score: {total}/{answers.length}
      </h2>
      <h2 className="text-2xl mb-8">Review questions missed: </h2>
      {questions.map((question, i) => {
        if (answers[i] !== 1) {
          return (
            <div key={i} className="my-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]} className="mb-4 prose">
                {question["question"]}
              </ReactMarkdown>
              <div className="">
                <RadioGroup>
                  {question["answers"].map((answer, i) => {
                    return (
                      <>
                        <Radio value={answer}>{answer}</Radio>
                      </>
                    );
                  })}
                </RadioGroup>
                <hr className="mt-4" />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
