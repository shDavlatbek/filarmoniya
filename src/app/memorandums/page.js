import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import RelationsList from '@/components/RelationsList/RelationsList';
import { getMemorandums, memorandumsMeta } from '@/lib/api';

export const metadata = {
  title: "Memorandumlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: memorandumsMeta.description,
};

export default async function MemorandumsPage() {
  const items = await getMemorandums();
  return (
    <main>
      <Header />
      <RelationsList meta={memorandumsMeta} items={items || []} kind="memorandums" />
      <Footer />
    </main>
  );
}
