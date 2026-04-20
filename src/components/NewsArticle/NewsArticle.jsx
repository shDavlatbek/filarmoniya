import Link from 'next/link';
import NewsCard from '../NewsCard/NewsCard';
import styles from './NewsArticle.module.css';

function renderBlock(block, i) {
  if (typeof block === 'string') {
    return <p key={i} className={styles.paragraph}>{block}</p>;
  }

  switch (block.type) {
    case 'paragraph':
      return <p key={i} className={styles.paragraph}>{block.text}</p>;

    case 'image':
      return (
        <figure key={i} className={styles.figure}>
          <img
            src={block.src}
            alt={block.alt || ''}
            className={styles.figureImg}
            loading="lazy"
          />
          {block.caption && (
            <figcaption className={styles.figureCaption}>{block.caption}</figcaption>
          )}
        </figure>
      );

    case 'gallery':
      return (
        <div
          key={i}
          className={styles.gallery}
          data-count={Math.min(block.images?.length || 0, 4)}
        >
          {block.images?.map((img, j) => (
            <figure key={j} className={styles.galleryItem}>
              <img
                src={img.src}
                alt={img.alt || ''}
                className={styles.galleryImg}
                loading="lazy"
              />
              {img.caption && (
                <figcaption className={styles.figureCaption}>{img.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      );

    case 'quote':
      return (
        <blockquote key={i} className={styles.quote}>
          <p className={styles.quoteText}>{block.text}</p>
          {block.cite && <cite className={styles.quoteCite}>— {block.cite}</cite>}
        </blockquote>
      );

    default:
      return null;
  }
}

export default function NewsArticle({ article, related = [] }) {
  return (
    <article className={styles.article}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${article.image})` }}
      >
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroInner}>
          <Link href="/news" className={styles.backLink}>
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            Yangiliklar
          </Link>

          <div className={styles.heroBody}>
            {article.tag && <span className={styles.tag}>{article.tag}</span>}
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <span className={styles.metaDate}>{article.date}</span>
              {article.author && (
                <span className={styles.metaAuthor}>
                  <span className={styles.metaSep} aria-hidden="true" />
                  {article.author.name}
                  {article.author.role && (
                    <span className={styles.metaRole}> — {article.author.role}</span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.bodyInner}>
          <p className={styles.lede}>{article.excerpt}</p>
          <div className={styles.content}>
            {article.body?.map((block, i) => renderBlock(block, i))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle}>O'xshash yangiliklar</h2>
              <Link href="/news" className={styles.relatedAll}>
                Barchasini ko'rish
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
