import { notFound } from 'next/navigation';
import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import AfishaDetail from '@/components/AfishaDetail/AfishaDetail';
import { getAfishaEvent, getAfishaEvents } from '@/lib/api';

const RELATED_LIMIT = 3;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getAfishaEvent(slug);
  if (!event) return {};
  return {
    title: `${event.title} — Konsertlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi`,
    description: event.excerpt,
    openGraph: {
      title: event.title,
      description: event.excerpt,
      images: event.image ? [event.image] : [],
      type: 'article',
    },
  };
}

export default async function ConcertDetailPage({ params }) {
  const { slug } = await params;
  const [event, all] = await Promise.all([getAfishaEvent(slug), getAfishaEvents()]);
  if (!event) notFound();

  const related = (all || [])
    .filter((e) => e.slug !== slug)
    .slice(0, RELATED_LIMIT);

  return (
    <main>
      <Header />
      <AfishaDetail event={event} related={related} />
      <Footer />
    </main>
  );
}
