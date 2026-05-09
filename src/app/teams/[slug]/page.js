import { notFound } from 'next/navigation';
import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import TeamDetail from '@/components/TeamDetail/TeamDetail';
import { getTeam } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const team = await getTeam(slug);
  if (!team) return {};
  return {
    title: `${team.name} — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi`,
    description: team.excerpt,
    openGraph: {
      title: team.name,
      description: team.excerpt,
      images: team.image ? [team.image] : [],
      type: 'article',
    },
  };
}

export default async function TeamDetailPage({ params }) {
  const { slug } = await params;
  const team = await getTeam(slug);
  if (!team) notFound();

  return (
    <main>
      <Header />
      <TeamDetail team={team} />
      <Footer />
    </main>
  );
}
