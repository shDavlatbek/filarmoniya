import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import DocumentsList from '@/components/DocumentsList/DocumentsList';
import { openDataItems, openDataMeta } from '@/data/openData';

export const metadata = {
  title: "Ochiq ma'lumotlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: openDataMeta.description,
};

export default function OpenDataPage() {
  return (
    <main>
      <Header />
      <DocumentsList meta={openDataMeta} documents={openDataItems} />
      <Footer />
    </main>
  );
}
