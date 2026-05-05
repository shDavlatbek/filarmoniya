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
        <span className={styles.dateBadge}>
          <span className={`material-symbols-outlined ${styles.dateIcon}`}>
            calendar_today
          </span>
          {article.date}
        </span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.articleTitle}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
      </div>
    </Link>
  );
}
