import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TeamDetail from '@/components/TeamDetail/TeamDetail';
import { teams } from '@/data/teams';

export async function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) return {};
  return {
    title: `${team.name} — O'zbekiston Davlat Filarmoniyasi`,
    description: team.excerpt,
    openGraph: {
      title: team.name,
      description: team.excerpt,
      images: [team.image],
      type: 'article',
    },
  };
}

export default async function TeamDetailPage({ params }) {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) notFound();

  return (
    <main>
      <Header />
      <TeamDetail team={team} />
      <Footer />
    </main>
  );
}
