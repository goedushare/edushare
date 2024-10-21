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
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { getCurrentUser } from "@/lib/authHelpers";


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
      owner: ""
    };

    const newModule: ModuleForm = {
      ...defaultModuleForm,
      title: moduleName,
      authors: authors,
      owner: getCurrentUser()?.uid || ""
    };

    addDocument('modules', newModule);

    onClose();
    setModuleName("");
    setAuthors("");
  };

  useEffect(() => {
    const getModules = async () => {
      try {
        const moduleData = await fetchCollectionData('modules'); 
        console.log('Module Data:', moduleData); 
        setModules(moduleData);
        console.log('Modules:', modules);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    getModules();
  }, []);

  useEffect(() => {
    // Set up a real-time listener for the 'modules' collection
    const unsubscribe = onSnapshot(collection(db, 'modules'), (snapshot) => {
      const modulesData = snapshot.docs.map((doc) => (doc.data() as ModuleForm));
      
      setModules(modulesData);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  const [moduleName, setModuleName] = useState("");
  const [authors, setAuthors] = useState("");

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-montserrat font-bold">Dashboard</h1>
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
          return module.owner === getCurrentUser()?.uid &&  <Module module={module} isEditable={true} key={module.id} />;
        })}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
