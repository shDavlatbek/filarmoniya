export const navItems = [
  { label: 'BOSH SAHIFA', href: '/' },
  {
    label: 'FILARMONIYA',
    href: '#',
    children: [
      { label: 'Muassasa haqida', href: '/about' },
      { label: 'Muassasa nizomi', href: '/statute' },
      { label: 'Rahbariyat', href: '/management' },
      { label: 'Markaziy apparat', href: '/central-apparatus' },
    ],
  },
  {
    label: 'AXBOROT XIZMATI',
    href: '#',
    children: [
      { label: 'Yangiliklar', href: '/news' },
      { label: 'Konsertlar', href: '/concerts' },
      { label: 'Yoshlar siyosati', href: '/youth-politics' },
      // { label: "Ma'lumotlar infografikasi", href: '/infographics' },
      { label: 'Videolavhalar', href: '/videos' },
    ],
  },
  {
    label: 'IJODIY JAMOALAR',
    href: '/teams',
    children: [
      { label: 'Barcha jamoalar', href: '/teams' },
      { label: 'Simfonik orkestr', href: '/teams/simfonik-orkestr' },
      { label: 'Kamer orkestri', href: '/teams/kamer-orkestri' },
      { label: "Xalq cholg'ulari", href: '/teams/xalq-cholgulari-jamoasi' },
      { label: 'Davlat xori', href: '/teams/davlat-xori' },
      { label: 'Opera solistlari', href: '/teams/opera-solistlari' },
    ],
  },
  {
    label: 'XALQARO ALOQALAR',
    href: '#',
    children: [
      { label: 'Memorandumlar', href: '/memorandums' },
      { label: "Qo'shma konsertlar", href: '/international-concerts' },
      { label: 'Xalqaro tanlovlar', href: '/competitions' },
    ],
  },
  { label: 'AFISHA', href: '/afisha' },
  { label: 'PRESS-RELIZ', href: '/press-releases' },
  { label: "ME'YORIY HUJJATLAR", href: '/documents' },
  { label: "OCHIQ MA'LUMOTLAR", href: '/open-data' },
  { label: 'ALOQA', href: '/contact' },
];

export const languages = ["O'zbek", 'Русский', 'English'];
