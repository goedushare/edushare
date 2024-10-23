import Article from "@/components/Article";
import Modules from "@/assets/modules.json";
import path from "path";
import { readFileSync } from "fs";

// export function generateStaticParams() {
//   return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
// }
// export const dynamicParams = false;

// export const dynamic = "force-static";

const ArticlePage1 = ({ params }: { params: { module: string } }) => {
  // console.log("HIHI")
  // const mod = Modules["modules"];
  // let mdarticle;
  // try {
  //   console.log(mod)
  //   mdarticle = readFileSync(
  //     path.resolve(`assets/modules/${mod["id"]}/article.md`),
  //     "utf8"
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
  // if (!mdarticle) {
  //   return <div>Article not found</div>;
  // }
  return <h1></h1>;
  
};

export default ArticlePage1;
