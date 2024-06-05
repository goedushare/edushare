import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { QuestionType } from "./Quiz";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export default function Question({
  question,
  handleOptionChange,
  selected,
}: {
  question: QuestionType;
  handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string;
}) {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="mb-4 prose">{question["question"]}</ReactMarkdown>
      <div>
        <RadioGroup value={selected}>
          {question["answers"].map((answer, i) => {
            return (
              <>
                <Radio value={answer} key={i} onChange={handleOptionChange}>
                  {answer}
                </Radio>
              </>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
