interface VideoForm {
  title: string;
  videoUrl: string;
}

interface ArticleForm {
  title: string;
  text: string;
}

interface Flashcard {
  term: string;
  definition: string;
}

interface Module {
  id: number;
  moduleName: string;
  videoName: string;
  articleName: string;
  videoURL: string;
  authors: string;
}

interface Question {
  question: string;
  answers: string[];
  correct: number;
}
