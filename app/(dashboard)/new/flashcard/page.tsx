"use client";

import NewFlashcard from "@/components/NewFlashcard";
import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const NewFlashcardSet = () => {
  const [title, setTitle] = useState("");
  const [flashcards, setFlashcards] = useState<FlashcardForm[]>([]);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">New Flashcard Set</h1>
        <Button className="bg-[#0E793C] text-white" onPress={() => {}}>
          Add Flashcard
        </Button>
      </div>
      <div className="mt-16">
        <TextField label="Title" value={title} setValue={setTitle} />
      </div>
      <div className="mt-8">
        <NewFlashcard
          number={1}
          term={flashcards[0]?.term || ""}
          setTerm={() => {}}
          definition={flashcards[0]?.term || ""}
          setDefinition={() => {}}
        />
      </div>
    </div>
  );
};

export default NewFlashcardSet;
