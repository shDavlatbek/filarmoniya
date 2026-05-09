import Header from '@/components/Header/HeaderShell';
import Footer from '@/components/Footer/FooterShell';
import DocumentsList from '@/components/DocumentsList/DocumentsList';
import { documentsMeta, getDocuments } from '@/lib/api';

export const metadata = {
  title: "Me'yoriy hujjatlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: documentsMeta.description,
};

export default async function DocumentsPage() {
  const documents = await getDocuments();
  return (
    <main>
      <Header />
      <DocumentsList meta={documentsMeta} documents={documents || []} />
      <Footer />
    </main>
  );
}
