import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StatuteHero from '@/components/StatuteHero/StatuteHero';
import StatuteDocument from '@/components/StatuteDocument/StatuteDocument';
import { youthPoliticsContent } from '@/data/youthPolitics';

export const metadata = {
  title: "Yoshlar siyosati — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description:
    "Filarmoniyada yoshlarga oid davlat siyosatini amalga oshirish, iste'dodli yoshlarni qo'llab-quvvatlash va xalqaro hamkorlik to'g'risida nizom.",
};

export default function YouthPoliticsPage() {
  return (
    <main>
      <Header />
      <StatuteHero data={youthPoliticsContent.meta} />
      <StatuteDocument
        chapters={youthPoliticsContent.chapters}
        attachments={youthPoliticsContent.attachments}
      />
      <Footer />
    </main>
  );
}
