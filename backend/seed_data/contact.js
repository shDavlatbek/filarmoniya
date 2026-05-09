export const contactMeta = {
  eyebrow: 'Aloqa',
  title: "Biz bilan bog'laning",
  description:
    "Savollaringiz, takliflaringiz yoki hamkorlik bo'yicha murojaatlaringiz uchun quyidagi manzillardan foydalaning. Biz siz bilan bog'lanishdan mamnun bo'lamiz.",
};

export const contactInfo = {
  address: {
    line1: "Toshkent shahri, Mustaqillik maydoni 1-uy",
    line2: "100047, O'zbekiston Respublikasi",
  },
  phones: [
    { label: "Kotibiyat", value: '+998 71 123 45 67', href: 'tel:+998711234567' },
    { label: "Matbuot xizmati", value: '+998 71 123 45 68', href: 'tel:+998711234568' },
    { label: "Chipta markazi", value: '+998 71 123 45 69', href: 'tel:+998711234569' },
  ],
  emails: [
    { label: "Umumiy savollar", value: 'info@filarmoniya.uz', href: 'mailto:info@filarmoniya.uz' },
    { label: "Matbuot", value: 'press@filarmoniya.uz', href: 'mailto:press@filarmoniya.uz' },
    { label: "Hamkorlik", value: 'partners@filarmoniya.uz', href: 'mailto:partners@filarmoniya.uz' },
  ],
  hours: [
    { days: 'Dushanba — Juma', time: '09:00 — 18:00' },
    { days: 'Shanba', time: '10:00 — 16:00' },
    { days: 'Yakshanba', time: "Dam olish kuni" },
  ],
  social: [
    { platform: 'Telegram', icon: 'send', href: 'https://t.me/filarmoniya' },
    { platform: 'Instagram', icon: 'photo_camera', href: 'https://instagram.com/filarmoniya' },
    { platform: 'YouTube', icon: 'smart_display', href: 'https://youtube.com/@filarmoniya' },
    { platform: 'Facebook', icon: 'public', href: 'https://facebook.com/filarmoniya' },
  ],
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=69.2357%2C41.3070%2C69.2527%2C41.3170&layer=mapnik&marker=41.312000%2C69.244200',
  mapLink:
    'https://www.openstreetmap.org/?mlat=41.312&mlon=69.2442#map=17/41.312/69.2442',
  coordinates: { lat: 41.312, lng: 69.2442 },
};

export const contactSubjects = [
  'Umumiy savol',
  'Matbuot so\'rovi',
  'Hamkorlik takliflari',
  'Ish joyi bo\'yicha',
  'Chipta xaridi',
  'Boshqa',
];
