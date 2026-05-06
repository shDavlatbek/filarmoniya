import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StatuteHero from '@/components/StatuteHero/StatuteHero';
import StatuteDocument from '@/components/StatuteDocument/StatuteDocument';
import { statuteContent } from '@/data/statute';

export const metadata = {
  title: "Muassasa nizomi — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description:
    "O'zbekiston Respublikasi Madaniyat vazirligi huzuridagi O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi to'g'risida nizom — to'liq matn, boblar va moddalar.",
};

export default function StatutePage() {
  return (
    <main>
      <Header />
      <StatuteHero data={statuteContent.meta} />
      <StatuteDocument
        chapters={statuteContent.chapters}
        attachments={statuteContent.attachments}
      />
      <Footer />
    </main>
  );
}
