import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import StaffList from '@/components/StaffList/StaffList';
import { getManagement } from '@/lib/api';

export async function generateMetadata() {
  const data = await getManagement();
  return {
    title: "Rahbariyat — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
    description: data?.meta?.description,
  };
}

export default async function ManagementPage() {
  const data = await getManagement();
  return (
    <main>
      <Header />
      <StaffList meta={data.meta} members={data.members} />
      <Footer />
    </main>
  );
}
