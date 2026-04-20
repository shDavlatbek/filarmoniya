import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ContactPage from '@/components/ContactPage/ContactPage';
import { contactInfo, contactMeta, contactSubjects } from '@/data/contact';

export const metadata = {
  title: "Aloqa — O'zbekiston Davlat Filarmoniyasi",
  description: contactMeta.description,
};

export default function Contact() {
  return (
    <main>
      <Header />
      <ContactPage
        meta={contactMeta}
        info={contactInfo}
        subjects={contactSubjects}
      />
      <Footer />
    </main>
  );
}
