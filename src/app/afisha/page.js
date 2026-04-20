import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AfishaList from '@/components/AfishaList/AfishaList';
import { afishaEvents, afishaMeta } from '@/data/afisha';

export const metadata = {
  title: "Afisha — O'zbekiston Davlat Filarmoniyasi",
  description: afishaMeta.description,
};

export default function AfishaPage() {
  return (
    <main>
      <Header />
      <AfishaList meta={afishaMeta} events={afishaEvents} />
      <Footer />
    </main>
  );
}
