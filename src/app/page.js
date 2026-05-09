import Header from "@/components/Header/HeaderShell";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import NewsSection from "@/components/NewsSection/NewsSection";
import EventList from "@/components/EventList/EventList";
import TeamList from "@/components/TeamList/TeamList";
import Partners from "@/components/Partners/Partners";
import Footer from "@/components/Footer/FooterShell";
import {
  getAfishaEvents,
  getNewsArticles,
  getPartners,
  getManagement,
  getCentralApparatus,
} from "@/lib/api";

export default async function Home() {
  const [afishaEvents, newsArticles, partners, managementContent, centralApparatusContent] =
    await Promise.all([
      getAfishaEvents(),
      getNewsArticles(),
      getPartners(),
      getManagement(),
      getCentralApparatus(),
    ]);

  return (
    <main>
      <Header />
      <HeroSlider events={afishaEvents || []} />
      <NewsSection articles={newsArticles || []} />
      <EventList events={afishaEvents || []} />
      <TeamList
        limit={8}
        hideFilters={true}
        managementContent={managementContent}
        centralApparatusContent={centralApparatusContent}
      />
      <Partners partners={partners || []} />
      <Footer />
    </main>
  );
}
