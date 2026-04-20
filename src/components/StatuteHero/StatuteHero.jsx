import styles from './StatuteHero.module.css';

export default function StatuteHero({ data }) {
  return (
    <section className={styles.hero}>
      <div className={styles.brushStroke} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>{data.eyebrow}</span>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>

        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt className={styles.metaLabel}>Hujjat raqami</dt>
            <dd className={styles.metaValue}>{data.documentNumber}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt className={styles.metaLabel}>Tasdiqlangan sana</dt>
            <dd className={styles.metaValue}>{data.publishedDate}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt className={styles.metaLabel}>Asos</dt>
            <dd className={styles.metaValue}>{data.approvedBy}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
