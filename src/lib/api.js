/**
 * Backend fetch helper. All page-level data is read from this module so the
 * Django admin is the single source of truth.
 *
 * Pages call e.g. `await getNewsArticles()` from a Server Component; results
 * are cached for `revalidate` seconds so the dev experience stays snappy.
 */

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1';

const REVALIDATE = 60;

async function get(path, { params } = {}) {
  const url = new URL(path.replace(/^\//, ''), API_BASE.endsWith('/') ? API_BASE : API_BASE + '/');
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
    }
  }
  const res = await fetch(url, { next: { revalidate: REVALIDATE } });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Backend ${res.status} on ${url}`);
  }
  return res.json();
}

const unwrap = (data) => (data && Array.isArray(data.results) ? data.results : data);

// ===== Site core =====
export async function getSiteSettings() {
  return get('site/settings/');
}
export async function getNavigation() {
  return get('navigation/');
}
export async function getHeroSlides() {
  return get('hero/');
}
export async function getPartners() {
  return get('partners/');
}
export async function getFooter() {
  // Mirror legacy footerContent shape
  const s = await getSiteSettings();
  if (!s) return null;
  return {
    brand: s.brand_full,
    address: s.footer_address,
    phone: s.footer_phone,
    email: s.footer_email,
    socials: s.socials || [],
    links: [],
    copyright: s.copyright_line,
  };
}

// ===== News =====
export async function getNewsArticles() {
  return unwrap(await get('news/'));
}
export async function getNewsArticle(slug) {
  return get(`news/${slug}/`);
}
export const newsMeta = {
  eyebrow: 'Axborot xizmati',
  title: "So'nggi yangiliklar",
  description:
    "Filarmoniyaning ijodiy va madaniy hayotidan eng so'nggi yangiliklar, intervyular, tahlillar va e'lonlar.",
  category: 'news',
};

// ===== Afisha =====
export const afishaMeta = {
  eyebrow: 'Afisha',
  title: 'Afisha',
  description:
    "Yaqinlashib kelayotgan konsert va tomoshalarning tanlab olingan dasturi. Mumtoz klassik va zamonaviy avangard sadolarining uyg'unligini his eting.",
  category: 'afisha',
};
export async function getAfishaFilters() {
  const cats = (await get('afisha/categories/')) || [];
  return [{ value: 'all', label: 'Hamma' }, ...cats];
}
export async function getAfishaEvents() {
  return get('afisha/');
}
export async function getAfishaEvent(slug) {
  return get(`afisha/${slug}/`);
}

// ===== Events (all, includes both afisha-shown and other) =====
export async function getEvents() {
  return get('events/');
}
export async function getEvent(slug) {
  return get(`events/${slug}/`);
}
export const eventFilters = ['Hamma', 'Main Hall', 'Chamber', 'Festival', 'Experimental'];

// ===== Teams =====
export const teamsMeta = {
  eyebrow: 'Ijodiy jamoalar',
  title: "Filarmoniya jamoalari",
  description:
    "Simfonik orkestr, kamer ansambli, xalq cholg'ular jamoasi va boshqa ijodiy jamoalarimiz o'ziga xos uslub va repertuar bilan chiqadi.",
};
export async function getTeams() {
  return get('teams/');
}
export async function getTeam(slug) {
  return get(`teams/${slug}/`);
}

// ===== People =====
export async function getManagement() {
  const members = (await get('management/')) || [];
  return {
    meta: {
      eyebrow: 'Filarmoniya',
      title: 'Rahbariyat',
      description:
        "Filarmoniyaning strategik va ijodiy yo'nalishini belgilaydigan rahbariyat tarkibi. Rasmiy qabul kunlari va aloqa ma'lumotlari.",
      backHref: '/about',
      backLabel: 'Filarmoniya haqida',
      category: 'management',
    },
    members,
  };
}
export async function getManagementMember(slug) {
  return get(`management/${slug}/`);
}
export async function getCentralApparatus() {
  const members = (await get('central-apparatus/')) || [];
  return {
    meta: {
      eyebrow: 'Filarmoniya',
      title: 'Markaziy apparat',
      description:
        "Filarmoniyaning kundalik faoliyatini muvofiqlashtiradigan bosh ofis xodimlari va bo'limlar boshliqlari.",
      backHref: '/about',
      backLabel: 'Filarmoniya haqida',
      category: 'central-apparatus',
    },
    members,
  };
}
export async function getCentralApparatusMember(slug) {
  return get(`central-apparatus/${slug}/`);
}

// ===== About =====
export async function getAboutPage() {
  return get('about/');
}

// ===== Statute & Youth Politics =====
export async function getStatute() {
  return get('statute/');
}
export async function getYouthPolitics() {
  return get('youth-politics/');
}

// ===== Documents / open data / press =====
export const documentsMeta = {
  eyebrow: "Me'yoriy hujjatlar",
  title: "Me'yoriy hujjatlar",
  description:
    "Filarmoniya faoliyatini tartibga soluvchi qonunlar, qarorlar va boshqa rasmiy hujjatlar to'plami.",
  category: 'documents',
};
export const openDataMeta = {
  eyebrow: "Ochiq ma'lumotlar",
  title: "Ochiq ma'lumotlar",
  description:
    "Filarmoniya faoliyatiga oid ochiq ma'lumotlar to'plamlari, hisobotlar va statistik ko'rsatkichlar.",
  category: 'open-data',
};
export const pressReleasesMeta = {
  eyebrow: 'Press-relizlar',
  title: 'Press-relizlar',
  description:
    "Filarmoniya faoliyatiga oid rasmiy press-relizlar, bayonotlar va matbuot xabarlari.",
  category: 'press-releases',
};
export async function getDocuments() {
  return get('documents/');
}
export async function getOpenData() {
  return get('open-data/');
}
export async function getPressReleases() {
  return get('press-releases/');
}

// ===== Videos =====
export const videosMeta = {
  eyebrow: 'Videolavhalar',
  title: 'Kino arxiv',
  description:
    "Filarmoniya sahnasidan konsert yozuvlari, orqa-sahna lavhalari, ijrochi va ustozlar bilan suhbatlar. Har bir asarning o'z hikoyasi bor.",
};
export async function getVideoCategories() {
  const cats = (await get('videos/categories/')) || [];
  return [{ value: 'all', label: 'Barchasi' }, ...cats];
}
export async function getVideos() {
  return get('videos/');
}

// ===== International =====
export const memorandumsMeta = {
  eyebrow: 'Xalqaro aloqalar',
  title: 'Memorandumlar',
  description:
    "Filarmoniya xorijiy madaniyat muassasalari va san'at jamg'armalari bilan imzolagan hamkorlik memorandumlari va kelishuvlari.",
};
export const intlConcertsMeta = {
  eyebrow: 'Xalqaro aloqalar',
  title: "Qo'shma konsertlar",
  description:
    "Xorijiy orkestrlar, solistlar va jamoalar bilan birgalikda olib borilgan konsertlar va qo'shma loyihalar tarixi.",
};
export const competitionsMeta = {
  eyebrow: 'Xalqaro aloqalar',
  title: 'Xalqaro tanlovlar',
  description:
    "Filarmoniya yosh ijrochilari xalqaro tanlovlarda qatnashib, yutuqlar bilan qaytishmoqda. Bu sahifada oxirgi yillar muvaffaqiyatlari jamlangan.",
};
export async function getMemorandums() {
  return get('memorandums/');
}
export async function getIntlConcerts() {
  return get('international-concerts/');
}
export async function getCompetitions() {
  return get('competitions/');
}

// ===== Contact =====
export const contactMeta = {
  eyebrow: 'Aloqa',
  title: "Biz bilan bog'laning",
  description:
    "Savollaringiz, takliflaringiz yoki hamkorlik bo'yicha murojaatlaringiz uchun quyidagi manzillardan foydalaning. Biz siz bilan bog'lanishdan mamnun bo'lamiz.",
};
export async function getContactInfo() {
  return get('contact/');
}
export async function getContactSubjects() {
  const items = (await get('contact/subjects/')) || [];
  return items.map((s) => s.name);
}
