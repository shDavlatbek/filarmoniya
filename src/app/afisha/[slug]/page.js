import { redirect } from 'next/navigation';

export default async function AfishaSlugRedirect({ params }) {
  const { slug } = await params;
  redirect(`/concerts/${slug}`);
}
