import React from "react";

export default function Video({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className="w-3/4 h-[calc(100vh-64px)] overflow-y-scroll overflow-x-hidden px-8 flex flex-col items-center">
      <h1 className="font-semibold text-3xl my-6 mb-16">{title}</h1>
      <iframe width="1000px" height="500px" src={link} className="rounded-xl shadow-xl"></iframe>
    </div>
  );
}
