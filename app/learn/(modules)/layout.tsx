"use client";

import { Button } from "@nextui-org/button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Modules from "@/assets/modules.json";
import Chatbot from "@/components/Chatbot";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row flex-1">
      <Sidebar />
      <Chatbot />
      {children}
    </div>
  );
}
