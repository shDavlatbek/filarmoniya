import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import RelationsList from '@/components/RelationsList/RelationsList';
import { intlConcerts, intlConcertsMeta } from '@/data/international';

export const metadata = {
  title: "Qo'shma konsertlar — O'zbekiston Davlat Filarmoniyasi",
  description: intlConcertsMeta.description,
};

export default function InternationalConcertsPage() {
  return (
    <main>
      <Header />
      <RelationsList
        meta={intlConcertsMeta}
        items={intlConcerts}
        kind="concerts"
      />
      <Footer />
    </main>
  );
}
