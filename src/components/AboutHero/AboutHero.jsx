import styles from './AboutHero.module.css';

export default function AboutHero({ data }) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className={styles.overlay} />
      <div className={styles.brushStroke} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>{data.eyebrow}</span>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </div>
    </section>
  );
}
