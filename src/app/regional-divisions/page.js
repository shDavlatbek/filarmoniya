import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StaffList from '@/components/StaffList/StaffList';
import { regionalDivisionsContent } from '@/data/regionalDivisions';

export const metadata = {
  title: "Hududiy bo'linmalar — O'zbekiston Davlat Filarmoniyasi",
  description: regionalDivisionsContent.meta.description,
};

export default function RegionalDivisionsPage() {
  return (
    <main>
      <Header />
      <StaffList
        meta={regionalDivisionsContent.meta}
        members={regionalDivisionsContent.members}
      />
      <Footer />
    </main>
  );
}
