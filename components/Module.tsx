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
import { getCurrentUser } from "@/lib/authHelpers";

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

  const {
    isOpen: isEditModuleModalOpen,
    onOpen: onEditModuleModalOpen,
    onOpenChange: onEditModuleModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isEditArticleModalOpen,
    onOpen: onEditArticleModalOpen,
    onOpenChange: onEditArticleModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isEditVideoModalOpen,
    onOpen: onEditVideoModalOpen,
    onOpenChange: onEditVideoModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isConfirmDeleteModalOpen,
    onOpen: onConfirmDeleteModalOpen,
    onOpenChange: onConfirmDeleteModalOpenChange,
  } = useDisclosure();

  const [currentModule, setCurrentModule] = useState("");

  const [videoForm, setVideoForm] = useState<VideoForm>();

  const [articleForm, setArticleForm] = useState<ArticleForm>();

  const [moduleName, setModuleName] = useState("");
  const [authors, setAuthors] = useState("");

  const [videos, setVideos] = useState(module["videos"]);
  const [articles, setArticles] = useState(module["articles"]);
  const [flashcards, setFlashcard] = useState(module["flashcards"]);
  const [quizzes, setQuizzes] = useState(module["quizzes"]);

  const [pendingDelete, setPendingDelete] = useState({ type: "", id: "" });

  // useEffect(() => {
  //   const fetchModule = async () => {
  //     const fetchedModule = await getDocumentById('modules', module["id"]);
  //     setVideos(fetchedModule?.videos || []);
  //   };

  //   fetchModule();
  // }, [module["id"]]);

  useEffect(() => {
    const moduleRef = doc(db, "modules", module["id"]);

    const unsubscribe = onSnapshot(moduleRef, (doc) => {
      if (doc.exists()) {
        const updatedModule = doc.data();
        setVideos(updatedModule?.videos || []);
        setArticles(updatedModule?.articles || []);
        setFlashcard(updatedModule?.flashcards || []);
        setQuizzes(updatedModule?.quizzes || []);
      } else {
        console.error("Document does not exist");
        // document.getElementById(`${module["id"]}moduleDiv`)?.remove();
      }
    });

    return () => unsubscribe();
  }, [module["id"]]);

  const deleteVideo = async (videoId: number) => {
    try {
      const modules = getDocumentById("modules", module["id"]);
      modules.then((data) => {
        const newVideos: VideoForm[] = data?.videos.filter(
          (video: VideoForm) => video.id !== videoId
        );
        for (let i = 0; i < newVideos.length; i++) {
          newVideos[i].id = i;
        }
        updateDocument("modules", module["id"], { videos: newVideos });
      });
    } catch (error) {
      console.error("Error deleting video: ", error);
    }
  };

  const deleteArticle = async (articleId: number) => {
    try {
      const modules = getDocumentById("modules", module["id"]);
      modules.then((data) => {
        const newArticles: ArticleForm[] = data?.articles.filter(
          (article: ArticleForm) => article.id !== articleId
        );
        for (let i = 0; i < newArticles.length; i++) {
          newArticles[i].id = i;
        }
        updateDocument("modules", module["id"], { articles: newArticles });
      });
    } catch (error) {
      console.error("Error deleting article: ", error);
    }
  };

  const deleteFlashcards = async (flashcardId: number) => {
    try {
      const modules = getDocumentById("modules", module["id"]);
      modules.then((data) => {
        const newFlashcards: FlashcardSetForm[] = data?.flashcards.filter(
          (flashcard: FlashcardSetForm) => flashcard.id !== flashcardId
        );
        for (let i = 0; i < newFlashcards.length; i++) {
          newFlashcards[i].id = i;
        }
        updateDocument("modules", module["id"], { flashcards: newFlashcards });
      });
    } catch (error) {
      console.error("Error deleting article: ", error);
    }
  };

  const deleteQuiz = async (quizId: number) => {
    try {
      const modules = getDocumentById("modules", module["id"]);
      modules.then((data) => {
        const newQuizzes: QuizForm[] = data?.quizzes.filter(
          (quiz: QuizForm) => quiz.id !== quizId
        );
        for (let i = 0; i < newQuizzes.length; i++) {
          newQuizzes[i].id = i;
        }
        updateDocument("modules", module["id"], { quizzes: newQuizzes });
      });
    } catch (error) {
      console.error("Error deleting article: ", error);
    }
  };

  const onCreateArticle = (onClose: () => void) => {
    const defaultArticleForm: ArticleForm = {
      id: 0,
      title: "",
      text: "",
    };

    const modules = getDocumentById("modules", currentModule);

    modules.then((data) => {
      console.log(data?.articles.length);
      const newArticle: ArticleForm = {
        ...defaultArticleForm,
        id: data?.articles.length,
        title: articleForm?.title || "",
        text: articleForm?.text || "",
      };
      updateDocument("modules", currentModule, {
        articles: [...data?.articles, newArticle],
      });
    });

    onClose();
    setArticleForm({ id: 0, title: "", text: "" });
    setCurrentModule("");
  };

  const onEditArticle = (onClose: () => void) => {
    console.log("Edit Article");
    // console.log(currentUser())

    const modules = getDocumentById("modules", currentModule);

    modules.then((data) => {
      const updatedArticle: ArticleForm = {
        ...data?.articles[articleForm?.id || 0],
        title: articleForm?.title || "",
        text: articleForm?.text || "",
      };
      let currentArticles = data?.articles;
      currentArticles[articleForm?.id || 0] = updatedArticle;
      updateDocument("modules", currentModule, { articles: currentArticles });
    });

    onClose();
    setArticleForm({ id: 0, title: "", text: "" });
    setCurrentModule("");
  };

  const onEditVideo = (onClose: () => void) => {
    console.log("Edit Video");

    const modules = getDocumentById("modules", currentModule);

    modules.then((data) => {
      const updatedVideo: VideoForm = {
        ...data?.videos[videoForm?.id || 0],
        title: videoForm?.title || "",
        videoUrl: videoForm?.videoUrl || "",
      };
      let currentVideos = data?.videos;
      currentVideos[videoForm?.id || 0] = updatedVideo;
      updateDocument("modules", currentModule, { videos: currentVideos });
    });

    onClose();
    setVideoForm({ id: 0, title: "", videoUrl: "" });
    setCurrentModule("");
  };

  const onConfirmDelete = (onClose: () => void) => {
    if (pendingDelete.type === "module") {
      deleteDocument("modules", pendingDelete.id);
    } else if (pendingDelete.type === "video") {
      deleteVideo(parseInt(pendingDelete.id));
    } else if (pendingDelete.type === "article") {
      deleteArticle(parseInt(pendingDelete.id));
    } else if (pendingDelete.type === "flashcard") {
      deleteFlashcards(parseInt(pendingDelete.id));
    } else if (pendingDelete.type === "quiz") {
      deleteQuiz(parseInt(pendingDelete.id));
    }
    onClose();
    setPendingDelete({ type: "", id: "" });
  };

  const onCreateVideo = (onClose: () => void) => {
    const defaultVideoForm: VideoForm = {
      id: 0,
      title: "",
      videoUrl: "",
    };

    const modules = getDocumentById("modules", currentModule);

    modules.then((data) => {
      console.log(data?.videos.length);
      const newVideo: VideoForm = {
        ...defaultVideoForm,
        id: data?.videos.length,
        title: videoForm?.title || "",
        videoUrl: videoForm?.videoUrl || "",
      };
      updateDocument("modules", currentModule, {
        videos: [...data?.videos, newVideo],
      });
    });

    onClose();
    setVideoForm({ id: 0, title: "", videoUrl: "" });
    setCurrentModule("");
  };

  const onCreateEditModule = (onClose: () => void) => {
    console.log("Edit Module");
    const modules = getDocumentById("modules", module["id"]);

    modules.then((data) => {
      const updatedModule = {
        ...data,
        title: moduleName,
        authors: authors,
      };
      updateDocument("modules", module["id"], updatedModule);
    });

    onClose();
    // setArticleForm({ id: 0, title: "", text: "" });
    setCurrentModule("");
    setModuleName("");
    setAuthors("");
  };

  return (
    // TODO: Fix positioning of module component (causes page to shift in x-axis)
    <div
      id={`${module["id"]}moduleDiv`}
      className="relative bg-green-50 rounded-lg p-8 mt-8"
    >
      {isEditable && (
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-500 hover:text-blue-500 transition-all duration-200"
            onClick={() => {
              // document.getElementById(`${module["id"]}moduleDiv`)?.remove();
              // deleteDocument('modules', module["id"]);
              setCurrentModule(module["id"]);
              setModuleName(module["title"]);
              setAuthors(module["authors"]);
              onEditModuleModalOpen();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 4l4 4-12 12H4v-4L16 4z"
              />
            </svg>
          </button>
          <button
            className="text-gray-500 hover:text-red-500 transition-all duration-200"
            onClick={() => {
              // document.getElementById(`${module["id"]}moduleDiv`)?.remove();
              // deleteDocument('modules', module["id"]);
              setPendingDelete({ type: "module", id: module["id"] });
              onConfirmDeleteModalOpen();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-montserrat font-bold">
          {module["title"]}
        </h2>
        <p className="">By: {module["authors"]}</p>
      </div>
      <div className="flex flex-row mt-4 gap-12">
        <div className="flex flex-col w-full">
          <h3 className="font-semibold font-montserrat">Learn</h3>
          {videos.length === 0 &&
            articles.length === 0 &&
            flashcards.length === 0 && (
              <div className="group flex items-center justify-between mt-2 py-4 pr-4 w-full border-b hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                <div className="flex items-center">
                  <p className="ml-4 text-sm leading-5 transition-all duration-200 group-hover:text-primary-green">
                    No Learning Resources Found
                  </p>
                </div>
              </div>
            )}
          {videos.map((video1, index) => (
            <Link
              key={index}
              href={`/learn/${module["id"]}/video/${video1.id}`}
            >
              <div className="group flex items-center justify-between py-4 pl-8 pr-4 w-full border-b hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                <div className="flex items-center">
                  <img src={video.src} className="w-10 h-10" />
                  <p className="ml-4 text-sm leading-5 transition-all duration-200 group-hover:text-primary-green">
                    {video1.title}
                  </p>
                </div>

                {isEditable && (
                  <div>
                    <button
                      className="invisible group-hover:visible text-gray-500 hover:text-blue-500 transition-all duration-100"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentModule(module["id"]);

                        setVideoForm({
                          id: video1.id,
                          title: video1.title,
                          videoUrl: video1.videoUrl,
                        });

                        onEditVideoModalOpen();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 4l4 4-12 12H4v-4L16 4z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        console.log(module["videos"]);
                        e.preventDefault();
                        e.stopPropagation();
                        // deleteVideo(video1.id);
                        setPendingDelete({
                          type: "video",
                          id: video1.id.toString(),
                        });
                        onConfirmDeleteModalOpen();
                      }}
                      className="invisible group-hover:visible text-gray-500 hover:text-red-500 transition-all duration-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
          {articles.map((article1, index) => (
            <Link
              key={index}
              href={`/learn/${module["id"]}/article/${article1.id}`}
            >
              <div className="group flex items-center justify-between py-4 pl-8 pr-4 w-full border-b hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                <div className="flex items-center">
                  <img src={article.src} className="w-10 h-10" />
                  <p className="ml-4 text-sm leading-5 transition-all duration-200 group-hover:text-primary-green">
                    {article1.title}
                  </p>
                </div>

                {isEditable && (
                  <div>
                    <button
                      className="invisible group-hover:visible text-gray-500 hover:text-blue-500 transition-all duration-100"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentModule(module["id"]);

                        setArticleForm({
                          id: article1.id,
                          title: article1.title,
                          text: article1.text,
                        });

                        onEditArticleModalOpen();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 4l4 4-12 12H4v-4L16 4z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        console.log(module["videos"]);
                        e.preventDefault();
                        e.stopPropagation();
                        // deleteArticle(article1.id);
                        setPendingDelete({
                          type: "article",
                          id: article1.id.toString(),
                        });
                        onConfirmDeleteModalOpen();
                      }}
                      className="invisible group-hover:visible text-gray-500 hover:text-red-500 transition-all duration-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
          {flashcards.map((flashcard1, index) => (
            <Link
              key={index}
              href={`/learn/${module["id"]}/flashcards/${flashcard1.id}`}
            >
              <div className="group flex items-center justify-between py-4 pl-8 pr-4 w-full border-b hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                <div className="flex items-center">
                  <img src={flashcard.src} className="w-10 h-10" />
                  <p className="ml-4 text-sm leading-5 transition-all duration-200 group-hover:text-primary-green">
                    {flashcard1.title}
                  </p>
                </div>

                {isEditable && (
                  <div>
                    <Link
                      href={`/edit/${module["id"]}/flashcard/${flashcard1.id}`}
                    >
                      <button className="invisible group-hover:visible text-gray-500 hover:text-blue-500 transition-all duration-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 4l4 4-12 12H4v-4L16 4z"
                          />
                        </svg>
                      </button>
                    </Link>
                    <button
                      onClick={(e) => {
                        console.log(module["videos"]);
                        e.preventDefault();
                        e.stopPropagation();
                        // deleteFlashcards(flashcard1.id);
                        setPendingDelete({
                          type: "flashcard",
                          id: flashcard1.id.toString(),
                        });
                        onConfirmDeleteModalOpen();
                      }}
                      className="invisible group-hover:visible text-gray-500 hover:text-red-500 transition-all duration-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <h3 className="font-semibold ">Practice</h3>
          {quizzes.length === 0 && (
            <div className="group flex items-center justify-between mt-2 py-4 pr-4 w-full border-b hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
              <div className="flex items-center">
                <p className="ml-4 text-sm leading-5 transition-all duration-200 group-hover:text-primary-green">
                  No Practice Resources Found
                </p>
              </div>
            </div>
          )}
          {quizzes.map((quiz1, index) => (
            <Link key={index} href={`/learn/${module["id"]}/quiz/${quiz1.id}`}>
              <div className="group flex items-center justify-between py-4 pl-8 pr-4 w-full border-b hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
                <div className="flex items-center">
                  <img src={quiz.src} className="w-10 h-10" />
                  <p className="ml-4 text-sm leading-5 transition-all duration-200 group-hover:text-primary-green">
                    {quiz1.title}
                  </p>
                </div>

                {isEditable && (
                  <div>
                    <Link href={`/edit/${module["id"]}/quiz/${quiz1.id}`}>
                      <button className="invisible group-hover:visible text-gray-500 hover:text-blue-500 transition-all duration-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 4l4 4-12 12H4v-4L16 4z"
                          />
                        </svg>
                      </button>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // deleteQuiz(quiz1.id);
                        setPendingDelete({
                          type: "quiz",
                          id: quiz1.id.toString(),
                        });
                        onConfirmDeleteModalOpen();
                      }}
                      className="invisible group-hover:visible text-gray-500 hover:text-red-500 transition-all duration-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {isEditable && (
        <div className="mt-6">
          <Dropdown>
            <DropdownTrigger>
              <Button className="bg-[#0E793C] text-white font-semibold font-montserrat">
                Add Resource
              </Button>
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
            onCloseModal={() => setArticleForm({ id: 0, title: "", text: "" })}
          >
            <div>
              <TextField
                label="Title"
                value={articleForm?.title || ""}
                setValue={(newTitle) =>
                  setArticleForm({
                    ...articleForm,
                    title: newTitle,
                    id: articleForm?.id || 0,
                    text: articleForm?.text || "",
                  })
                }
                labelPlacement="inside"
              />
              <TextField
                placeholder="Article Text"
                value={articleForm?.text || ""}
                setValue={(newText) =>
                  setArticleForm({
                    ...articleForm,
                    text: newText,
                    id: articleForm?.id || 0,
                    title: articleForm?.title || "",
                  })
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
            onCloseModal={() =>
              setVideoForm({ id: 0, title: "", videoUrl: "" })
            }
          >
            <div>
              <TextField
                label="Title"
                value={videoForm?.title}
                setValue={(newTitle) =>
                  setVideoForm({
                    ...videoForm,
                    title: newTitle,
                    id: videoForm?.id || 0,
                    videoUrl: videoForm?.videoUrl || "",
                  })
                }
                labelPlacement="inside"
              />
              <TextField
                label="Video URL"
                value={videoForm?.videoUrl}
                setValue={(newVideoUrl) =>
                  setVideoForm({
                    ...videoForm,
                    videoUrl: newVideoUrl,
                    id: videoForm?.id || 0,
                    title: videoForm?.title || "",
                  })
                }
                labelPlacement="inside"
                className="mt-4"
              />
            </div>
          </Modal>
          <Modal
            isOpen={isEditModuleModalOpen}
            onOpenChange={onEditModuleModalOpenChange}
            title="Edit Module"
            actionText="Save"
            onAction={onCreateEditModule}
            onCloseModal={() => {
              setAuthors("");
              setModuleName("");
            }}
          >
            <div>
              <TextField
                label="Title"
                value={moduleName || ""}
                setValue={
                  (newTitle) => setModuleName(newTitle)
                  // setArticleForm({ ...articleForm, title: newTitle, id: articleForm?.id || 0, text: articleForm?.text || "" })
                }
                labelPlacement="inside"
              />
              <TextField
                label="Authors"
                value={authors || ""}
                setValue={
                  (newAuthors) => setAuthors(newAuthors)
                  // setVideoForm({ ...videoForm, videoUrl: newVideoUrl, id: videoForm?.id || 0, title: videoForm?.title || "" })
                }
                labelPlacement="inside"
                className="mt-4"
              />
            </div>
          </Modal>
          <Modal
            isOpen={isEditArticleModalOpen}
            onOpenChange={onEditArticleModalOpenChange}
            title="Edit Article"
            actionText="Save"
            onAction={onEditArticle}
            onCloseModal={() => setArticleForm({ id: 0, title: "", text: "" })}
          >
            <div>
              <TextField
                label="Title"
                value={articleForm?.title || ""}
                setValue={(newTitle) =>
                  setArticleForm({
                    ...articleForm,
                    title: newTitle,
                    id: articleForm?.id || 0,
                    text: articleForm?.text || "",
                  })
                }
                labelPlacement="inside"
              />
              <TextField
                placeholder="Article Text"
                value={articleForm?.text || ""}
                setValue={(newText) =>
                  setArticleForm({
                    ...articleForm,
                    text: newText,
                    id: articleForm?.id || 0,
                    title: articleForm?.title || "",
                  })
                }
                as={Textarea}
                className="mt-4"
              />
            </div>
          </Modal>
          <Modal
            isOpen={isEditVideoModalOpen}
            onOpenChange={onEditVideoModalOpenChange}
            title="Edit Video"
            actionText="Save"
            onAction={onEditVideo}
            onCloseModal={() =>
              setVideoForm({ id: 0, title: "", videoUrl: "" })
            }
          >
            <div>
              <TextField
                label="Title"
                value={videoForm?.title}
                setValue={(newTitle) =>
                  setVideoForm({
                    ...videoForm,
                    title: newTitle,
                    id: videoForm?.id || 0,
                    videoUrl: videoForm?.videoUrl || "",
                  })
                }
                labelPlacement="inside"
              />
              <TextField
                label="Video URL"
                value={videoForm?.videoUrl}
                setValue={(newVideoUrl) =>
                  setVideoForm({
                    ...videoForm,
                    videoUrl: newVideoUrl,
                    id: videoForm?.id || 0,
                    title: videoForm?.title || "",
                  })
                }
                labelPlacement="inside"
                className="mt-4"
              />
            </div>
          </Modal>
          <Modal
            isOpen={isConfirmDeleteModalOpen}
            onOpenChange={onConfirmDeleteModalOpenChange}
            title="Warning"
            actionText="Yes"
            onAction={onConfirmDelete}
            // onCloseModal={() => setVideoForm({ id: 0, title: "", videoUrl: "" })}
          >
            <div>
              <p>Are you sure you want to delete this resource?</p>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
