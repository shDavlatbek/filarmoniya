import Link from 'next/link';
import styles from './AboutCTA.module.css';

export default function AboutCTA({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.description}>{data.description}</p>
        <div className={styles.actions}>
          <Link href={data.primary.href} className={styles.primary}>
            {data.primary.label}
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
          <Link href={data.secondary.href} className={styles.secondary}>
            {data.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
