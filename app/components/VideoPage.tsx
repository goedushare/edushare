import React from "react";

export default function VideoPage({title, link} : {title: string; link: string;}) {
    return (
        <div className="pl-[1/5vw] w-4/5 h-[100vh] flex flex-col items-center">
            <h1 className="font-semibold text-3xl my-6">{title}</h1>
            <iframe width="1000px" height="500px"
src={link}></iframe>
        </div>
    );
  }