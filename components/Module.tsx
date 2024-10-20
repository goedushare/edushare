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
import { useState } from "react";
import TextField from "./TextField";
import { ModuleForm, ArticleForm, VideoForm, QuizForm } from "../interfaces";
import { updateDocument, getDocumentById } from "@/lib/firestoreHelpers";



export default function Module({
  module,
  isEditable,
}: {
  module: ModuleForm;
  isEditable?: boolean;
}) {

  // console.log(module);
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

  const [currentModule, setCurrentModule] = useState("");

  const [videoForm, setVideoForm] = useState<VideoForm>()

  const [articleForm, setArticleForm] = useState<ArticleForm>()

  const onCreateArticle = (onClose: () => void) => {
    const defaultArticleForm: ArticleForm = {
      id: 0,
      title: "",
      text: ""
    }; 

    const modules = getDocumentById('modules', currentModule);

    modules.then((data) => {
      console.log(data?.articles.length);
      const newArticle: ArticleForm = {
        ...defaultArticleForm,
        id: data?.articles.length,
        title: articleForm?.title || "",
        text: articleForm?.text || "",
      };
      updateDocument('modules', currentModule, {articles: [...data?.articles, newArticle]});
    });

    


    onClose();
    setArticleForm({ id: 0, title: "", text: "" });
    setCurrentModule("");
  };

  const onCreateVideo = (onClose: () => void) => {

    const defaultVideoForm: VideoForm = {
      id: 0,
      title: "",
      videoUrl: ""
    };

    const modules = getDocumentById('modules', currentModule);

    modules.then((data) => {
      console.log(data?.videos.length);
      const newVideo: VideoForm = {
        ...defaultVideoForm,
        id: data?.videos.length,
        title: videoForm?.title || "",
        videoUrl: videoForm?.videoUrl || "",
      };
      updateDocument('modules', currentModule, {videos: [...data?.videos, newVideo]});
    });

    onClose();
    setVideoForm({ id: 0, title: "", videoUrl: "" });
    setCurrentModule("");
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
          {module["flashcards"].map((flashcard1, index) => (
          <Link key={index} href={`/learn/${module["id"]}/flashcards/${flashcard1.id}`}>
            <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
              <img src={flashcard.src} className="w-10 h-10" />
              <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                {flashcard1.title}
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
            onCloseModal={() => setArticleForm({ id: 9, title: "", text: "" })}
          >
            <div>
              <TextField
                label="Title"
                value={articleForm?.title || ""}
                setValue={(newTitle) =>
        
                  setArticleForm({ ...articleForm, title: newTitle, id: articleForm?.id || 0, text: articleForm?.text || "" })
                }
                labelPlacement="inside"
              />
              <TextField
                placeholder="Article Text"
                value={articleForm?.text || ""}
                setValue={(newText) =>
                  setArticleForm({ ...articleForm, text: newText, id: articleForm?.id || 0, title: articleForm?.title || "" })
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
            onCloseModal={() => setVideoForm({ id: 0, title: "", videoUrl: "" })}
          >
            <div>
              <TextField
                label="Title"
                value={videoForm?.title}
                setValue={(newTitle) =>
                  setVideoForm({ ...videoForm, title: newTitle, id: videoForm?.id || 0, videoUrl: videoForm?.videoUrl || "" })
                }
                labelPlacement="inside"
              />
              <TextField
                label="Video URL"
                value={videoForm?.videoUrl}
                setValue={(newVideoUrl) =>
                  setVideoForm({ ...videoForm, videoUrl: newVideoUrl, id: videoForm?.id || 0, title: videoForm?.title || "" })
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
