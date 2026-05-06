import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PressReleasesList from '@/components/PressReleasesList/PressReleasesList';
import { pressReleases, pressReleasesMeta } from '@/data/pressReleases';

export const metadata = {
  title: "Press-relizlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: pressReleasesMeta.description,
};

export default function PressReleasesPage() {
  return (
    <main>
      <Header />
      <PressReleasesList meta={pressReleasesMeta} documents={pressReleases} />
      <Footer />
    </main>
  );
}
