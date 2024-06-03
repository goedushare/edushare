import Quiz from "@/app/components/Quiz";
import Modules from "@/app/assets/modules.json";

export function generateStaticParams() {
  return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
}
export const dynamicParams = false;


export default function Page({ params }: { params: { module: string } }) {
  return <Quiz />;
}