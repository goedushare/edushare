import Quiz from "@/app/components/Quiz";
import Modules from "@/app/assets/modules.json";
import path from "path";
import { readFileSync } from "fs";

export function generateStaticParams() {
  return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
}
export const dynamicParams = false;

export default function Page({ params }: { params: { module: number } }) {
  try {
    const raw = readFileSync(path.resolve(`app/assets/modules/${params.module}/quiz.json`), "utf8");
    const quiz = JSON.parse(raw);
    return <Quiz questions={quiz["questions"]} />;
  } catch (e) {
    return <div>Quiz not found</div>;
  }
}