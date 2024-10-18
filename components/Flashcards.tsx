"use client";

import { useState } from "react";
import Flashcard from "./Flashcard";
import { Button } from "@nextui-org/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Flashcards = ({
  flashcardsName,
  authors,
  flashcards,
}: {
  flashcardsName: string;
  authors: string;
  flashcards: Flashcard[];
}) => {
  const [side, setSide] = useState<"term" | "definition">("term");
  const [currentCard, setCurrentCard] = useState<number>(0);

  return (
    <div className="w-3/4 pb-16 flex flex-col items-center h-[calc(100vh-64px)] overflow-y-scroll overflow-x-hidden px-8">
      <h1 className="font-semibold text-3xl mt-6">{flashcardsName}</h1>
      <h2 className="font-normal text-xl mt-2 mb-12">By: {authors}</h2>
      <Flashcard
        flashcard={flashcards[currentCard]}
        side={side}
        setSide={setSide}
      />
      <div className="flex flex-row justify-between content-center gap-4 mt-6">
        <Button
          className="bg-green-600 text-white"
          isIconOnly
          radius="full"
          onClick={() => {
            console.log("Left");
            if (currentCard > 0) setCurrentCard(currentCard - 1);
          }}
        >
          <FaArrowLeft />
        </Button>
        <p className="content-center">
          {currentCard + 1} of {flashcards.length}
        </p>
        <Button
          className="bg-green-600 text-white"
          isIconOnly
          radius="full"
          onClick={() => {
            console.log("Right");
            if (currentCard < flashcards.length - 1)
              setCurrentCard(currentCard + 1);
          }}
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Flashcards;
