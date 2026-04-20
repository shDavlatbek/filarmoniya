import Link from 'next/link';
import styles from './NewsCard.module.css';

export default function NewsCard({ article }) {
  return (
    <Link href={`/news/${article.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${article.image})` }}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.date}>{article.date}</span>
        <h3 className={styles.articleTitle}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.readMore}>Davomi</span>
          <span className={`material-symbols-outlined ${styles.arrowIcon}`}>
            arrow_outward
          </span>
        </div>
      </div>
    </Link>
  );
}
