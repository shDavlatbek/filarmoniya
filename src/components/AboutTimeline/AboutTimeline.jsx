import styles from './AboutTimeline.module.css';

export default function AboutTimeline({ items }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Tarix</span>
          <h2 className={styles.title}>Bosqichlar</h2>
        </div>

        <ol className={styles.list}>
          {items.map((item, i) => (
            <li key={item.year} className={styles.item}>
              <div className={styles.marker}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className={styles.content}>
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDesc}>{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
