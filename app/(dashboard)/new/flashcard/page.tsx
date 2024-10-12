"use client";

import NewFlashcard from "@/components/NewFlashcard";
import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const NewFlashcardSet = () => {
  const [title, setTitle] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  const createFlashcardSet = () => {};

  return (
    <div className="mb-12">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">New Flashcard Set</h1>
        <Button
          className="bg-[#0E793C] text-white"
          onPress={createFlashcardSet}
        >
          Create Set
        </Button>
      </div>
      <div className="mt-12">
        <TextField label="Title" value={title} setValue={setTitle} />
      </div>
      <div className="mt-12 flex flex-col justify-between space-y-4">
        {flashcards.map((flashcard, index) => (
          <NewFlashcard
            key={index}
            number={index + 1}
            term={flashcard.term}
            setTerm={(newTerm: string) => {
              const newFlashcards = [...flashcards];
              newFlashcards[index].term = newTerm;
              setFlashcards(newFlashcards);
            }}
            definition={flashcard.definition}
            setDefinition={(newDefinition) => {
              const newFlashcards = [...flashcards];
              newFlashcards[index].definition = newDefinition;
              setFlashcards(newFlashcards);
            }}
          />
        ))}
      </div>
      <div className="mt-6">
        <Button className="bg-[#0E793C] text-white" onPress={addFlashcard}>
          Add Flashcard
        </Button>
      </div>
    </div>
  );
};

export default NewFlashcardSet;
