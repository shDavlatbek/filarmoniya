import { notFound } from 'next/navigation';
import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import StaffDetail from '@/components/StaffDetail/StaffDetail';
import { getCentralApparatus, getCentralApparatusMember } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = await getCentralApparatusMember(slug);
  if (!member) return {};
  return {
    title: `${member.fullname} — Markaziy apparat | O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi`,
    description: `${member.position}. ${(member.description || '').slice(0, 150)}`,
  };
}

export default async function CentralApparatusMemberPage({ params }) {
  const { slug } = await params;
  const [member, container] = await Promise.all([
    getCentralApparatusMember(slug),
    getCentralApparatus(),
  ]);
  if (!member) notFound();

  return (
    <main>
      <Header />
      <StaffDetail meta={container.meta} member={member} />
      <Footer />
    </main>
  );
}
