export interface VideoForm {
  id: number;
  title: string;
  videoUrl: string;
}

export interface ArticleForm {
  id: number;
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
  id: number;
  title: string;
  questions: QuestionForm[];
}

export interface QuestionForm {
  question: string;
  answers: string[];
  correct: number;
}

