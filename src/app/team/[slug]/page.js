import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StaffDetail from '@/components/StaffDetail/StaffDetail';
import { teamMembers, teamMeta } from '@/data/team';

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: `${member.fullname} — Bizning jamoa | O'zbekiston Davlat Filarmoniyasi`,
    description: `${member.position}. ${member.description.slice(0, 150)}`,
  };
}

export default async function TeamMemberPage({ params }) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <main>
      <Header />
      <StaffDetail meta={{ ...teamMeta, title: 'Bizning jamoa' }} member={member} />
      <Footer />
    </main>
  );
}
