"use client";

import { Button } from "@nextui-org/button";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Modules from "@/app/assets/modules.json";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const videoTitles = [
    {
      title: "How a Bill Becomes a Law",
      url: "how-a-bill-becomes-a-law",
      link: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
    {
      title: "Rah Rah Ooh La La",
      url: "how-to-get-mr-c-on-the-scotus",
      link: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
    {
      title: "Nom Nom Nom Nom",
      url: "the-world-of-campaign-finance",
      link: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header></Header>
      <div className="flex flex-row">
        <Sidebar></Sidebar>
        <div>{children}</div>
      </div>
    </div>
  );
}

/*<VideoPage title="How a Bill Becomes a law" link="https://www.youtube.com/embed/tgbNymZ7vqY"></VideoPage> */
