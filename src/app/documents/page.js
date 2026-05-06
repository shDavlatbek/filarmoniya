import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import DocumentsList from '@/components/DocumentsList/DocumentsList';
import { documents, documentsMeta } from '@/data/documents';

export const metadata = {
  title: "Me'yoriy hujjatlar — O'zbekiston Davlat Filarmoniyasi Qashqadaryo viloyat bo'linmasi",
  description: documentsMeta.description,
};

export default function DocumentsPage() {
  return (
    <main>
      <Header />
      <DocumentsList meta={documentsMeta} documents={documents} />
      <Footer />
    </main>
  );
}
