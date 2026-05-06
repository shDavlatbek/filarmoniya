'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './TeamList.module.css';
import { managementContent } from '@/data/management';
import { centralApparatusContent } from '@/data/centralApparatus';

const SOURCES = [
  managementContent,
  centralApparatusContent,
];

const ALL_MEMBERS = SOURCES.flatMap((source) =>
  source.members.map((m) => ({
    ...m,
    _category: source.meta.category,
    _categoryLabel: source.meta.title,
  })),
);

const FILTERS = [
  { value: 'all', label: 'Hamma' },
  ...SOURCES.map((s) => ({ value: s.meta.category, label: s.meta.title })),
];

export default function TeamList({ limit, hideFilters = false }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleMembers = useMemo(() => {
    let members = ALL_MEMBERS;
    if (activeFilter !== 'all') {
      members = members.filter((m) => m._category === activeFilter);
    }
    if (limit) {
      members = members.slice(0, limit);
    }
    return members;
  }, [activeFilter, limit]);

  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>Bizning Jamoamiz bilan tanishing</h2>
      </div>

      {/* Category filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`${styles.filterBtn} ${activeFilter === filter.value ? styles.active : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.gridArea}>
        {visibleMembers.length === 0 ? (
          <p className={styles.empty}>Ushbu yo'nalishda hozircha a'zolar yo'q.</p>
        ) : (
          <div className={styles.grid}>
            {visibleMembers.map((member) => (
              <Link
                key={`${member._category}-${member.slug}`}
                href={`/${member._category}/${member.slug}`}
                className={styles.card}
              >
                <div className={styles.avatarWrapper}>
                  <img
                    src={member.img}
                    alt={member.fullname}
                    className={styles.avatar}
                    loading="lazy"
                  />
                </div>
                <h3 className={styles.name}>{member.fullname}</h3>
                <p className={styles.role}>{member.position}</p>
                <span className={styles.categoryTag}>{member._categoryLabel}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Show All button */}
        {limit && (
          <div className={styles.showAllWrapper}>
            <Link href="/management" className={styles.showAllBtn}>
              Hammasini ko'rish
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                arrow_forward
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
