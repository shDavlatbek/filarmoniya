import Link from 'next/link';
import styles from './TeamDetail.module.css';

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

export default function TeamDetail({ team }) {
  return (
    <article className={styles.article}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${team.image})` }}
      >
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroInner}>
          <Link href="/teams" className={styles.backLink}>
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            Jamoalar
          </Link>

          <div className={styles.heroBody}>
            <span className={styles.genre}>{team.genre}</span>
            <h1 className={styles.title}>{team.name}</h1>

            <dl className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Tashkil etilgan</dt>
                <dd className={styles.metaValue}>{team.founded}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Badiiy rahbar</dt>
                <dd className={styles.metaValue}>{team.directedBy}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Tarkib</dt>
                <dd className={styles.metaValue}>{team.membersCount}</dd>
              </div>
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>Sahna</dt>
                <dd className={styles.metaValue}>{team.homeStage}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.bodyInner}>
          <p className={styles.lede}>{team.excerpt}</p>
          <div className={styles.content}>
            {team.body?.map((block, i) => renderBlock(block, i))}
          </div>
        </div>
      </section>
    </article>
  );
}
