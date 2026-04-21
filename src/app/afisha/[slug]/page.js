import { redirect } from 'next/navigation';
import { afishaEvents } from '@/data/afisha';

export async function generateStaticParams() {
  return afishaEvents.map((e) => ({ slug: e.slug }));
}

export default async function AfishaSlugRedirect({ params }) {
  const { slug } = await params;
  redirect(`/concerts/${slug}`);
}
