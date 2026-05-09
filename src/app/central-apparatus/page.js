import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import StaffList from '@/components/StaffList/StaffList';
import { getCentralApparatus } from '@/lib/api';

export async function generateMetadata() {
  const data = await getCentralApparatus();
  return {
    title: "Markaziy apparat — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
    description: data?.meta?.description,
  };
}

export default async function CentralApparatusPage() {
  const data = await getCentralApparatus();
  return (
    <main>
      <Header />
      <StaffList meta={data.meta} members={data.members} />
      <Footer />
    </main>
  );
}
