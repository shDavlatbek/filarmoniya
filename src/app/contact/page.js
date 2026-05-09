import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import ContactPage from '@/components/ContactPage/ContactPage';
import { contactMeta, getContactInfo, getContactSubjects } from '@/lib/api';

export const metadata = {
  title: "Aloqa — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: contactMeta.description,
};

export default async function Contact() {
  const [info, subjects] = await Promise.all([
    getContactInfo(),
    getContactSubjects(),
  ]);
  return (
    <main>
      <Header />
      <ContactPage meta={contactMeta} info={info} subjects={subjects || []} />
      <Footer />
    </main>
  );
}
