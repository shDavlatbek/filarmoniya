import Link from 'next/link';
import styles from './NewsSection.module.css';
import NewsCard from '../NewsCard/NewsCard';
import { newsArticles } from '@/data/news';

const HOME_LIMIT = 6;

export default function NewsSection() {
  const articles = newsArticles.slice(0, HOME_LIMIT);

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>So'nggi Yangiliklar</h3>
          <div className={styles.viewAllWrapper}>
            <Link href="/news" className={styles.viewAllBtn}>
              Barchasini ko'rish
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
