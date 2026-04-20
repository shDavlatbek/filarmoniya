import NewsCard from '../NewsCard/NewsCard';
import styles from './NewsList.module.css';

export default function NewsList({ meta, articles }) {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.brushStroke} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{meta.eyebrow}</span>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.description}>{meta.description}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
