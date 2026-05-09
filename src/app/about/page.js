import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import AboutHero from '@/components/AboutHero/AboutHero';
import AboutIntro from '@/components/AboutIntro/AboutIntro';
import AboutStats from '@/components/AboutStats/AboutStats';
import AboutTimeline from '@/components/AboutTimeline/AboutTimeline';
import AboutMission from '@/components/AboutMission/AboutMission';
import { getAboutPage } from '@/lib/api';

export const metadata = {
  title: "Biz haqimizda — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description:
    "O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi — mumtoz musiqa, milliy meros va zamonaviy sahna san'ati markazi. Tarix va missiya.",
};

export default async function AboutPage() {
  const aboutContent = await getAboutPage();
  if (!aboutContent) {
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
      <AboutHero data={aboutContent.hero} />
      <AboutIntro data={aboutContent.intro} />
      <AboutStats items={aboutContent.stats} />
      <AboutTimeline items={aboutContent.milestones} />
      <AboutMission data={aboutContent.mission} />
      <Footer />
    </main>
  );
}
