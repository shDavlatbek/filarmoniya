import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import NewsList from '@/components/NewsList/NewsList';
import { newsArticles, newsMeta } from '@/data/news';

export const metadata = {
  title: "Yangiliklar — O'zbekiston Davlat Filarmoniyasi",
  description: newsMeta.description,
};

export default function NewsPage() {
  return (
    <main>
      <Header />
      <NewsList meta={newsMeta} articles={newsArticles} />
      <Footer />
    </main>
  );
}
