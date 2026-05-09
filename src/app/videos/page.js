import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import VideosGallery from '@/components/VideosGallery/VideosGallery';
import { getVideoCategories, getVideos, videosMeta } from '@/lib/api';

export const metadata = {
  title: "Videolavhalar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: videosMeta.description,
};

export default async function VideosPage() {
  const [videos, videoCategories] = await Promise.all([
    getVideos(),
    getVideoCategories(),
  ]);
  return (
    <main>
      <Header />
      <VideosGallery
        meta={videosMeta}
        videos={videos || []}
        categories={videoCategories || []}
      />
      <Footer />
    </main>
  );
}
