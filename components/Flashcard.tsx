import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Flashcard = ({
  flashcard,
  side,
  setSide,
}: {
  flashcard: Flashcard;
  side: "term" | "definition";
  setSide: (side: "term" | "definition") => void;
}) => {
  return (
    <ReactCardFlip
      isFlipped={side === "definition"}
      flipDirection="vertical"
      containerClassName="h-full w-full"
      flipSpeedBackToFront={0.4}
      flipSpeedFrontToBack={0.4}
    >
      <Card className="w-full h-full">
        <CardBody
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setSide("definition")}
        >
          <p>{flashcard.term}</p>
        </CardBody>
      </Card>
      <Card className="w-full h-full">
        <CardBody
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setSide("term")}
        >
          <p>{flashcard.definition}</p>
        </CardBody>
      </Card>
    </ReactCardFlip>
  );
};

export default Flashcard;
