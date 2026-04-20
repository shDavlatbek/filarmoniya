export const navItems = [
  { label: 'BOSH SAHIFA', href: '/', active: true },
  {
    label: 'FILARMONIYA',
    href: '#',
    children: [
      { label: 'Muassasa haqida', href: '/about' },
      { label: 'Muassasa nizomi', href: '/statute' },
      { label: 'Rahbariyat', href: '/management' },
      { label: 'Markaziy apparat', href: '/central-apparatus' },
      { label: "Hududiy bo'linmalar", href: '/regional-divisions' },
    ],
  },
  {
    label: 'AXBOROT XIZMATI',
    href: '#',
    children: [
      { label: 'Yangiliklar', href: '/news' },
      { label: 'Konsertlar', href: '/concerts' },
      { label: 'Yoshlar siyosati', href: '/youth-politics' },
      { label: "Ma'lumotlar infografikasi", href: '/infographics' },
      { label: 'Videolavhalar', href: '/videos' },
    ],
  },
  {
    label: 'IJODIY JAMOALAR',
    href: '#',
    children: [
      { label: 'Ijodiy jamoa 1', href: '/teams/some-team' },
    ],
  },
  {
    label: 'XALQARO ALOQALAR',
    href: '#',
    children: [
      { label: 'Memorandumlar', href: '/memorandums' },
      { label: "Qo'shma konsertlar", href: '/concerts' },
      { label: 'Xalqaro tanlovlar', href: '/competitions' },
    ],
  },
  { label: 'AFISHA', href: '/afisha' },
  { label: "ME'YORIY HUJJATLAR", href: '/documents' },
  { label: "OCHIQ MA'LUMOTLAR", href: '/open-data' },
  { label: 'ALOQA', href: '/contact' },
];

export const languages = ["O'zbek", 'Русский', 'English'];
