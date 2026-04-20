import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StaffDetail from '@/components/StaffDetail/StaffDetail';
import { regionalDivisionsContent } from '@/data/regionalDivisions';

export async function generateStaticParams() {
  return regionalDivisionsContent.members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = regionalDivisionsContent.members.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: `${member.fullname} — Hududiy bo'linmalar | O'zbekiston Davlat Filarmoniyasi`,
    description: `${member.position}. ${member.description.slice(0, 150)}`,
  };
}

export default async function RegionalDivisionMemberPage({ params }) {
  const { slug } = await params;
  const member = regionalDivisionsContent.members.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <main>
      <Header />
      <StaffDetail meta={regionalDivisionsContent.meta} member={member} />
      <Footer />
    </main>
  );
}
