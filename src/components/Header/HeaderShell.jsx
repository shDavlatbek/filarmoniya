import { getNavigation } from '@/lib/api';
import Header from './Header';

const FALLBACK_LANGS = ["O'zbek", 'Русский', 'English'];

/** Server component: fetches navigation from the backend, renders the
 * client Header with that data. Pages just `import HeaderShell from
 * '@/components/Header/HeaderShell'` — same call site, real data. */
export default async function HeaderShell() {
  const navItems = (await getNavigation()) || [];
  return <Header navItems={navItems} languages={FALLBACK_LANGS} />;
}
