"use client";

import { useState } from "react";
import Flashcard from "./Flashcard";

const Flashcards = ({
  title,
  authors,
  flashcards,
}: {
  title: string;
  authors: string;
  flashcards: Flashcard[];
}) => {
  const [side, setSide] = useState<"term" | "definition">("term");
  const [currentCard, setCurrentCard] = useState<number>(0);

  return (
    <div className="w-3/4 pb-16 flex flex-col items-center h-[calc(100vh-64px)] overflow-y-scroll overflow-x-hidden px-8">
      <h1 className="font-semibold text-3xl mt-6">{title}</h1>
      <h2 className="font-normal text-xl mt-2 mb-12">By: {authors}</h2>
      <Flashcard
        flashcard={flashcards[currentCard]}
        side={side}
        setSide={setSide}
      />
    </div>
  );
};

export default Flashcards;
