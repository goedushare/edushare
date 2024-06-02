import Quiz from "@/app/components/Quiz";

export default function Page({ params }: { params: { module: string } }) {
  return <Quiz />;
}

export const runtime = 'edge';