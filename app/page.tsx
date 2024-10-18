import { Button } from "@nextui-org/react";
import Link from "next/link";
import Chatbot from '../components/Chatbot'

export default function Home() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-scroll px-8">
      <div className="text-center flex flex-col justify-center items-center h-full">
        <div>
          <h1 className="text-3xl mb-4">Welcome to NSL Forever</h1>
          <h2 className="mb-8">
            Access AP NSL review modules containing videos, articles, and
            quizzes.
          </h2>
          <Button className="bg-[#0E793C] text-white" as={Link} href="/learn">
            Get Started
          </Button>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
