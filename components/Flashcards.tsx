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
    <div>
      <h1>{title}</h1>
      <h2>{authors}</h2>
      <Flashcard
        flashcard={flashcards[currentCard]}
        side={side}
        setSide={setSide}
      />
    </div>
  );
};

export default Flashcards;
