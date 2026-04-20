'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './TeamList.module.css';
import HalftoneCanvas from '../HalftoneCanvas/HalftoneCanvas';
import { teamMembers, teamFilters, teamMeta } from '@/data/team';

export default function TeamList() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleMembers = useMemo(() => {
    if (activeFilter === 'all') return teamMembers;
    return teamMembers.filter((m) => m.category === activeFilter);
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
          <p className={styles.description}>{teamMeta.description}</p>
        </header>
      </div>

      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          {teamFilters.map((filter) => (
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
                key={member.id}
                href={`/${teamMeta.category}/${member.slug}`}
                className={styles.card}
              >
                <div className={styles.imgWrapper}>
                  <img
                    src={member.img}
                    alt={member.name}
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.imgOverlay}></div>
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
