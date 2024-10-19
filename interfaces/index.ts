export interface VideoForm {
  id: string;
  title: string;
  videoUrl: string;
}

export interface ArticleForm {
  id: string;
  title: string;
  text: string;
}

interface Flashcard {
  term: string;
  definition: string;
}

export interface ModuleForm {
  id: string;
  title: string;
  authors: string;
  articles: ArticleForm[];
  videos: VideoForm[];
  quizzes: QuizForm[];
}

export interface QuizForm {
  id: string;
  title: string;
  questions: Question[];
}

interface Question {
  question: string;
  answers: string[];
  correct: number;
}

