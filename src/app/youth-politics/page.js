import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import StatuteHero from '@/components/StatuteHero/StatuteHero';
import StatuteDocument from '@/components/StatuteDocument/StatuteDocument';
import { getYouthPolitics } from '@/lib/api';

export const metadata = {
  title: "Yoshlar siyosati — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description:
    "Filarmoniyada yoshlarga oid davlat siyosatini amalga oshirish, iste'dodli yoshlarni qo'llab-quvvatlash va xalqaro hamkorlik to'g'risida nizom.",
};

export default async function YouthPoliticsPage() {
  const data = await getYouthPolitics();
  if (!data) {
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
      <StatuteHero data={data.meta} />
      <StatuteDocument chapters={data.chapters || []} attachments={data.attachments || []} />
      <Footer />
    </main>
  );
}
