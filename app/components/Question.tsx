import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { QuestionType } from "./Quiz";

export default function Question({ question, handleOptionChange }: { question: QuestionType, handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <div>
      <p>{question["question"]}</p>
      <div>
        <RadioGroup>
          {question["answers"].map((answer, i) => {
            return <Radio value={answer} key={i} onChange={handleOptionChange}>{answer}</Radio>;
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
