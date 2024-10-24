"use client";

import NewFlashcard from "@/components/NewFlashcard";
import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FlashcardSetForm, FlashcardForm, ClassForm } from "@/interfaces";
import { updateDocument, getDocumentById, fetchCollectionData } from "@/lib/firestoreHelpers";
import { useRouter } from "next/navigation";


const NewFlashcardSet = ({ params }: { params: { module: string } }) => {
  const [title, setTitle] = useState("");
  const [flashcards, setFlashcards] = useState<FlashcardForm[]>([
    { term: "", definition: "" },
  ]);
  const router = useRouter();

  // const [classes, setClasses] = useState<ClassForm[]>([]);
  const addFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  const [classId, setClassId] = useState("");
  useEffect(() => {
    const getStuff = async () => {
      try {
        const classData = await fetchCollectionData('classes');

        // setClasses(classData);

        const class1 = classData.find((class1) => class1.modules.includes(params.module)) as ClassForm;
        setClassId(class1.id);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getStuff();
  }, []);

  const createFlashcardSet = () => {
    if (
      !title ||
      !flashcards ||
      flashcards.length == 0 ||
      flashcards.some((flashcard) => !flashcard.term) ||
      flashcards.some((flashcard) => !flashcard.definition)
    )
      return;
    const defaultFlashcardSetForm: FlashcardSetForm = {
      id: 0,
      title: "",
      flashcards: [],
    };

    const modules = getDocumentById("modules", params.module);

    modules.then((data) => {
      console.log(data?.flashcards);
      const newFlashcardSet: FlashcardSetForm = {
        ...defaultFlashcardSetForm,
        id: data?.flashcards.length,
        title: title,
        flashcards: flashcards,
      };
      updateDocument("modules", params.module, {
        flashcards: [...data?.flashcards, newFlashcardSet],
      });
    });

    setTitle("");
    setFlashcards([]);
    router.push(`/dashboard/${classId}`);
  };

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
            removeFlashcard={() => {
              const newFlashcards = [...flashcards];
              newFlashcards.splice(index, 1);
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
