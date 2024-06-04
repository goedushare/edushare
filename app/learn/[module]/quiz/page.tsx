import Quiz from "@/app/components/Quiz";
import Modules from "@/app/assets/modules.json";

export function generateStaticParams() {
  return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
}
export const dynamicParams = false;

export default function Page({ params }: { params: { module: number } }) {
  try {
    console.log(`@/app/assets/modules/${params.module}/quiz.json`);
    const quiz = require(`@/app/assets/modules/${params.module}/quiz.json`);
    return <Quiz questions={quiz["questions"]} />;
  } catch (e) {
    return <div>Quiz not found</div>;
  }
}