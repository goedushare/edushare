"use client";

import Link from "next/link";
import video from "../assets/video.svg";
import article from "../assets/article.svg";
import quiz from "../assets/quiz.svg";
import flashcard from "../assets/flashcard.svg";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import TextField from "./TextField";
import {
  ClassForm,
  ModuleForm,
  ArticleForm,
  VideoForm,
  QuizForm,
  FlashcardSetForm,
} from "../interfaces";
import {
  updateDocument,
  getDocumentById,
  deleteDocument,
} from "@/lib/firestoreHelpers";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { getCurrentUser, getUserById } from "@/lib/authHelpers";

export default function ClassCard({
  class1,
  isEditable,
}: {
  class1: ClassForm;
  isEditable?: boolean;
}) {
  const [teacher, setTeacher] = useState("");

  const router = useRouter();

  // useEffect(() => {
  //   const classesRef = doc(db, 'classes', class1["id"]);
  //   console.log(class1["id"]);
  //   if (!classesRef) {
  //     console.error("Document does not exist");
  //     return;
  //   }

  //   const unsubscribe = onSnapshot(classesRef, (doc) => {
  //     console.log("Class updated");
  //     if (doc.exists()) {
  //       const updatedClass = doc.data();
  //       console.log(updatedClass);
  //     } else {
  //       console.error("Document does not exist");
  //       // document.getElementById(`${module["id"]}moduleDiv`)?.remove();
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [class1["id"]]);

  useEffect(() => {
    const userRef = doc(db, "users", class1["owner"]);

    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const updatedUser = doc.data();
        setTeacher(updatedUser?.name);
      } else {
        console.error("Document does not exist");
        // document.getElementById(`${module["id"]}moduleDiv`)?.remove();
      }
    });
    return () => unsubscribe();
  }, [class1["owner"]]);

  return (
    // TODO: Fix positioning of module component (causes page to shift in x-axis)
    <div
      id={`${class1["id"]}classDiv`}
      className="relative bg-green-50 rounded-lg p-8 mt-8 basis-1/2 flex justify-between"
    >
      <div>
        <h2 className="text-2xl font-montserrat font-bold">
          {class1["title"]}
        </h2>
        <p className="">Teacher: {teacher}</p>
      </div>
      <div className="flex flex-row gap-x-4 mt-4">
        <Button
          className="bg-[#0E793C] text-white"
          onPress={() => router.push(`/dashboard/${class1["id"]}`)}
        >
          View Class
        </Button>
        {(isEditable && class1.owner === getCurrentUser()?.uid) && (
          <Button
            className="bg-[#0E793C] text-white"
            onPress={() => deleteDocument("classes", class1["id"])}
          >
            Delete Class
          </Button>
        )}
      </div>
    </div>
  );
}
