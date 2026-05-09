import { getFooter, getNavigation } from '@/lib/api';
import Footer from './Footer';

/** Server component: fetches footer + nav from the backend so the admin's
 * Jazzmin edits propagate everywhere without any prop drilling on pages. */
export default async function FooterShell() {
  const [footerContent, navItems] = await Promise.all([
    getFooter(),
    getNavigation(),
  ]);
  return (
    <Footer
      footerContent={footerContent || undefined}
      navItems={navItems || []}
    />
  );
}
