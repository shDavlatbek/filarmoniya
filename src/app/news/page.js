import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import NewsList from '@/components/NewsList/NewsList';
import { getNewsArticles, newsMeta } from '@/lib/api';

export const metadata = {
  title: "Yangiliklar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: newsMeta.description,
};

export default async function NewsPage() {
  const articles = await getNewsArticles();
  return (
    <main>
      <Header />
      <NewsList meta={newsMeta} articles={articles || []} />
      <Footer />
    </main>
  );
}
