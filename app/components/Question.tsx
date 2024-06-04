import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { QuestionType } from "./Quiz";

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
      <p>{question["question"]}</p>
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
