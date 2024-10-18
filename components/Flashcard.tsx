import { Card, CardBody } from "@nextui-org/react";

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
    <Card
      onClick={() =>
        side === "term" ? setSide("definition") : setSide("term")
      }
    >
      <CardBody>
        {side === "term" ? (
          <p>{flashcard.term}</p>
        ) : (
          <p>{flashcard.definition}</p>
        )}
      </CardBody>
    </Card>
  );
};

export default Flashcard;
