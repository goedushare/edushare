"use client";
import React from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "@nextui-org/button";
import Score from "./Score";
import Question from "./Question";

export type QuestionType = {
  id: number;
  question: string;
  answers: string[];
  correct: number;
};

export default function Quiz({ questions }: { questions: QuestionType[] }) {
  const [currQuestion, setCurrQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState([] as boolean[]);
  const [end, setEnd] = React.useState(false);
  const [selected, setSelected] = React.useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault();
    checkAnswer();
    handleNextQuestion();
  };

  const checkAnswer = () => {
    if (
      selected ===
      questions[currQuestion]["answers"][questions[currQuestion]["correct"]]
    ) {
      // set answer array at index of current question to true
      setAnswers([...answers, true]);
    }
  };

  const handleNextQuestion = () => {
    if (currQuestion + 1 < questions.length) {
      setCurrQuestion(currQuestion + 1);
    } else {
      setEnd(true);
    }
  };

  return (
    <div className="w-3/4 min-h-[100vh] pb-16 h-[calc(100vh-64px)] overflow-scroll px-8">
      <form onSubmit={handleFormSubmit}>
        <h1>
          Question {currQuestion + 1} of {questions.length}
        </h1>
        {end ? (
          <Score />
        ) : (
          <Question
            question={questions[currQuestion]}
            handleOptionChange={handleOptionChange}
          />
        )}
        <div>{end ? <Button type="submit">Try Again</Button> : <Button>Submit</Button>}</div>
      </form>
    </div>
  );
}
