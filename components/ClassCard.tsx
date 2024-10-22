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
import { redirect } from "next/navigation";
import { getCurrentUser, getUserById } from "@/lib/authHelpers";

export default function ClassCard({
  class1,
  isEditable,
}: {
  class1: ClassForm;
  isEditable?: boolean;
}) {
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    const classesRef = doc(db, "classes", class1["id"]);

    const unsubscribe = onSnapshot(classesRef, (doc) => {
      if (doc.exists()) {
        const updatedClass = doc.data();
      } else {
        console.error("Document does not exist");
        // document.getElementById(`${module["id"]}moduleDiv`)?.remove();
      }
    });

    return () => unsubscribe();
  }, [class1["id"]]);

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
      className="relative bg-green-50 rounded-lg p-8 mt-8 basis-1/2 flex"
    >
      <div>
        <h2 className="text-2xl font-montserrat font-bold">
          {class1["title"]}
        </h2>
        <p className="">Teacher: {teacher}</p>
      </div>
    </div>
  );
}
