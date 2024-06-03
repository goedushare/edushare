import React from "react";
import ProgressBar from "./ProgressBar";

export default function Quiz() {
    return (
        <div className="w-3/4 min-h-[100vh] pb-16 flex flex-col items-center h-[calc(100vh-64px)] overflow-scroll px-8">
            <h1 className="font-semibold text-3xl mt-6">Coming Soon</h1>

            <ProgressBar></ProgressBar>
        </div>
    );
  }