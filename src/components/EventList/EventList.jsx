import styles from './EventList.module.css';
import { events as EVENTS } from '@/data/events';

export default function EventList() {
  return (
    <section className={styles.section}>
      {/* Editorial Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.seasonLabel}>Joriy mavsum</span>
          <h1 className={styles.title}>Konsert va <br/>teleshoular</h1>
          {/* <p className={styles.description}>
            A curated exploration of spatial audio and classical brutalism. Experience the intersection of physical sound and digital precision.
          </p> */}
        </div>
        
        <div className={styles.viewAllWrapper}>
          <a href="#" className={styles.viewAllBtn}>
            Barchasini ko'rish <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
          </a>
        </div>
      </header>

      {/* Asymmetric Event Grid */}
      <div className={styles.grid}>
        {EVENTS.map((evt, index) => {
          // Asymmetric column mapping for Desktop
          // 0 = Featured (8 col)
          // 1, 2 = Standard (4 col)
          // 3 = Text Heavy (8 col)
          // 4, 5, 6 = Standard (4 col)
          let gridClass = styles.col4;
          if (index === 0) gridClass = styles.col8;
          if (index === 3) gridClass = styles.col8;
          
          const isFeatured = index === 0;

          if (evt.isTextHeavy) {
            return (
              <article key={evt.id} className={`${styles.card} ${styles.cardTextHeavy} ${gridClass}`}>
                <div className={styles.bgMonth}>{evt.month}</div>
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
                  <div className={styles.meta}>
                    <div className={styles.date}>{evt.month} {evt.dateValue}</div>
                    <div className={styles.hallLabel}>{evt.label}</div>
                  </div>
                  <h2 className={styles.eventTitle}>{evt.title}</h2>
                  <p className={styles.eventDesc}>{evt.desc}</p>
                  <span className={styles.ctaTextHeavy}>
                    View Schedule <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </span>
                </div>
              </article>
            );
          }

          return (
            <article key={evt.id} className={`${styles.card} ${isFeatured ? styles.cardFeatured : styles.cardStandard} ${gridClass}`}>
              <div className={styles.imgBox}>
                <img src={evt.img} alt={evt.title} className={styles.image} loading="lazy" />
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <div className={styles.date}>{evt.month} <span className={styles.dateAccent}>{evt.dateValue}</span></div>
                  {isFeatured && <div className={styles.hallLine}></div>}
                  <div className={styles.hallLabel}>{evt.label}</div>
                </div>
                <h3 className={styles.eventTitle}>{evt.title}</h3>
                <p className={styles.eventDesc}>{evt.desc}</p>
                <div className={styles.cta}>
                  <span className={styles.ctaText}>{isFeatured ? 'Reserve Access' : 'View Details'}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
