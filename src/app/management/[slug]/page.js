import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StaffDetail from '@/components/StaffDetail/StaffDetail';
import { managementContent } from '@/data/management';

export async function generateStaticParams() {
  return managementContent.members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const member = managementContent.members.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: `${member.fullname} — Rahbariyat | O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi`,
    description: `${member.position}. ${member.description.slice(0, 150)}`,
  };
}

export default async function ManagementMemberPage({ params }) {
  const { slug } = await params;
  const member = managementContent.members.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <main>
      <Header />
      <StaffDetail meta={managementContent.meta} member={member} />
      <Footer />
    </main>
  );
}
