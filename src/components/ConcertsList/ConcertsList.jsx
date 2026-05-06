'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import styles from './ConcertsList.module.css';
import { afishaFilters } from '@/data/afisha';

export default function ConcertsList({ meta, events = [] }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (activeFilter !== 'all' && e.category !== activeFilter) return false;
      if (!q) return true;
      return [e.title, e.subtitle, e.venue, e.conductor, e.categoryLabel]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [events, activeFilter, query]);

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
                placeholder="Konsert nomi, ijrochi yoki sahnani qidirish..."
                className={styles.searchInput}
                aria-label="Konsertlarni qidirish"
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

            <div className={styles.filters}>
              {afishaFilters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActiveFilter(f.value)}
                  className={`${styles.filterBtn} ${
                    activeFilter === f.value ? styles.filterBtnActive : ''
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.countLine}>
            <span>
              {filtered.length} / {events.length} ta konsert
            </span>
          </div>

          {filtered.length === 0 ? (
            <p className={styles.empty}>
              So'rov bo'yicha konsert topilmadi.
            </p>
          ) : (
            <ul className={styles.grid}>
              {filtered.map((event) => (
                <li key={event.id} className={styles.card}>
                  <Link
                    href={`/concerts/${event.slug}`}
                    className={styles.cardInner}
                  >
                    <div className={styles.imageWrap}>
                      <img
                        src={event.image}
                        alt={event.title}
                        className={styles.image}
                        loading="lazy"
                      />
                      <span className={styles.dateStamp}>
                        <span className={styles.stampDay}>{event.day}</span>
                        <span className={styles.stampMonth}>{event.monthShort}</span>
                      </span>
                      <span className={styles.categoryBadge}>
                        {event.categoryLabel}
                      </span>
                    </div>

                    <div className={styles.body2}>
                      <h2 className={styles.cardTitle}>{event.title}</h2>
                      {event.subtitle && (
                        <p className={styles.cardSubtitle}>{event.subtitle}</p>
                      )}

                      <dl className={styles.infoList}>
                        <div className={styles.infoRow}>
                          <dt className={styles.infoLabel}>
                            <span className="material-symbols-outlined" aria-hidden="true">
                              schedule
                            </span>
                          </dt>
                          <dd className={styles.infoValue}>
                            {event.time} • {event.month} {event.year}
                          </dd>
                        </div>
                        <div className={styles.infoRow}>
                          <dt className={styles.infoLabel}>
                            <span className="material-symbols-outlined" aria-hidden="true">
                              location_on
                            </span>
                          </dt>
                          <dd className={styles.infoValue}>{event.venue}</dd>
                        </div>
                        {event.conductor && (
                          <div className={styles.infoRow}>
                            <dt className={styles.infoLabel}>
                              <span className="material-symbols-outlined" aria-hidden="true">
                                person
                              </span>
                            </dt>
                            <dd className={styles.infoValue}>{event.conductor}</dd>
                          </div>
                        )}
                      </dl>

                      <div className={styles.cardFooter}>
                        <span className={styles.priceTag}>
                          {/* {event.price} */}
                        </span>
                        <span className={styles.cta}>
                          Batafsil
                          <span className="material-symbols-outlined" aria-hidden="true">
                            arrow_forward
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
