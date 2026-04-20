'use client';

import { useMemo, useState } from 'react';
import styles from './DocumentsList.module.css';

const UZ_MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
];

function formatDate(iso) {
  if (!iso) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const [, year, month, day] = m;
  return `${day}-${UZ_MONTHS[Number(month) - 1]}, ${year}`;
}

export default function DocumentsList({ meta, documents = [] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter((doc) => {
      const haystack = [
        doc.title,
        doc.type,
        doc.documentNumber,
        doc.format,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [documents, query]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.brushStroke} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>{meta.eyebrow}</span>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.description}>{meta.description}</p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.bodyInner}>
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <span
                className={`material-symbols-outlined ${styles.searchIcon}`}
                aria-hidden="true"
              >
                search
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Hujjat nomi, raqami yoki turini qidirish..."
                className={styles.searchInput}
                aria-label="Hujjatlarni qidirish"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className={styles.clearBtn}
                  aria-label="Qidiruvni tozalash"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    close
                  </span>
                </button>
              )}
            </div>
            <span className={styles.count}>
              {filtered.length} / {documents.length} hujjat
            </span>
          </div>

          {filtered.length === 0 ? (
            <p className={styles.empty}>
              Qidiruv bo'yicha hujjat topilmadi.
            </p>
          ) : (
            <ul className={styles.list}>
              {filtered.map((doc) => (
                <li key={doc.id} className={styles.item}>
                  <div className={styles.formatBadge}>{doc.format}</div>

                  <div className={styles.itemBody}>
                    <div className={styles.itemMeta}>
                      <span className={styles.itemType}>{doc.type}</span>
                      {doc.documentNumber && (
                        <>
                          <span className={styles.dotSep} aria-hidden="true">•</span>
                          <span className={styles.itemNumber}>
                            № {doc.documentNumber}
                          </span>
                        </>
                      )}
                    </div>
                    <h2 className={styles.itemTitle}>{doc.title}</h2>
                    <div className={styles.itemFooter}>
                      <span>{formatDate(doc.date)}</span>
                      {doc.size && (
                        <>
                          <span className={styles.dotSep} aria-hidden="true">•</span>
                          <span>{doc.size}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <a
                    href={doc.url || '#'}
                    download
                    className={styles.downloadBtn}
                    aria-label={`${doc.title} — yuklab olish`}
                  >
                    <span>Yuklab olish</span>
                    <span className="material-symbols-outlined" aria-hidden="true">
                      download
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
