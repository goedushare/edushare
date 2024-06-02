import Article from "@/app/components/Article";

export default function ArticlePage({ params }: { params: { module: string } }) {
  return <Article />;
}

export const runtime = 'edge';