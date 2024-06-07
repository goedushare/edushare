"use client";
import React from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "@nextui-org/button";
import Score from "./Score";
import Question from "./Question";
import QuizProgress from "./QuizProgress";

export type QuestionType = {
  id: number;
  question: string;
  answers: string[];
  correct: number;
};

export default function Quiz({ questions, authors }: { questions: QuestionType[], authors: string}) {
  const [currQuestion, setCurrQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState(
    new Array<number>(questions.length).fill(-1)
  );
  const [end, setEnd] = React.useState(false);
  const [selected, setSelected] = React.useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (end) {
      handleRestart();
      return;
    }
    setSelected("");
    checkAnswer();
    handleNextQuestion();
  };

  const handleRestart = () => {
    setCurrQuestion(0);
    setAnswers(new Array<number>(questions.length).fill(-1));
    setEnd(false);
    setSelected("");
  };

  const checkAnswer = () => {
    let tempAnswers = [...answers];
    if (
      selected ===
      questions[currQuestion]["answers"][questions[currQuestion]["correct"]]
    ) {
      tempAnswers[currQuestion] = 1;
    } else {
      tempAnswers[currQuestion] = 0;
    }
    setAnswers(tempAnswers);
  };

  const handleNextQuestion = () => {
    if (currQuestion + 1 < questions.length) {
      setCurrQuestion(currQuestion + 1);
    } else {
      setEnd(true);
    }
  };

  return (
    <div className="w-3/4 overflow-scroll flex flex-col">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-3xl mt-6">Quiz</h1>
        <h2 className="font-normal text-xl mt-2 mb-12">By: {authors}</h2>
      </div>
      <div className="flex flex-1">
        <form
          onSubmit={handleFormSubmit}
          className="flex-1 justify-between flex flex-col"
        >
          <div className="px-16 mb-auto h-[calc(100vh-)]">
            {end ? (
              <Score answers={answers} questions={questions} />
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
          <div className="mt-6 p-2 px-6 flex flex-row justify-between border-t-1">
            <div className="flex items-center">
              <p className="mr-6">Do {questions.length} problems</p>
              <QuizProgress answers={answers} />
            </div>
            <div>
              {end ? (
                <Button type="submit" className="bg-[#0E793C] text-white">
                  Try Again
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={selected === ""}
                  className={selected === "" ? "" : "bg-[#0E793C] text-white"}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
