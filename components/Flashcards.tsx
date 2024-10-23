"use client";

import { useState } from "react";
import Flashcard from "./Flashcard";
import { Button } from "@nextui-org/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactCardFlip from "react-card-flip";
import { FlashcardForm } from "@/interfaces";
import Chatbot from "./Chatbot";

const Flashcards = ({
  flashcardsName,
  authors,
  flashcards,
}: {
  flashcardsName: string;
  authors: string;
  flashcards: FlashcardForm[];
}) => {
  const [side, setSide] = useState<"term" | "definition">("term");
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [toggleNextAnimation, setToggleNextAnimation] = useState(false);

  return (
    <div className="w-3/4 pb-16 flex flex-col items-center h-[calc(100vh-64px)] overflow-y-scroll overflow-x-hidden px-8">
      <h1 className="font-semibold text-3xl mt-6 font-montserrat">
        {flashcardsName}
      </h1>
      <h2 className="font-normal text-xl mt-2 mb-12">By: {authors}</h2>
      <ReactCardFlip
        isFlipped={toggleNextAnimation}
        flipDirection="horizontal"
        containerClassName="w-2/3 h-3/5"
        flipSpeedBackToFront={0.4}
        flipSpeedFrontToBack={0.4}
        infinite={true}
      >
        <Flashcard
          flashcard={flashcards[currentCard]}
          side={side}
          setSide={setSide}
        />
        <Flashcard
          flashcard={flashcards[currentCard]}
          side={side}
          setSide={setSide}
        />
      </ReactCardFlip>

      <div className="flex flex-row justify-between content-center gap-4 mt-6">
        <Button
          className={
            currentCard > 0 ? "bg-green-600 text-white" : "cursor-default"
          }
          disabled={currentCard <= 0}
          isIconOnly
          radius="full"
          onClick={() => {
            if (currentCard > 0) {
              setToggleNextAnimation(!toggleNextAnimation);
              setSide("term");
              setCurrentCard(currentCard - 1);
            }
          }}
        >
          <FaArrowLeft />
        </Button>
        <p className="content-center">
          {currentCard + 1} of {flashcards.length}
        </p>
        <Button
          className={
            currentCard < flashcards.length - 1
              ? "bg-green-600 text-white"
              : "cursor-default"
          }
          disabled={currentCard >= flashcards.length - 1}
          isIconOnly
          radius="full"
          onClick={() => {
            if (currentCard < flashcards.length - 1) {
              setToggleNextAnimation(!toggleNextAnimation);
              setSide("term");
              setCurrentCard(currentCard + 1);
            }
          }}
        >
          <FaArrowRight />
        </Button>
      </div>

      <Chatbot></Chatbot>
    </div>
  );
};

export default Flashcards;
