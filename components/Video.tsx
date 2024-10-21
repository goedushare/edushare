import React from "react";
import Chatbot from "./Chatbot"

export default function Video({
  title,
  link,
  authors,
}: {
  title: string;
  link: string;
  authors: string;
}) {
  return (
    <div className="w-3/4 h-[calc(100vh-64px)] overflow-y-scroll overflow-x-hidden px-8 flex flex-col items-center">
      <h1 className="font-semibold text-3xl mt-6 font-montserrat">{title}</h1>
      <h2 className="font-normal text-xl mt-2 mb-12">By: {authors}</h2>
      <iframe
        width="800px"
        height="600px"
        src={link}
        className="rounded-xl shadow-xl mb-16"
      ></iframe>
      <Chatbot></Chatbot>
    </div>
  );
}
