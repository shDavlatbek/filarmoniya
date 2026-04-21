import Link from 'next/link';
import styles from './TeamsList.module.css';

export default function TeamsList({ meta, teams = [] }) {
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
        <ul className={styles.grid}>
          {teams.map((team) => (
            <li key={team.id} className={styles.cardWrap}>
              <Link href={`/teams/${team.slug}`} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img
                    src={team.image}
                    alt={team.name}
                    className={styles.image}
                    loading="lazy"
                  />
                  <span className={styles.founded}>
                    <span className={styles.foundedLabel}>Tashkil etilgan</span>
                    <span className={styles.foundedYear}>{team.founded}</span>
                  </span>
                </div>

                <div className={styles.content}>
                  <span className={styles.genre}>{team.genre}</span>
                  <h2 className={styles.name}>{team.name}</h2>
                  <p className={styles.excerpt}>{team.excerpt}</p>

                  <dl className={styles.infoRow}>
                    <div className={styles.infoItem}>
                      <dt className={styles.infoLabel}>Badiiy rahbar</dt>
                      <dd className={styles.infoValue}>{team.directedBy}</dd>
                    </div>
                    <div className={styles.infoItem}>
                      <dt className={styles.infoLabel}>Tarkib</dt>
                      <dd className={styles.infoValue}>{team.membersCount}</dd>
                    </div>
                  </dl>

                  <span className={styles.cta}>
                    Batafsil
                    <span className="material-symbols-outlined" aria-hidden="true">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
