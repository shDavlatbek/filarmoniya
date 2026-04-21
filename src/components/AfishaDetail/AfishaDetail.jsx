import Link from 'next/link';
import styles from './AfishaDetail.module.css';

export default function AfishaDetail({ event, related = [] }) {
  return (
    <article className={styles.article}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroInner}>
          <Link href="/concerts" className={styles.backLink}>
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            Konsertlar
          </Link>

          <div className={styles.heroBody}>
            <span className={styles.category}>{event.categoryLabel}</span>
            <h1 className={styles.title}>{event.title}</h1>
            {event.subtitle && (
              <p className={styles.subtitle}>{event.subtitle}</p>
            )}

            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Sana</span>
                <span className={styles.metaValue}>
                  {event.day} {event.month} {event.year}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Boshlanish</span>
                <span className={styles.metaValue}>{event.time}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Sahna</span>
                <span className={styles.metaValue}>{event.venue}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Davomiyligi</span>
                <span className={styles.metaValue}>{event.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.bodyGrid}>
          <div className={styles.bodyContent}>
            <p className={styles.lede}>{event.excerpt}</p>
            <div className={styles.content}>
              {event.about?.map((p, i) => (
                <p key={i} className={styles.paragraph}>{p}</p>
              ))}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.ticketBox}>
              <span className={styles.ticketLabel}>Chipta narxi</span>
              <span className={styles.ticketPrice}>{event.price}</span>
              <a href="#" className={styles.ticketBtn}>
                Chiptani band qilish
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_outward
                </span>
              </a>
            </div>

            <dl className={styles.infoList}>
              {event.conductor && (
                <div className={styles.infoRow}>
                  <dt className={styles.infoLabel}>Ijro</dt>
                  <dd className={styles.infoValue}>{event.conductor}</dd>
                </div>
              )}
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>Toifa</dt>
                <dd className={styles.infoValue}>{event.categoryLabel}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>Sahna</dt>
                <dd className={styles.infoValue}>{event.venue}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle}>Boshqa tadbirlar</h2>
              <Link href="/concerts" className={styles.relatedAll}>
                Barchasini ko'rish
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/concerts/${r.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImageWrap}>
                    <img
                      src={r.image}
                      alt={r.title}
                      className={styles.relatedImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedCategory}>{r.categoryLabel}</span>
                    <h3 className={styles.relatedCardTitle}>{r.title}</h3>
                    <span className={styles.relatedDate}>
                      {r.day} {r.month} — {r.time} / {r.venue}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
