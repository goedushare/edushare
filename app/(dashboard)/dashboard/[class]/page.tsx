"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import Module from "@/components/Module";
import modules from "@/assets/modules.json";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import { use, useState } from "react";
import withAuth from "@/lib/withAuth";
import { useEffect } from "react";
import {
  addDocument,
  fetchCollectionData,
  getDocumentById,
  updateDocument,
} from "@/lib/firestoreHelpers";
import { ModuleForm, ClassForm } from "@/interfaces";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { getCurrentUser } from "@/lib/authHelpers";

const DashboardClass = ({ params }: { params: { class: string } }) => {
  const [modules, setModules] = useState<ModuleForm[]>([]);

  const [classes, setClasses] = useState<ClassForm[]>([]);

  // console.log('Class id:', params.class);
  const getClass = () => {
    return classes.find((class1) => class1.id === params.class);
  };

  const getClassFromModule = (moduleId: string) => {
    return classes.find((class1) => class1.modules.includes(moduleId));
  };

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const onCreate = (onClose: () => void) => {
    if (!moduleName) return;
    const defaultModuleForm: ModuleForm = {
      id: "0",
      title: "",
      authors: "",
      articles: [],
      quizzes: [],
      videos: [],
      flashcards: [],
      owner: "",
    };

    const newModule: ModuleForm = {
      ...defaultModuleForm,
      title: moduleName,
      authors: getCurrentUser()?.displayName || "",
      owner: getCurrentUser()?.uid || "",
    };

    addDocument("modules", newModule).then((docId) => {
      // console.log(getClassFromModule(params.class))
      const classDoc = getDocumentById("classes", params.class);
      classDoc.then((doc) => {
        // console.log(doc);
        updateDocument("classes", params.class, {
          modules: [...doc?.modules, docId],
        });
      });
    });

    onClose();
    setModuleName("");
    setAuthors("");
  };

  useEffect(() => {
    const getModules = async () => {
      try {
        const moduleData = await fetchCollectionData("modules");
        console.log("Module Data:", moduleData);
        setModules(moduleData);
        console.log("Modules:", modules);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    getModules();
  }, []);

  useEffect(() => {
    // Set up a real-time listener for the 'modules' collection
    const unsubscribe = onSnapshot(collection(db, "modules"), (snapshot) => {
      const modulesData = snapshot.docs.map((doc) => doc.data() as ModuleForm);

      setModules(modulesData);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Set up a real-time listener for the 'classes' collection
    const unsubscribe = onSnapshot(collection(db, "classes"), (snapshot) => {
      const classesData = snapshot.docs.map((doc) => doc.data() as ClassForm);

      setClasses(classesData);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const [moduleName, setModuleName] = useState("");
  const [authors, setAuthors] = useState("");

  if (
    !getClass() &&
    !getClass()?.students.includes(getCurrentUser()?.uid || "") &&
    getCurrentUser()?.uid !== getClass()?.owner
  ) {
    return (
      <div>
        <h1>You are not enrolled in this class</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-4xl font-montserrat font-bold inline-block mr-4">
            Dashboard: <span className="font-normal">{getClass()?.title}</span>
          </h1>
          <h2 className="text-2xl">Join Code: {getClass()?.joinCode}</h2>
        </div>

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
          {/* <div>
            <TextField
              label="Authors"
              value={authors}
              setValue={setAuthors}
              labelPlacement="inside"
            />
          </div> */}
        </Modal>
      </div>
      <div className="mt-4 mb-8">
        {modules.map((module) => {
          return (
            (getClass()?.owner === getCurrentUser()?.uid ||
              module.owner === getCurrentUser()?.uid) &&
            getClassFromModule(module.id)?.id === params.class && (
              <Module module={module} isEditable={true} key={module.id} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default withAuth(DashboardClass);
