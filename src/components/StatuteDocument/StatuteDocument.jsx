import styles from './StatuteDocument.module.css';

export default function StatuteDocument({ chapters, attachments }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <aside className={styles.toc} aria-label="Mundarija">
          <span className={styles.tocLabel}>Mundarija</span>
          <ol className={styles.tocList}>
            {chapters.map((chapter) => (
              <li key={chapter.id} className={styles.tocItem}>
                <a href={`#${chapter.id}`} className={styles.tocLink}>
                  <span className={styles.tocNum}>{chapter.number}</span>
                  <span className={styles.tocTitle}>{chapter.title}</span>
                </a>
              </li>
            ))}
          </ol>

          {attachments?.length > 0 && (
            <div className={styles.attachments}>
              <span className={styles.tocLabel}>Yuklab olish</span>
              <ul className={styles.attachList}>
                {attachments.map((file) => (
                  <li key={file.label}>
                    <a href={file.href} className={styles.attachLink}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        download
                      </span>
                      <span className={styles.attachText}>
                        <span className={styles.attachLabel}>{file.label}</span>
                        <span className={styles.attachSize}>{file.size}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <article className={styles.document}>
          {chapters.map((chapter) => (
            <section key={chapter.id} id={chapter.id} className={styles.chapter}>
              <header className={styles.chapterHeader}>
                <span className={styles.chapterNumber}>{chapter.number}</span>
                <h2 className={styles.chapterTitle}>{chapter.title}</h2>
              </header>

              <ol className={styles.articles}>
                {chapter.articles.map((article) => (
                  <li key={article.number} className={styles.article}>
                    <span className={styles.articleNumber}>{article.number}.</span>
                    <div className={styles.articleBody}>
                      {article.intro && (
                        <p className={styles.articleIntro}>{article.intro}</p>
                      )}
                      {article.intro ? (
                        <ul className={styles.articleList}>
                          {article.paragraphs.map((p, i) => (
                            <li key={i} className={styles.articleListItem}>
                              {p}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        article.paragraphs.map((p, i) => (
                          <p key={i} className={styles.articleParagraph}>
                            {p}
                          </p>
                        ))
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </article>
      </div>
    </section>
  );
}
