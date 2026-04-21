import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import RelationsList from '@/components/RelationsList/RelationsList';
import { competitions, competitionsMeta } from '@/data/international';

export const metadata = {
  title: "Xalqaro tanlovlar — O'zbekiston Davlat Filarmoniyasi",
  description: competitionsMeta.description,
};

export default function CompetitionsPage() {
  return (
    <main>
      <Header />
      <RelationsList
        meta={competitionsMeta}
        items={competitions}
        kind="competitions"
      />
      <Footer />
    </main>
  );
}
