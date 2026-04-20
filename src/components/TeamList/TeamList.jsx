'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './TeamList.module.css';
import HalftoneCanvas from '../HalftoneCanvas/HalftoneCanvas';
import { managementContent } from '@/data/management';
import { centralApparatusContent } from '@/data/centralApparatus';
import { regionalDivisionsContent } from '@/data/regionalDivisions';

const SOURCES = [
  managementContent,
  centralApparatusContent,
  regionalDivisionsContent,
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

export default function TeamList() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleMembers = useMemo(() => {
    if (activeFilter === 'all') return ALL_MEMBERS;
    return ALL_MEMBERS.filter((m) => m._category === activeFilter);
  }, [activeFilter]);

  return (
    <section className={styles.section}>
      <HalftoneCanvas />
      <div className={styles.headerContainer}>
        <header className={styles.headerContent}>
          <h2 className={styles.title}>
            Bizning
            <span className={styles.titleAccent}> Jamoa</span>
          </h2>
          <p className={styles.description}>
            Filarmoniya rahbariyati, markaziy apparat va hududiy bo'linmalar — bir ko'rinishda. Har bir xodimning batafsil ma'lumotini bir bosish bilan ko'ring.
          </p>
        </header>
      </div>

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
                <div className={styles.imgWrapper}>
                  <img
                    src={member.img}
                    alt={member.fullname}
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.imgOverlay}></div>
                </div>
                <span className={styles.categoryTag}>{member._categoryLabel}</span>
                <h3 className={styles.name}>{member.fullname}</h3>
                <p className={styles.role}>{member.position}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
