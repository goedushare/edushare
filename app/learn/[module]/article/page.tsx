import Article from "@/components/Article";
import Modules from "@/assets/modules.json";
import path from "path";
import { readFileSync } from "fs";

export function generateStaticParams() {
  return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
}
export const dynamicParams = false;

export const runtime = "nodejs";

export const dynamic = "force-static";

export default function ArticlePage({
  params,
}: {
  params: { module: number };
}) {
  const mod = Modules["modules"][params.module];
  let mdarticle;
  try {
    mdarticle = readFileSync(
      path.resolve(`assets/modules/${mod["id"]}/article.md`),
      "utf8"
    );
  } catch (e) {
    console.log(e);
  }
  if (!mdarticle) {
    return <div>Article not found</div>;
  }
  return (
    <Article
      articleName={mod["articleName"]}
      authors={mod["authors"]}
      body={mdarticle}
    />
  );
}
