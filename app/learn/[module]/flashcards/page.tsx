// export function generateStaticParams() {
//   return Modules["modules"].map((mod) => ({ module: String(mod["id"]) }));
// }
// export const dynamicParams = false;

// export const dynamic = "force-static";

const FlashcardsPage = ({ params }: { params: { module: number } }) => {
  return <div>Module ID: {params.module}</div>;
};

export default FlashcardsPage;
