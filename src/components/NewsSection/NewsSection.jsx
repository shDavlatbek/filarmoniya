import styles from './NewsSection.module.css';

const articles = [
  {
    id: 1,
    tag: 'Intervyu',
    date: 'Oktabr 08, 2024',
    title: 'The Masterclass: Conversations with Maestro Valeriy',
    excerpt: 'An exclusive interview discussing the interpretation of Mahler\'s 5th Symphony and the emotional toll of conducting epic works.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzF-omxrKlQE-OfrSygmLyszIGzsTI3lxu4xxCU7eSANRlZb-lIp7naq5iXpZWrF-03U_XQMDcV00fVb4nJFTklBq44ar4jB6-vq1-bmyg-XQULESBCtcPdzM_cydcqF-U-GQW4QLE2N_QubeGIOdhnl5Z2nB3n7jwnMUDoEXpwW3onCmENvvewFzoDrJjQ-zE1itTs5ktLIlQYzXD_cqpp7ZGSfSZTLzgJuROn9DFQHD0WBd4seFUobh-fBmH4KsAkt84emreQQ'
  },
  {
    id: 2,
    tag: 'Arxitektura',
    date: 'Sentabr 29, 2024',
    title: 'Acoustic Landscapes: Designing for the Perfect Note',
    excerpt: 'How the new Aetheric Resonance hall utilizes variable acoustic geometry to adapt to different symphonic requirements.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEKaVxM31zmORCJZfSrkhiTPMKdz9qbsM0owp_cbGXX744EG_mxwKUoORnTUAV9LYnSG55Ce3SRqNyAHxIXuSEXjs7gMgMOj2fOFhakpqmgE_gnjwrydgspKzKBzaEpdvVTTiznF1RyLSHMo_NZlIzzo2Dw2uulJTt8gt4J_XRxQz04u96ySDj0JhLbWc1BrgeitpmkzkYOYjGH0qpE_UgXdsItWAi0xmxAPcbVbK10yugNj0UabUGCeZmidBhRiKHRxBQj7EpYw'
  },
  {
    id: 3,
    tag: 'Tarix',
    date: 'Sentabr 15, 2024',
    title: 'Unearthing the Archives: Lost Manuscripts Recovered',
    excerpt: 'A remarkable discovery in the philharmonic\'s basement reveals previously unknown sketches by a 19th-century composer.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKXE3_1RbekgD9Hb_wfEQSlO1x0bYpikbWnBgrZju-PXq6-ri4cEpNjueGsfAG3ASzTuh4GFvvvia06xXwBfuXA-WA275U5Zc9j-_hJs1m9a7XCFdG6_Fsldwra2-cLDYvPMBMa_iGds0KNOdm1AAWaHEf8mzh7bEuLrmuAUCRY3FFxNigLosC26Gzt8GNoHhgve-k6qCiwTuCT5aQHEE3_8pvySAwO6u3C6tb7YPAu6dAWhNS4K9G7H637uS_0A5scvFl-8Sl5g'
  }
];

export default function NewsSection() {
  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>So'nggi Yangiliklar</h3>
        <div className={styles.viewAllWrapper}>
          <a href="#" className={styles.viewAllBtn}>
            Barchasini ko'rish <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
          </a>
        </div>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <article key={article.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <div 
                  className={styles.image} 
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                {/* <div className={styles.tag}>{article.tag}</div> */}
              </div>
              <div className={styles.content}>
                <span className={styles.date}>{article.date}</span>
                <h4 className={styles.articleTitle}>{article.title}</h4>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.footer}>
                  <span className={styles.readMore}>Davomi</span>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_outward</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreBtn}>
            Ko'proq Yuklash 
            <span className={`material-symbols-outlined ${styles.loadMoreIcon}`}>expand_more</span>
          </button>
        </div>
      </div>
    </section>
  );
}
