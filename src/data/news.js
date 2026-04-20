export const newsMeta = {
  eyebrow: 'Axborot xizmati',
  title: "So'nggi yangiliklar",
  description:
    "Filarmoniyaning ijodiy va madaniy hayotidan eng so'nggi yangiliklar, intervyular, tahlillar va e'lonlar.",
  category: 'news',
};

export const newsArticles = [
  {
    id: 1,
    slug: 'maestro-valeriy-bilan-suhbat',
    date: 'Oktabr 08, 2024',
    publishedAt: '2024-10-08',
    title: 'Maestro Valeriy bilan suhbat: Maler va konsert sahnasidagi izlanishlar',
    excerpt:
      "Mahler 5-simfoniyasini talqin qilish va katta hajmli asarlarni boshqarish jarayonida his etilgan ijodiy ko'tarilishlar haqida eksklyuziv suhbat.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzF-omxrKlQE-OfrSygmLyszIGzsTI3lxu4xxCU7eSANRlZb-lIp7naq5iXpZWrF-03U_XQMDcV00fVb4nJFTklBq44ar4jB6-vq1-bmyg-XQULESBCtcPdzM_cydcqF-U-GQW4QLE2N_QubeGIOdhnl5Z2nB3n7jwnMUDoEXpwW3onCmENvvewFzoDrJjQ-zE1itTs5ktLIlQYzXD_cqpp7ZGSfSZTLzgJuROn9DFQHD0WBd4seFUobh-fBmH4KsAkt84emreQQ',
    author: { name: 'Aziza Karimova', role: 'Matbuot xizmati' },
    body: [
      { type: 'paragraph', text: "Maestro Valeriy bilan o'tkazilgan ushbu suhbat oktabr oyining boshida, simfonik orkestrning yangi mavsumini ochish arafasida bo'lib o'tdi. Suhbat davomida u Mahler 5-simfoniyasini sahnaga olib chiqishdagi o'ziga xos yondashuvlari, ijro jarayonida his etgan ichki tuyg'ulari va orkestr a'zolari bilan birga olib borgan tayyorgarlik haqida fikr bildirdi." },
      {
        type: 'image',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEKaVxM31zmORCJZfSrkhiTPMKdz9qbsM0owp_cbGXX744EG_mxwKUoORnTUAV9LYnSG55Ce3SRqNyAHxIXuSEXjs7gMgMOj2fOFhakpqmgE_gnjwrydgspKzKBzaEpdvVTTiznF1RyLSHMo_NZlIzzo2Dw2uulJTt8gt4J_XRxQz04u96ySDj0JhLbWc1BrgeitpmkzkYOYjGH0qpE_UgXdsItWAi0xmxAPcbVbK10yugNj0UabUGCeZmidBhRiKHRxBQj7EpYw',
        alt: "Maestro Valeriy repetitsiya paytida",
        caption: "Maestro Valeriy yangi mavsum ochilishi arafasidagi repetitsiyada."
      },
      {
        type: 'quote',
        text: "Mahler asarlari — bu nafaqat partituradagi notalar majmui, balki yashirin hikoya. Har bir takt, har bir pauza alohida ma'noga ega.",
        cite: "Maestro Valeriy"
      },
      { type: 'paragraph', text: "Uning so'zlariga ko'ra, yangi mavsumda orkestr Mahler trilogiyasini bosqichma-bosqich namoyish etishni rejalashtirgan." },
      {
        type: 'gallery',
        images: [
          {
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-G90sWNr6qVVwQQzt9jBP8kEiOxl-EVBjVDfOGwA7PkG8BvujwQA50gGsaH600dtlMVDQx7v9Ax3eYd4492LojX7G2NUjwU77jzawn8LW6QH2aDWkkBnWOw7DPpfL1RzL7T-_DHAlK6viKSu3iKHu1D2BSC-jufKTnhT-bvTJ7k6C4StxP8rKSbIeFaUlFc7Swgnca-z81WaijV3Jw58DtqM72dkLGeYM3gVVwTaGEXp9uYbJJpSGcgvIjtvs2-DvCpTUS7p9eQ',
            alt: 'Bosh zalda repetitsiya',
            caption: '1-skripka guruhi'
          },
          {
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgt5xfwWRGqbz126udnrIgNPmAfyJvWIoCIV7qWEzqhzySI6ZV_W517SKi--RsZbHLL3jjcgA2S7vm3RnXST_4fqdxyPKzngm7OJn2gLo9M1H7unlTIioG23Xzx38GxvCa9wORqPZhOAlHSKa34vGpdRxQ20QI_R7Gy4qwdmgUR49RpJQc_rsCi3wdEdxNBPn9WQhMBnOLJKgJJhryiDxNW_QXcrkHLQ-8AyYuY4Y8UVwwyWrVqHT-1EebnAAAe_2FCmVf1pu9dQ',
            alt: 'Puflama cholg\'ular',
            caption: "Puflama cholg'ular"
          },
          {
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdSTssH5sJvXEP_V3LBIQ8xOv-C1-ADDjGuCq-sRZnd90UqGOKK2yjqzkhRkTcdyWmCPBOeeMk_odD10Q2fIfEX2-s6guwLrWaX-1mVFLM93F4A7YmMIT9Rr-yWzuoxrTesaukLtOnZ8YMGol7pno7VVDioNftnuJcB-kT8qOoAPhsZHHNXRpfBqBSU1fSoTM9tYHHxeOZF4oPsvxew1fWyN3p21oLlkh0EJrjtMiIr91yhOgprRt18yOpXsHUKUE-e_LX3VOcpg',
            alt: 'Zarbli cholg\'ular',
            caption: "Litavralar va zarbli guruh"
          },
        ],
      },
      { type: 'paragraph', text: "Suhbat oxirida maestro yosh dirijyorlar uchun maslahatlar berdi: kundalik mashq, partiturani chuqur o'rganish va o'z ovozingizni topishga sabr — bu uchta narsa har qanday ijrochi uchun asosiy poydevor bo'lishi kerak." },
    ],
  },
  {
    id: 2,
    slug: 'akustik-landshaftlar',
    date: 'Sentabr 29, 2024',
    publishedAt: '2024-09-29',
    title: 'Akustik landshaftlar: ideal tovush uchun loyihalash',
    excerpt:
      "Yangi Aetheric Resonance konsert zali turli simfonik talablarga moslashish uchun o'zgaruvchan akustik geometriyadan qanday foydalanadi.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEKaVxM31zmORCJZfSrkhiTPMKdz9qbsM0owp_cbGXX744EG_mxwKUoORnTUAV9LYnSG55Ce3SRqNyAHxIXuSEXjs7gMgMOj2fOFhakpqmgE_gnjwrydgspKzKBzaEpdvVTTiznF1RyLSHMo_NZlIzzo2Dw2uulJTt8gt4J_XRxQz04u96ySDj0JhLbWc1BrgeitpmkzkYOYjGH0qpE_UgXdsItWAi0xmxAPcbVbK10yugNj0UabUGCeZmidBhRiKHRxBQj7EpYw',
    author: { name: 'Sherzod Mirzayev', role: 'Konsert dasturlari' },
    body: [
      { type: 'paragraph', text: "Aetheric Resonance konsert zali zamonaviy akustik muhandislik yutuqlari asosida loyihalashtirilgan. Zal devorlari turli o'lchamdagi panellar bilan qoplangan bo'lib, ular ovozni aks ettirish va yutish darajasini boshqarishga imkon beradi." },
      {
        type: 'gallery',
        images: [
          {
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBedCx0mrawTHYf9vBohrW30tYgERZ7ZK4dYYKd93w-KrQcqGKArF-t57m5iM0PKGxnzA08uhoTANmoFedNDknhBgxcqZbGGmAsFeODWbSppRIyidVYUf6IGP_AfqxP8omwfkxm9IGFKHeT1aogWyXK7mNKRV6cYld7YPwpkSx1BQIS-HS_dmys64_iBmQc-KrHd3_Uox4w5rsiBsWUTs3-Y1eWsx2XU2jYE57pfPMjddCaQIvGlRmtxVfjltokUFYdv1MP7WpCEQ',
            alt: 'Zal panellari',
            caption: "Akustik panellar konfiguratsiyasi",
          },
          {
            src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD08MNvDphzkuuSAk3b5XQY4zGQQqeCWO2YPXKvIK4rnNq5tKZhGoe5b0vNsc2IOHwhZ0YTu6zlbxonuTG6OX2bG5l560GjcjAWfxXIEXPQ_WtD4nDKHDuokEtoQgWs11Ktf6hsW5wL-6FXFaQSLsW-eh1AtrNAi1ESgQ_y0XDPeyNBBVEeALppTW8-IiJuQ0dakNDe6xHQGDhxH17QhMZoCoRo362cfy1UWl7yU7R6KH6ljBkkYDpay2MpL2FXxRE1rcdeaemhNg',
            alt: 'Zal ko\'rinishi',
            caption: "Sahnaga qaragan ko'rinish",
          },
        ],
      },
      { type: 'paragraph', text: "Mavsum davomida zal turli xil ijrolar — simfonik orkestr, kamera ansambli va vokal dasturlar uchun moslashtiriladi. Har bir konfiguratsiya texnik xizmat tomonidan oldindan tayyorlangan ssenariy bo'yicha sozlanadi." },
      { type: 'paragraph', text: "Loyihaning bosh muhandisi tomonidan berilgan ma'lumotga ko'ra, zal akustikasi mashhur Yevropa konsert zallarining xususiyatlari bilan taqqoslanganda o'ziga xos balandlik va aniqlikka ega." },
    ],
  },
  {
    id: 3,
    slug: 'arxiv-topilmalari',
    date: 'Sentabr 15, 2024',
    publishedAt: '2024-09-15',
    title: "Arxivlardan: 19-asrga oid yo'qolgan qo'lyozmalar topildi",
    excerpt:
      "Filarmoniyaning yerto'la xonalarida o'tkazilgan tartiblash ishlari natijasida 19-asr bastakorining ilgari noma'lum eskizlari topildi.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKXE3_1RbekgD9Hb_wfEQSlO1x0bYpikbWnBgrZju-PXq6-ri4cEpNjueGsfAG3ASzTuh4GFvvvia06xXwBfuXA-WA275U5Zc9j-_hJs1m9a7XCFdG6_Fsldwra2-cLDYvPMBMa_iGds0KNOdm1AAWaHEf8mzh7bEuLrmuAUCRY3FFxNigLosC26Gzt8GNoHhgve-k6qCiwTuCT5aQHEE3_8pvySAwO6u3C6tb7YPAu6dAWhNS4K9G7H637uS_0A5scvFl-8Sl5g',
    author: { name: "Filarmoniya arxivi", role: "Tadqiqot bo'limi" },
    body: [
      "Filarmoniya arxivi xodimlari uzoq vaqtdan beri tegilmagan qutilarni tartiblash davomida noyob topilmaga duch kelishdi. Yetti dona qo'lda yozilgan partitura va ijro yo'riqnomalari aniqlanib, ularning aksariyati 19-asrning oxiriga to'g'ri keladi.",
      "Topilgan hujjatlar hozirda mutaxassislar tomonidan o'rganilmoqda. Dastlabki taxminlarga ko'ra, eskizlar mahalliy bastakorning yangi yo'nalishdagi ishlari bilan bog'liq.",
      "Filarmoniya rahbariyati ushbu topilmalar asosida maxsus konsert dasturini tashkil qilish va keng jamoatchilikka taqdim etishni rejalashtirmoqda.",
    ],
  },
  {
    id: 4,
    slug: 'qishki-festival-eloni',
    date: 'Sentabr 02, 2024',
    publishedAt: '2024-09-02',
    title: "Qishki Solstitsiya festivali: 5–8 dekabr kunlari to'rt kunlik dastur",
    excerpt:
      "Filarmoniya navbatdagi xalqaro festivalini e'lon qildi — sovuq tovush manzaralari va sanoat akustikasi mavzusida o'tkaziladi.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBedCx0mrawTHYf9vBohrW30tYgERZ7ZK4dYYKd93w-KrQcqGKArF-t57m5iM0PKGxnzA08uhoTANmoFedNDknhBgxcqZbGGmAsFeODWbSppRIyidVYUf6IGP_AfqxP8omwfkxm9IGFKHeT1aogWyXK7mNKRV6cYld7YPwpkSx1BQIS-HS_dmys64_iBmQc-KrHd3_Uox4w5rsiBsWUTs3-Y1eWsx2XU2jYE57pfPMjddCaQIvGlRmtxVfjltokUFYdv1MP7WpCEQ',
    author: { name: 'Sherzod Mirzayev', role: 'Konsert dasturlari' },
    body: [
      "Festival davomida uchta to'liq orkestr chiqishlari va zal ichki maydoniga moslashtirilgan installyatsiyalar namoyish etiladi. Tashkilotchilar tomoshabinlarni o'ziga xos akustik tajribalarga taklif qiladi.",
      "Festivalning yopilish marosimida xalqaro mehmon dirijyorlar va o'zbek bastakorlarining birgalikdagi premerasi rejalashtirilgan.",
      "Chipta sotuvi 25-noyabrdan boshlanadi. Aksiya doirasida talabalar uchun maxsus chegirmalar ko'zda tutilgan.",
    ],
  },
  {
    id: 5,
    slug: 'yoshlar-orkestri-tanlovi',
    date: 'Avgust 21, 2024',
    publishedAt: '2024-08-21',
    title: "Yoshlar simfonik orkestri uchun tanlov e'lon qilindi",
    excerpt:
      "Iste'dodli yosh musiqachilar uchun yangi tarkibga qabul. Ariza qabuli 1-sentabrdan boshlanadi.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdSTssH5sJvXEP_V3LBIQ8xOv-C1-ADDjGuCq-sRZnd90UqGOKK2yjqzkhRkTcdyWmCPBOeeMk_odD10Q2fIfEX2-s6guwLrWaX-1mVFLM93F4A7YmMIT9Rr-yWzuoxrTesaukLtOnZ8YMGol7pno7VVDioNftnuJcB-kT8qOoAPhsZHHNXRpfBqBSU1fSoTM9tYHHxeOZF4oPsvxew1fWyN3p21oLlkh0EJrjtMiIr91yhOgprRt18yOpXsHUKUE-e_LX3VOcpg',
    author: { name: 'Feruza Abdullayeva', role: "Kadrlar bo'limi" },
    body: [
      "Tanlovda 16–25 yoshdagi musiqachilar ishtirok etishi mumkin. Asosiy maqsad — yangi avlod orkestrini shakllantirish va ularning kasbiy mahoratini xalqaro standartlar darajasiga yetkazish.",
      "Saralash ikki bosqichda o'tkaziladi: birinchisi tarmoq orqali video tarzda, ikkinchisi esa filarmoniya zalida shaxsiy ijro shaklida. Ariza topshirish va batafsil shartlar filarmoniya rasmiy saytida e'lon qilinadi.",
      "Tanlov g'oliblari yangi tashkil etilayotgan Yoshlar simfonik orkestriga qabul qilinishi va o'qish davomida stipendiya bilan ta'minlanishi mumkin.",
    ],
  },
  {
    id: 6,
    slug: 'kamera-ansambli-yangi-mavsum',
    date: 'Avgust 12, 2024',
    publishedAt: '2024-08-12',
    title: "Kamera ansambli yangi mavsumni mumtoz dastur bilan ochadi",
    excerpt:
      "Sentabrdan boshlab kamera zalida har hafta seshanba kechalari bo'lib o'tadigan dasturlar boshlanadi.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgt5xfwWRGqbz126udnrIgNPmAfyJvWIoCIV7qWEzqhzySI6ZV_W517SKi--RsZbHLL3jjcgA2S7vm3RnXST_4fqdxyPKzngm7OJn2gLo9M1H7unlTIioG23Xzx38GxvCa9wORqPZhOAlHSKa34vGpdRxQ20QI_R7Gy4qwdmgUR49RpJQc_rsCi3wdEdxNBPn9WQhMBnOLJKgJJhryiDxNW_QXcrkHLQ-8AyYuY4Y8UVwwyWrVqHT-1EebnAAAe_2FCmVf1pu9dQ',
    author: { name: 'Aziza Karimova', role: 'Matbuot xizmati' },
    body: [
      "Kamera ansambli yangi mavsumni mumtoz repertuar bilan ochadi: Bach, Mozart va o'zbek bastakorlarining kichik shakldagi asarlari sahnaga olib chiqiladi.",
      "Har bir konsert oldidan kichik leksiya tashkil etiladi — tomoshabinlar asar haqida tarixiy va analitik ma'lumotlarga ega bo'lishadi. Bu yondashuv yangi auditoriyani jalb qilish maqsadida tatbiq etilmoqda.",
      "Ansambl tarkibida torli, puflama va vokal ijrochilar hamkorlikda chiqishlar tashkil qiladilar. Mavsum davomida ko'plab debyutlar kutilmoqda.",
    ],
  },
  {
    id: 7,
    slug: 'xalqaro-tanlovda-galaba',
    date: 'Iyul 30, 2024',
    publishedAt: '2024-07-30',
    title: "Filarmoniya yakkaxon ijrochisi xalqaro tanlovda 1-o'rinni egalladi",
    excerpt:
      "Skripka ijrochiligi bo'yicha Pragada o'tkazilgan xalqaro tanlovda Aria Vance birinchi o'rinni qo'lga kiritdi.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD08MNvDphzkuuSAk3b5XQY4zGQQqeCWO2YPXKvIK4rnNq5tKZhGoe5b0vNsc2IOHwhZ0YTu6zlbxonuTG6OX2bG5l560GjcjAWfxXIEXPQ_WtD4nDKHDuokEtoQgWs11Ktf6hsW5wL-6FXFaQSLsW-eh1AtrNAi1ESgQ_y0XDPeyNBBVEeALppTW8-IiJuQ0dakNDe6xHQGDhxH17QhMZoCoRo362cfy1UWl7yU7R6KH6ljBkkYDpay2MpL2FXxRE1rcdeaemhNg',
    author: { name: 'Aziza Karimova', role: 'Matbuot xizmati' },
    body: [
      "Praga shahrida bo'lib o'tgan an'anaviy xalqaro skripka tanlovida O'zbekiston Davlat Filarmoniyasi konsertmeysteri Aria Vance birinchi o'rinni egalladi. Tanlovda 28 davlatdan 110 ijrochi qatnashgan.",
      "Yakuniy bosqichda ijrochi Bramsning skripka uchun konsertini Praga simfonik orkestri bilan ijro etdi. Hakamlar hay'ati uning texnik mahorati va musiqaviy ifodaviyligini yuqori baholadi.",
      "Filarmoniya rahbariyati ushbu yutuq munosabati bilan ijrochini tabriklab, kelajakda yangi xalqaro loyihalarda ishtirok etish imkoniyatlarini muhokama qilmoqda.",
    ],
  },
  {
    id: 8,
    slug: 'oyna-pavilon-multidisiplinar',
    date: 'Iyul 14, 2024',
    publishedAt: '2024-07-14',
    title: "\"Oyna Pavilon\" — yangi multidisiplinar loyiha sahnaga olib chiqiladi",
    excerpt:
      "Mumtoz musiqa, vizual san'at va zamonaviy raqsni birlashtiradigan loyiha bahorda premerasi taqdim etiladi.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9NqqKZsO4c-TWoq5NwR311CR5VvmA3W-Zkw1-eb3yulr2Bt5zoJhTInXNQYNpy-iu4__JxcONTGV-4PtQacvaOXNMeV-BeUb4t-5mhQAUoKhGgJfAWVc5WLdUjRZj4_OJyWb2-Rb7vCv6xFEcrbGtd1u6hpnY90rs0PGhSrK8YcIFwbRf9TK2v6QuI49DKNLCHEmoiUijA08lLvXJE1tiD3eG2zBe2AVqMCKTWInyGUWnPbtdBmdc0Kb41OIkrMr0PmIn0p0yA',
    author: { name: 'Dilshoda Rahimova', role: 'Badiiy rahbar' },
    body: [
      "\"Oyna Pavilon\" — bu mumtoz musiqaning shaffofligi va zamonaviy san'atning erkinligini birlashtiruvchi loyiha. Sahnada vizual installyatsiyalar va jonli musiqa bir vaqtda namoyish etiladi.",
      "Loyiha bahorgi mavsumda premerasiga tayyorlanmoqda. Repetitsiyalar oktabr oyidan boshlangan va uchta bosqichdan iborat ijodiy jarayon davom etmoqda.",
      "Tashkilotchilar bu format kelajakda yana bir necha boshqa janrlar bilan kengaytirilishini, jumladan teatr va kino bilan birgalikdagi ishlar olib borilishini bildirishdi.",
    ],
  },
];
