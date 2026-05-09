import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import AfishaList from '@/components/AfishaList/AfishaList';
import { afishaMeta, getAfishaEvents, getAfishaFilters } from '@/lib/api';

export const metadata = {
  title: "Afisha — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: afishaMeta.description,
};

export default async function AfishaPage() {
  const [events, filters] = await Promise.all([
    getAfishaEvents(),
    getAfishaFilters(),
  ]);
  return (
    <main>
      <Header />
      <AfishaList meta={afishaMeta} events={events || []} filters={filters || []} />
      <Footer />
    </main>
  );
}
