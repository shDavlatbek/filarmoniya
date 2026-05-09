import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import PressReleasesList from '@/components/PressReleasesList/PressReleasesList';
import { getPressReleases, pressReleasesMeta } from '@/lib/api';

export const metadata = {
  title: "Press-relizlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: pressReleasesMeta.description,
};

export default async function PressReleasesPage() {
  const items = await getPressReleases();
  return (
    <main>
      <Header />
      <PressReleasesList meta={pressReleasesMeta} documents={items || []} />
      <Footer />
    </main>
  );
}
