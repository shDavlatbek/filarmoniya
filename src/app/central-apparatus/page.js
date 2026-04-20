import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StaffList from '@/components/StaffList/StaffList';
import { centralApparatusContent } from '@/data/centralApparatus';

export const metadata = {
  title: "Markaziy apparat — O'zbekiston Davlat Filarmoniyasi",
  description: centralApparatusContent.meta.description,
};

export default function CentralApparatusPage() {
  return (
    <main>
      <Header />
      <StaffList
        meta={centralApparatusContent.meta}
        members={centralApparatusContent.members}
      />
      <Footer />
    </main>
  );
}
