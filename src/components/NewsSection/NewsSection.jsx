import styles from './NewsSection.module.css';
import { newsArticles as articles } from '@/data/news';

export default function NewsSection() {
  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>So'nggi Yangiliklar</h3>
        <div className={styles.viewAllWrapper}>
          <a href="#" className={styles.viewAllBtn}>
            Barchasini ko'rish <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
          </a>
        </div>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <article key={article.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <div 
                  className={styles.image} 
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                {/* <div className={styles.tag}>{article.tag}</div> */}
              </div>
              <div className={styles.content}>
                <span className={styles.date}>{article.date}</span>
                <h4 className={styles.articleTitle}>{article.title}</h4>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.footer}>
                  <span className={styles.readMore}>Davomi</span>
                  <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_outward</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreBtn}>
            Ko'proq Yuklash 
            <span className={`material-symbols-outlined ${styles.loadMoreIcon}`}>expand_more</span>
          </button>
        </div>
      </div>
    </section>
  );
}
