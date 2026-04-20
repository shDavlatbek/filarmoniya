import styles from './AboutMission.module.css';

export default function AboutMission({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.brushStroke} />
      <div className={styles.container}>
        <span className={styles.quoteMark}>&ldquo;</span>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.text}>{data.text}</p>
      </div>
    </section>
  );
}
