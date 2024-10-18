import Flashcards from "@/components/Flashcards";

// export function generateStaticParams() {
//   return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
// }
// export const dynamicParams = false;
//
// export const dynamic = "force-static";

const flashcards: Flashcard[] = [
  { term: "1", definition: "A" },
  { term: "2", definition: "B" },
  { term: "3", definition: "C" },
  { term: "4", definition: "D" },
  { term: "5", definition: "E" },
];

const authors = "AUTHORS";

const title = "TITLE";

const FlashcardsPage = ({ params }: { params: { module: number } }) => {
  return <Flashcards authors={authors} flashcards={flashcards} title={title} />;
};

export default FlashcardsPage;
