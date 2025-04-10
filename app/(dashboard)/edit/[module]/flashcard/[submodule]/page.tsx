"use client";

import NewFlashcard from "@/components/NewFlashcard";
import TextField from "@/components/TextField";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FlashcardSetForm, FlashcardForm, ModuleForm, ClassForm} from "@/interfaces";
import { updateDocument, getDocumentById, fetchCollectionData } from "@/lib/firestoreHelpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react"; 

const NewFlashcardSet = ({ params }: { params: { module: string, submodule: number } }) => {
  const [title, setTitle] = useState("");
  const [flashcards, setFlashcards] = useState<FlashcardForm[]>([]);
  const router = useRouter();

  const [modules, setModules] = useState<ModuleForm>();
  const [classId, setClassId] = useState("");
  useEffect(() => {
    const getModules = async () => {
      try {
        const moduleData = await getDocumentById('modules', params.module); 
        console.log('Module Data:', moduleData); 
        if (!moduleData) return;
        setModules(moduleData as ModuleForm);
        console.log('Modules:', modules);

        if (moduleData?.flashcards) {
          setFlashcards(moduleData.flashcards[params.submodule]["flashcards"]);
          setTitle(moduleData.flashcards[params.submodule]["title"]);
        }
        const classData = await fetchCollectionData('classes');
        const class1 = classData.find((class1) => class1.modules.includes(params.module)) as ClassForm;
        setClassId(class1.id);

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getModules();
  }, []);


  const addFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  const createFlashcardSet = () => {
    

    const modules = getDocumentById('modules', params.module);

    modules.then((data) => {
      console.log(data?.flashcards);
      const updatedFlashcardSet: FlashcardSetForm = {
        ...data?.flashcards[params.submodule],
        title: title,
        flashcards: flashcards
      };
      console.log(flashcards)
      let currentFlashcards = data?.flashcards;
      currentFlashcards[params.submodule || 0] = updatedFlashcardSet;

      updateDocument('modules', params.module, {flashcards: currentFlashcards});
    });


    setTitle("");
    setFlashcards([]);
    router.push(`/dashboard/${classId}`);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">Edit Flashcard Set</h1>
        <Button
          className="bg-[#0E793C] text-white"
          onPress={createFlashcardSet}
        >
          Save Set
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
