import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StaffDetail from '@/components/StaffDetail/StaffDetail';
import { centralApparatusContent } from '@/data/centralApparatus';

export async function generateStaticParams() {
  return centralApparatusContent.members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = centralApparatusContent.members.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: `${member.fullname} — Markaziy apparat | O'zbekiston Davlat Filarmoniyasi`,
    description: `${member.position}. ${member.description.slice(0, 150)}`,
  };
}

export default async function CentralApparatusMemberPage({ params }) {
  const { slug } = await params;
  const member = centralApparatusContent.members.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <main>
      <Header />
      <StaffDetail meta={centralApparatusContent.meta} member={member} />
      <Footer />
    </main>
  );
}
