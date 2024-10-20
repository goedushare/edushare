import Video from "@/components/Video";
// import json object from assets/modules.json
import Modules from "@/assets/modules.json";

// export function generateStaticParams() {
//   return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
// }
// export const dynamicParams = false;

// export const dynamic = "force-static";

const VideoPage1 = ({ params }: { params: { module: string } }) => {
  // const mod = Modules["modules"][params.module];
  return <h1></h1>;
};

export default VideoPage1;
