"use client";
import React from "react";
import ProgressBar from "./ProgressBar";
import {Button} from "@nextui-org/button";
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
  const [answers, setAnswers] = React.useState([]);
  const [end, setEnd] = React.useState(false);

  return (
    <div className="w-3/4 min-h-[100vh] pb-16 h-[calc(100vh-64px)] overflow-scroll px-8">
      <form action="">
        <h1>Question {currQuestion + 1} of {questions.length}</h1>
          {end ? <Score /> : <Question question={questions[currQuestion]} />}
        <div>
          {end ? <Button>Try Again</Button> : <Button>Submit</Button>}
        </div>
      </form>
    </div>
  );
}
