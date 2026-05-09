import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import ConcertsList from '@/components/ConcertsList/ConcertsList';
import { getAfishaEvents, getAfishaFilters } from '@/lib/api';

const concertsMeta = {
  eyebrow: 'Konsertlar',
  title: 'Konsertlar',
  description:
    "Filarmoniya sahnalarida bo'lib o'tadigan konsertlarning to'liq ro'yxati. Ijrochilar, sahnalar, vaqt va narx ma'lumotlari bilan tanishing.",
};

export const metadata = {
  title: "Konsertlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: concertsMeta.description,
};

export default async function ConcertsPage() {
  const [events, filters] = await Promise.all([getAfishaEvents(), getAfishaFilters()]);
  return (
    <main>
      <Header />
      <ConcertsList meta={concertsMeta} events={events || []} filters={filters || []} />
      <Footer />
    </main>
  );
}
