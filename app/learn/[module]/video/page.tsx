import Video from "@/app/components/Video";

export default function Page({ params }: { params: { module: string } }) {
  return (
    <Video title="Video" link="https://www.youtube.com/embed/tgbNymZ7vqY" />
  );
}
