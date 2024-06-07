import Link from "next/link";
import video from "../assets/video.svg";
import article from "../assets/article.svg";
import quiz from "../assets/quiz.svg";

type Module = {
  id: number;
  moduleName: string;
  videoName: string;
  articleName: string;
  videoURL: string;
  authors: string;
};

export default function Module({ module }: { module: Module }) {
  return (
    <div className="bg-green-50 rounded-lg p-8 mt-8">
      <div>
        <h2 className="text-2xl">{module["moduleName"]}</h2>
        <p>By: {module["authors"]}</p>
      </div>
      <div className="flex flex-row mt-4 gap-12">
        <div className="flex flex-col w-full">
          <h3 className="font-semibold">Learn</h3>
          <Link href={`/learn/${module["id"]}/video`}>
            <div className="group flex flex-row items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
              <img src={video.src} className="w-10 h-10" />
              <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                {module["videoName"]}
              </p>
            </div>
          </Link>
          <Link href={`/learn/${module["id"]}/article`}>
            <div className="group flex flex-row  items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
              <img src={article.src} className="w-10 h-10" />
              <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                {module["articleName"]}
              </p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col w-full">
          <h3 className="font-semibold">Practice</h3>
          <Link href={`/learn/${module["id"]}/quiz`}>
            <div className="group flex flex-row  items-center py-4 pl-8 w-full border-b-1 hover:bg-primary-green/10 transition-all duration-200 rounded-lg">
              <img src={quiz.src} className="w-10 h-10" />
              <p className="ml-4 leading-5 text-sm group-hover:text-primary-green transition-all duration-200">
                Quiz
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
