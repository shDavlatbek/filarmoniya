import Header from "@/components/Header/Header";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import NewsSection from "@/components/NewsSection/NewsSection";
import EventList from "@/components/EventList/EventList";
import TeamList from "@/components/TeamList/TeamList";
import Partners from "@/components/Partners/Partners";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <NewsSection />
      <EventList />
      <TeamList limit={8} hideFilters={true} />
      <Partners />
      <Footer />
    </main>
  );
}
