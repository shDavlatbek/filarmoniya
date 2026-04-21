import Link from 'next/link';
import styles from './EventList.module.css';
import { afishaEvents as EVENTS } from '@/data/afisha';

export default function EventList() {
  return (
    <section className={styles.section}>
      {/* Editorial Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.seasonLabel}>Joriy mavsum</span>
          <h1 className={styles.title}>Konsert va <br/>teleshoular</h1>
        </div>

        <div className={styles.viewAllWrapper}>
          <Link href="/concerts" className={styles.viewAllBtn}>
            Barchasini ko'rish <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
          </Link>
        </div>
      </header>

      {/* Asymmetric Event Grid */}
      <div className={styles.grid}>
        {EVENTS.map((evt, index) => {
          const isFeatured = index === 0;
          const gridClass = isFeatured ? styles.col8 : styles.col4;

          return (
            <Link
              key={evt.id}
              href={`/concerts/${evt.slug}`}
              className={`${styles.card} ${isFeatured ? styles.cardFeatured : styles.cardStandard} ${gridClass}`}
            >
              <div className={styles.imgBox}>
                <img src={evt.image} alt={evt.title} className={styles.image} loading="lazy" />
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <div className={styles.date}>
                    {evt.monthShort} <span className={styles.dateAccent}>{evt.day}</span>
                  </div>
                  {isFeatured && <div className={styles.hallLine}></div>}
                  <div className={styles.hallLabel}>{evt.venue}</div>
                </div>
                <h3 className={styles.eventTitle}>{evt.title}</h3>
                <p className={styles.eventDesc}>{evt.excerpt}</p>
                <div className={styles.cta}>
                  <span className={styles.ctaText}>{isFeatured ? 'Chiptani band qilish' : 'Batafsil'}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
