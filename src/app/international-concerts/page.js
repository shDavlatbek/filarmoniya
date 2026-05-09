import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import RelationsList from '@/components/RelationsList/RelationsList';
import { getIntlConcerts, intlConcertsMeta } from '@/lib/api';

export const metadata = {
  title: "Qo'shma konsertlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: intlConcertsMeta.description,
};

export default async function InternationalConcertsPage() {
  const items = await getIntlConcerts();
  return (
    <main>
      <Header />
      <RelationsList meta={intlConcertsMeta} items={items || []} kind="concerts" />
      <Footer />
    </main>
  );
}
