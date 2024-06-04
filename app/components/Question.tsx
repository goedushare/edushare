import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { QuestionType } from "./Quiz";

export default function Question({ question }: { question: QuestionType }) {
  return (
    <div>
      <p>{question["question"]}</p>
      <div>
        <RadioGroup>
          {question["answers"].map((answer) => {
            return <Radio value={answer} key={answer}>{answer}</Radio>;
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
