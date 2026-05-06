import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import RelationsList from '@/components/RelationsList/RelationsList';
import { memorandums, memorandumsMeta } from '@/data/international';

export const metadata = {
  title: "Memorandumlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: memorandumsMeta.description,
};

export default function MemorandumsPage() {
  return (
    <main>
      <Header />
      <RelationsList
        meta={memorandumsMeta}
        items={memorandums}
        kind="memorandums"
      />
      <Footer />
    </main>
  );
}
