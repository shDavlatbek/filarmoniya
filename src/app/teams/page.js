import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TeamsList from '@/components/TeamsList/TeamsList';
import { teams, teamsMeta } from '@/data/teams';

export const metadata = {
  title: "Ijodiy jamoalar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: teamsMeta.description,
};

export default function TeamsPage() {
  return (
    <main>
      <Header />
      <TeamsList meta={teamsMeta} teams={teams} />
      <Footer />
    </main>
  );
}
