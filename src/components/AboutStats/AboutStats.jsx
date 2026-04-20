import styles from './AboutStats.module.css';

export default function AboutStats({ items }) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.cell}>
            <span className={styles.value}>{item.value}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
