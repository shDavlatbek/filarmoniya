import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AboutHero from '@/components/AboutHero/AboutHero';
import AboutIntro from '@/components/AboutIntro/AboutIntro';
import AboutStats from '@/components/AboutStats/AboutStats';
import AboutTimeline from '@/components/AboutTimeline/AboutTimeline';
import AboutMission from '@/components/AboutMission/AboutMission';
import AboutLeadership from '@/components/AboutLeadership/AboutLeadership';
import AboutCTA from '@/components/AboutCTA/AboutCTA';
import { aboutContent } from '@/data/about';

export const metadata = {
  title: "Biz haqimizda — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description:
    "O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi — mumtoz musiqa, milliy meros va zamonaviy sahna san'ati markazi. Tarix, missiya va rahbariyat.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutHero data={aboutContent.hero} />
      <AboutIntro data={aboutContent.intro} />
      <AboutStats items={aboutContent.stats} />
      <AboutTimeline items={aboutContent.milestones} />
      <AboutMission data={aboutContent.mission} />
      {/* <AboutLeadership data={aboutContent.leadership} /> */}
      <AboutCTA data={aboutContent.cta} />
      <Footer />
    </main>
  );
}
