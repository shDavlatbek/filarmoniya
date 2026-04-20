import Link from 'next/link';
import styles from './StaffList.module.css';

export default function StaffList({ meta, members }) {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.brushStroke} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{meta.eyebrow}</span>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.description}>{meta.description}</p>
        </div>
      </section>

      <section className={styles.list}>
        <div className={styles.grid}>
          {members.map((member) => (
            <Link
              key={member.slug}
              href={`/${meta.category}/${member.slug}`}
              className={styles.card}
            >
              <div className={styles.imgBox}>
                <img
                  src={member.img}
                  alt={member.fullname}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.cardBody}>
                {member.region && (
                  <span className={styles.region}>{member.region}</span>
                )}
                <h2 className={styles.name}>{member.fullname}</h2>
                <p className={styles.position}>{member.position}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.contactLabel}>Qabul kunlari</span>
                  <span className={styles.contactValue}>{member.schedule}</span>
                </div>
                <span className={styles.cta}>
                  Batafsil
                  <span className="material-symbols-outlined" aria-hidden="true">
                    arrow_outward
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
