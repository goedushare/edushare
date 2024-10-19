"use client";

import Link from "next/link";
import video from "../assets/video.svg";
import article from "../assets/article.svg";
import quiz from "../assets/quiz.svg";
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
import { useState } from "react";
import TextField from "./TextField";
import { ModuleForm, ArticleForm, VideoForm, QuizForm } from "../interfaces";

export default function Module({
  module,
  isEditable,
}: {
  module: ModuleForm;
  isEditable?: boolean;
}) {

  console.log(module);
  const {
    isOpen: isArticleModalOpen,
    onOpen: onArticleModalOpen,
    onOpenChange: onArticleModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isVideoModalOpen,
    onOpen: onVideoModalOpen,
    onOpenChange: onVideoModalOpenChange,
  } = useDisclosure();

  const [currentModule, setCurrentModule] = useState(0);

  const [videoForm, setVideoForm] = useState<VideoForm>()

  const [articleForm, setArticleForm] = useState<ArticleForm>()

  const onCreateArticle = (onClose: () => void) => {
    const defaultArticleForm: ArticleForm = {
      id : "0",
      title: "",
      text: ""
    };

    const newArticle: ArticleForm = {
      ...defaultArticleForm,
      title: articleForm?.title || "",
      text: articleForm?.text || "",
    };

    addDocument('modules', newModule);

    onClose();
    setArticleForm({ id: "", title: "", text: "" });
  };

  const onCreateVideo = (onClose: () => void) => {
    onClose();
    setVideoForm({ id: "", title: "", videoUrl: "" });
  };

  return (
    // TODO: Fix positioning of module component (causes page to shift in x-axis)
    <div className="bg-green-50 rounded-lg p-8 mt-8">
      <div>
        <h2 className="text-2xl">{module["title"]}</h2>
        <p>By: {module["authors"]}</p>
      </div>
      <div className="flex flex-row mt-4 gap-12">
        <div className="flex flex-col w-full">
          <h3 className="font-semibold">Learn</h3>
          {module["videos"].map((video1, index) => (
          <Link key={index} href={`/learn/${module["id"]}/video/${video1.id}`}>
            <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
              <img src={video.src} className="w-10 h-10" />
              <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                {video1.title}
              </p>
            </div>
          </Link>
          ))}
          {module["articles"].map((article1, index) => (
          <Link key={index} href={`/learn/${module["id"]}/article/${article1.id}`}>
            <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
              <img src={article.src} className="w-10 h-10" />
              <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                {article1.title}
              </p>
            </div>
          </Link>
          ))}
        
        </div>
        <div className="flex flex-col w-full">
          <h3 className="font-semibold">Practice</h3>
          
          {module["quizzes"].map((quiz1, index) => (
          <Link key={index} href={`/learn/${module["id"]}/quiz/${quiz1.id}`}>
            <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
              <img src={quiz.src} className="w-10 h-10" />
              <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                {quiz1.title}
              </p>
            </div>
          </Link>
          ))}
        </div>
      </div>
      {isEditable && (
        <div className="mt-6">
          <Dropdown>
            <DropdownTrigger>
              <Button className="bg-[#0E793C] text-white">Add Resource</Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="quiz" href={`/new/${module.id}/quiz`}>
                Quiz
              </DropdownItem>
              <DropdownItem
                key="flashcard"
                href={`/new/${module.id}/flashcard`}
              >
                Flashcard Set
              </DropdownItem>
              <DropdownItem
                key="article"
                onPress={() => {
                  setCurrentModule(module["id"]);
                  onArticleModalOpen();
                }}
              >
                Article
              </DropdownItem>
              <DropdownItem
                key="video"
                onPress={() => {
                  setCurrentModule(module["id"]);
                  onVideoModalOpen();
                }}
              >
                Video
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal
            isOpen={isArticleModalOpen}
            onOpenChange={onArticleModalOpenChange}
            title="Add Article"
            actionText="Create"
            onAction={onCreateArticle}
            onCloseModal={() => setArticleForm({ id: "", title: "", text: "" })}
          >
            <div>
              <TextField
                label="Title"
                value={articleForm?.title || ""}
                setValue={(newTitle) =>
                  setArticleForm({ ...articleForm, title: newTitle })
                }
                labelPlacement="inside"
              />
              <TextField
                placeholder="Article Text"
                value={articleForm?.text || ""}
                setValue={(newText) =>
                  setArticleForm({ ...articleForm, text: newText })
                }
                as={Textarea}
                className="mt-4"
              />
            </div>
          </Modal>
          <Modal
            isOpen={isVideoModalOpen}
            onOpenChange={onVideoModalOpenChange}
            title="Add Video"
            actionText="Create"
            onAction={onCreateVideo}
            onCloseModal={() => setVideoForm({ id: "", title: "", videoUrl: "" })}
          >
            <div>
              <TextField
                label="Title"
                value={videoForm?.title}
                setValue={(newTitle) =>
                  setVideoForm({ ...videoForm, title: newTitle })
                }
                labelPlacement="inside"
              />
              <TextField
                label="Video URL"
                value={videoForm?.videoUrl}
                setValue={(newVideoUrl) =>
                  setVideoForm({ ...videoForm, videoUrl: newVideoUrl })
                }
                labelPlacement="inside"
                className="mt-4"
              />
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
