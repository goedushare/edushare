"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import Module from "@/components/Module";
import modules from "@/assets/modules.json";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import { useState } from "react";
import withAuth from "@/lib/withAuth";
import { useEffect } from "react";
import {
  addClass,
  fetchCollectionData,
  updateDocument,
} from "@/lib/firestoreHelpers";
import { ModuleForm, ClassForm } from "@/interfaces";
import { collection, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { getCurrentUser } from "@/lib/authHelpers";
import ClassCard from "@/components/ClassCard";

const Dashboard = () => {
  const [classes, setClasses] = useState<ClassForm[]>([]);

  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const [error, setError] = useState("");

  const {
    isOpen: isCreateClassModalOpen,
    onOpen: onCreateClassModalOpen,
    onOpenChange: onCreateClassModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isJoinClassModalOpen,
    onOpen: onJoinClassModalOpen,
    onOpenChange: onJoinClassModalOpenChange,
  } = useDisclosure();

  const onCreateClass = (onClose: () => void) => {
    const defaultClassForm: ClassForm = {
      id: "",
      title: "",
      owner: "",
      joinCode: "",
      modules: [],
      students: [],
    };

    const newClass: ClassForm = {
      ...defaultClassForm,
      title: className,
      owner: getCurrentUser()?.uid || "",
    };

    addClass("classes1", newClass);

    onClose();
    setClassName("");
    setTeacher("");
  };

  const onJoinClass = (onClose: () => void) => {
    // const defaultClassForm: ClassForm = {
    //   id: "",
    //   title: "",
    //   owner: "",
    //   modules: [],
    //   students: []
    // };

    // const newClass: ClassForm = {
    //   ...defaultClassForm,
    //   title: className,
    //   owner: getCurrentUser()?.uid || "",
    // };

    const classes = fetchCollectionData("classes1");

    classes.then((data) => {
      console.log("Classes:", data);
      const currentClass = data?.find((c) => c.joinCode === joinCode);

      console.log(currentClass);

      if (!currentClass) {
        setError("Class not found.");
        // return;
      } else if (currentClass.students.includes(getCurrentUser()?.uid || "")) {
        setError("You are already in this class.");
        // return;
      } else {
        updateDocument("classes", currentClass.id, {
          students: [...currentClass.students, getCurrentUser()?.uid || ""],
        });
        onClose();
        setJoinCode("");
        setError("");
      }
    });
  };

  useEffect(() => {
    const getClasses = async () => {
      try {
        const classData = await fetchCollectionData("classes1");
        console.log("Class Data:", classData);
        setClasses(classData);
        console.log("Classes:", modules);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    getClasses();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, 'classes1'), (snapshot) => {
  //     const classesData = snapshot.docs.map((doc) => (doc.data() as ClassForm));

  //     setClasses(classesData);
  //     console.log('REAL CLASSES:', classesData);
  //   });

  //   // Cleanup the listener when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-montserrat font-bold">
          Welcome, {getCurrentUser()?.displayName}!
        </h1>
        <div className="flex flex-row gap-x-6">
          <Button
            className="bg-[#0E793C] text-white"
            onPress={onCreateClassModalOpen}
          >
            Create Class
          </Button>
          <Button
            className="bg-[#0E793C] text-white"
            onPress={onJoinClassModalOpen}
          >
            Join Class
          </Button>
        </div>
        <Modal
          isOpen={isCreateClassModalOpen}
          onOpenChange={onCreateClassModalOpenChange}
          title="Create Class"
          actionText="Create"
          onAction={onCreateClass}
        >
          <div>
            <TextField
              label="Name"
              value={className}
              setValue={setClassName}
              labelPlacement="inside"
            />
          </div>
          <div>
            <TextField
              label="Teacher"
              value={teacher}
              setValue={setTeacher}
              labelPlacement="inside"
            />
          </div>
        </Modal>
        <Modal
          isOpen={isJoinClassModalOpen}
          onOpenChange={onJoinClassModalOpenChange}
          title="Join Class"
          actionText="Join"
          onAction={onJoinClass}
          onCloseModal={() => {
            setJoinCode("");
            setError("");
          }}
        >
          <div>
            <TextField
              label="Join Code"
              value={joinCode}
              setValue={setJoinCode}
              labelPlacement="inside"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </Modal>
      </div>
      <div className="mt-4 mb-8">
        {classes.map((class1) => {
          return (
            (class1.owner === getCurrentUser()?.uid ||
              class1.students.includes(getCurrentUser()?.uid || "")) && (
              <ClassCard class1={class1} isEditable={true} key={class1.id} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
