import Video from "@/components/Video";
// import json object from assets/modules.json
import Modules from "@/assets/modules.json";

export function generateStaticParams() {
  return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
}
export const dynamicParams = false;

export const dynamic = "force-static";

export default function Page({ params }: { params: { module: number } }) {
  const mod = Modules["modules"][params.module];
  return (
    <>
      <Video
        title={mod["videoName"]}
        link={mod["videoURL"]}
        authors={mod["authors"]}
      />
    </>
  );
}
