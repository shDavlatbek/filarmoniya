import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StaffList from '@/components/StaffList/StaffList';
import { managementContent } from '@/data/management';

export const metadata = {
  title: "Rahbariyat — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: managementContent.meta.description,
};

export default function ManagementPage() {
  return (
    <main>
      <Header />
      <StaffList meta={managementContent.meta} members={managementContent.members} />
      <Footer />
    </main>
  );
}
