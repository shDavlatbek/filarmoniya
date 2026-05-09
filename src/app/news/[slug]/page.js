import { notFound } from 'next/navigation';
import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import NewsArticle from '@/components/NewsArticle/NewsArticle';
import { getNewsArticle, getNewsArticles } from '@/lib/api';

const RELATED_LIMIT = 3;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
      type: 'article',
    },
  };
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const [article, all] = await Promise.all([getNewsArticle(slug), getNewsArticles()]);
  if (!article) notFound();

  const related = (all || [])
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
