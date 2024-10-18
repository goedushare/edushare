"use client";
import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "@nextui-org/button";
import Score from "./Score";
import Question from "./Question";
import QuizProgress from "./QuizProgress";

export default function Quiz({
  quizName,
  questions,
  authors,
}: {
  quizName: string;
  questions: Question[];
  authors: string;
}) {
  let lsCurrQuestion;
  let lsAnswers;
  let lsEnd;
  if (typeof window !== "undefined") {
    lsCurrQuestion = localStorage.getItem("currQuestion")
      ? JSON.parse(localStorage.getItem("currQuestion")!)
      : 0;

    lsAnswers = localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers")!)
      : new Array<number>(questions.length).fill(-1);

    lsEnd = localStorage.getItem("end")
      ? JSON.parse(localStorage.getItem("end")!)
      : false;
  } else {
    lsCurrQuestion = 0;
    lsAnswers = new Array<number>(questions.length).fill(-1);
    lsEnd = false;
  }

  const [currQuestion, setCurrQuestion] = React.useState(lsCurrQuestion);
  const [answers, setAnswers] = React.useState(lsAnswers);
  const [end, setEnd] = React.useState(lsEnd);
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

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("currQuestion", JSON.stringify(currQuestion));
  }, [currQuestion]);

  useEffect(() => {
    localStorage.setItem("end", JSON.stringify(end));
  }, [end]);

  return (
    <div className="w-3/4 h-[calc(100vh-64px)] overflow-y-scroll overflow-scroll flex flex-col">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-3xl mt-6">{quizName}</h1>
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
