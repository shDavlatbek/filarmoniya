import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import DocumentsList from '@/components/DocumentsList/DocumentsList';
import { getOpenData, openDataMeta } from '@/lib/api';

export const metadata = {
  title: "Ochiq ma'lumotlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: openDataMeta.description,
};

export default async function OpenDataPage() {
  const items = await getOpenData();
  return (
    <main>
      <Header />
      <DocumentsList meta={openDataMeta} documents={items || []} />
      <Footer />
    </main>
  );
}
