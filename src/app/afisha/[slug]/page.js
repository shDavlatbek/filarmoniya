import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AfishaDetail from '@/components/AfishaDetail/AfishaDetail';
import { afishaEvents } from '@/data/afisha';

const RELATED_LIMIT = 3;

export async function generateStaticParams() {
  return afishaEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = afishaEvents.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.title} — Afisha — O'zbekiston Davlat Filarmoniyasi`,
    description: event.excerpt,
    openGraph: {
      title: event.title,
      description: event.excerpt,
      images: [event.image],
      type: 'article',
    },
  };
}

export default async function AfishaDetailPage({ params }) {
  const { slug } = await params;
  const event = afishaEvents.find((e) => e.slug === slug);
  if (!event) notFound();

  const related = afishaEvents
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
