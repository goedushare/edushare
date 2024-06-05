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
    e.preventDefault();
    setSelected("");
    checkAnswer();
    handleNextQuestion();
  };

  const checkAnswer = () => {
    if (
      selected ===
      questions[currQuestion]["answers"][questions[currQuestion]["correct"]]
    ) {
      setAnswers([...answers, true]);
    } else {
      setAnswers([...answers, false]);
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
    <div className="w-3/4 h-[calc(100vh-64px)] overflow-scroll flex flex-col">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-3xl my-8">Quiz</h1>
      </div>
      <div className="flex flex-1">
        <form
          onSubmit={handleFormSubmit}
          className="flex-1 justify-between flex flex-col"
        >
          <div className="px-8 mb-auto">
            {end ? (
              <Score answers={answers} />
            ) : (
              <div>
                <h2 className="font-bold mb-6">
                  Question {currQuestion + 1} of {questions.length}
                </h2>
                <Question
                  question={questions[currQuestion]}
                  handleOptionChange={handleOptionChange}
                  selected={selected}
                />
              </div>
            )}
          </div>
          <div className="p-2 px-6 flex flex-row justify-between border-t-1">
            <div className="flex items-center">
              <p>Do {questions.length} problems</p>
            </div>
            <div>
              {end ? (
                <Button type="submit">Try Again</Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
