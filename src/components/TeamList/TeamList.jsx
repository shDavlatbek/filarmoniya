import styles from './TeamList.module.css';
import HalftoneCanvas from '../HalftoneCanvas/HalftoneCanvas';
import { teamMembers as TEAM_MEMBERS, teamFilters } from '@/data/team';

export default function TeamList() {
  return (
    <section className={styles.section}>
      <HalftoneCanvas />
      <div className={styles.headerContainer}>
        {/* Decorative background flare */}
        {/* <div className={styles.brushStroke}></div> */}
        
        <header className={styles.headerContent}>
          <h2 className={styles.title}>
            Bizning
            <span className={styles.titleAccent}> Jamoa</span>
          </h2>
          <p className={styles.description}>
            Meet the virtuosos defining the next era of classical performance. A convergence of technical mastery and artistic rebellion.
          </p>
        </header>
      </div>

      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          {teamFilters.map((filter, i) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${i === 0 ? styles.active : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.gridArea}>
        <div className={styles.grid}>
          {TEAM_MEMBERS.map((member) => (
            <article key={member.id} className={styles.card}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
