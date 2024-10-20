"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import Module from "@/components/Module";
import modules from "@/assets/modules.json";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import { useState } from "react";
import withAuth from "@/lib/withAuth";
import { useEffect } from "react";
import { addDocument, fetchCollectionData } from "@/lib/firestoreHelpers";
import { ModuleForm } from "@/interfaces";






const Dashboard = () => {
  
  const [modules, setModules] = useState<ModuleForm[]>([]);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const onCreate = (onClose: () => void) => {
    const defaultModuleForm: ModuleForm = {
      id: "0",
      title: "",
      authors: "",
      articles: [],
      quizzes: [],
      videos: [],
      flashcards: [],
    };

    const newModule: ModuleForm = {
      ...defaultModuleForm,
      title: moduleName,
      authors: authors,
    };

    addDocument('modules', newModule);

    onClose();
    setModuleName("");
  };

  useEffect(() => {
    const getModules = async () => {
      try {
        const moduleData = await fetchCollectionData('modules'); 
        console.log('Module Data:', moduleData); 
        setModules(moduleData);
        console.log('Modules:', modules);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getModules();
  }, []);

  const [moduleName, setModuleName] = useState("");
  const [authors, setAuthors] = useState("");

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">My Modules</h1>
        <Button className="bg-[#0E793C] text-white" onPress={onModalOpen}>
          Create New
        </Button>
        <Modal
          isOpen={isModalOpen}
          onOpenChange={onModalOpenChange}
          title="Create Module"
          actionText="Create"
          onAction={onCreate}
        >
          <div>
            <TextField
              label="Name"
              value={moduleName}
              setValue={setModuleName}
              labelPlacement="inside"
            />
          </div>
          <div>
          <TextField
              label="Authors"
              value={authors}
              setValue={setAuthors}
              labelPlacement="inside"
            />
          </div>
        </Modal>
      </div>
      <div className="mt-4 mb-8">
        {modules.map((module) => {
          return <Module module={module} isEditable={true} key={module.id} />;
        })}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
