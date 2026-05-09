import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import RelationsList from '@/components/RelationsList/RelationsList';
import { competitionsMeta, getCompetitions } from '@/lib/api';

export const metadata = {
  title: "Xalqaro tanlovlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: competitionsMeta.description,
};

export default async function CompetitionsPage() {
  const items = await getCompetitions();
  return (
    <main>
      <Header />
      <RelationsList meta={competitionsMeta} items={items || []} kind="competitions" />
      <Footer />
    </main>
  );
}
