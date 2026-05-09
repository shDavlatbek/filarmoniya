import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import TeamsList from '@/components/TeamsList/TeamsList';
import { getTeams, teamsMeta } from '@/lib/api';

export const metadata = {
  title: "Ijodiy jamoalar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: teamsMeta.description,
};

export default async function TeamsPage() {
  const teams = await getTeams();
  return (
    <main>
      <Header />
      <TeamsList meta={teamsMeta} teams={teams || []} />
      <Footer />
    </main>
  );
}
