import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import NewsArticle from '@/components/NewsArticle/NewsArticle';
import { newsArticles } from '@/data/news';

const RELATED_LIMIT = 3;

export async function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
    },
  };
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = newsArticles
    .filter((a) => a.slug !== slug)
    .slice(0, RELATED_LIMIT);

  return (
    <main>
      <Header />
      <NewsArticle article={article} related={related} />
      <Footer />
    </main>
  );
}
