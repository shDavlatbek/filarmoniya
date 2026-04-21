import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import VideosGallery from '@/components/VideosGallery/VideosGallery';
import { videos, videoCategories, videosMeta } from '@/data/videos';

export const metadata = {
  title: "Videolavhalar — O'zbekiston Davlat Filarmoniyasi",
  description: videosMeta.description,
};

export default function VideosPage() {
  return (
    <main>
      <Header />
      <VideosGallery
        meta={videosMeta}
        videos={videos}
        categories={videoCategories}
      />
      <Footer />
    </main>
  );
}
