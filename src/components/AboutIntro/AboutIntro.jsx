import styles from './AboutIntro.module.css';

export default function AboutIntro({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* <h2 className={styles.title}>{data.title}</h2> */}
        <div className={styles.body}>
          {data.paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
