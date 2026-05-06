import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ConcertsList from '@/components/ConcertsList/ConcertsList';
import { afishaEvents } from '@/data/afisha';

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

export default function ConcertsPage() {
  return (
    <main>
      <Header />
      <ConcertsList meta={concertsMeta} events={afishaEvents} />
      <Footer />
    </main>
  );
}
