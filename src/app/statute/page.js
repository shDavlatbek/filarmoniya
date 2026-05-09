import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import StatuteHero from '@/components/StatuteHero/StatuteHero';
import StatuteDocument from '@/components/StatuteDocument/StatuteDocument';
import { getStatute } from '@/lib/api';

export const metadata = {
  title: "Muassasa nizomi — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description:
    "O'zbekiston Respublikasi Madaniyat vazirligi huzuridagi O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi to'g'risida nizom — to'liq matn, boblar va moddalar.",
};

export default async function StatutePage() {
  const statuteContent = await getStatute();
  if (!statuteContent) {
    return (
      <main>
        <Header />
        <Footer />
      </main>
    );
  }
  return (
    <main>
      <Header />
      <StatuteHero data={statuteContent.meta} />
      <StatuteDocument
        chapters={statuteContent.chapters || []}
        attachments={statuteContent.attachments || []}
      />
      <Footer />
    </main>
  );
}
