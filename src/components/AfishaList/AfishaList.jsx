'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { afishaFilters, afishaEvents } from '@/data/afisha';
import styles from './AfishaList.module.css';

export default function AfishaList({ meta, events = afishaEvents }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter((e) => e.category === activeFilter);
  }, [events, activeFilter]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.brushStroke} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroHead}>
            <div className={styles.heroText}>
              <span className={styles.eyebrow}>{meta.eyebrow}</span>
              <h1 className={styles.title}>{meta.title}</h1>
              <p className={styles.description}>{meta.description}</p>
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
              <button type="button" className={styles.dateBtn}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  calendar_month
                </span>
                <span>Sanani tanlang</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.list}>
          {filtered.length === 0 && (
            <p className={styles.empty}>Ushbu toifada hozircha tadbirlar mavjud emas.</p>
          )}

          {filtered.map((event, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={event.id}
                className={`${styles.item} ${reversed ? styles.itemReversed : ''}`}
              >
                <div className={styles.dateBlock}>
                  <span className={styles.day}>{event.day}</span>
                  <span className={styles.monthLabel}>{event.month}</span>
                  <span className={styles.venueLine}>
                    {event.time} / {event.venue}
                  </span>
                </div>

                <Link
                  href={`/concerts/${event.slug}`}
                  className={styles.imageBlock}
                  aria-label={event.title}
                >
                  <div className={styles.imageOverlay} aria-hidden="true" />
                  <img
                    src={event.image}
                    alt={event.title}
                    className={styles.image}
                    loading="lazy"
                  />
                </Link>

                <div className={styles.contentBlock}>
                  <span className={styles.category}>{event.categoryLabel}</span>
                  <h2 className={styles.eventTitle}>{event.title}</h2>
                  <p className={styles.eventExcerpt}>{event.excerpt}</p>
                  <Link href={`/concerts/${event.slug}`} className={styles.cta}>
                    <span>Chiptalar</span>
                    <span className={styles.ctaLine} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.loadMoreRow}>
          <button type="button" className={styles.loadMore}>
            Ko'proq tadbirlar
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_downward
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
