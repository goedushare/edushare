import Video from "@/app/components/Video";
// import json object from assets/modules.json
import Modules from "@/app/assets/modules.json";

export function generateStaticParams() {
  return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
}

export default function Page({ params }: { params: { module: number } }) {
  const mod = Modules["modules"][params.module];
  return (
    <>
      <Video title={mod["videoName"]} link={mod["videoURL"]} />
    </>
  );
}