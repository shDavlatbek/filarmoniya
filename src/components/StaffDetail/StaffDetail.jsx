import Link from 'next/link';
import styles from './StaffDetail.module.css';

const SOCIAL_ICON = {
  Telegram: 'send',
  Instagram: 'photo_camera',
  Facebook: 'facebook',
  YouTube: 'smart_display',
  LinkedIn: 'work',
};

export default function StaffDetail({ meta, member }) {
  return (
    <article className={styles.article}>
      <section className={styles.hero}>
        <div className={styles.brushStroke} />
        <div className={styles.heroInner}>
          <Link href={`/${meta.category}`} className={styles.backLink}>
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            {meta.title}
          </Link>

          <div className={styles.heroGrid}>
            <div className={styles.imgWrap}>
              <img
                src={member.img}
                alt={member.fullname}
                className={styles.image}
              />
            </div>
            <div className={styles.heroBody}>
              {member.region && (
                <span className={styles.region}>{member.region}</span>
              )}
              <h1 className={styles.name}>{member.fullname}</h1>
              <p className={styles.position}>{member.position}</p>
              {member.department && (
                <p className={styles.department}>{member.department}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.bodyGrid}>
          <div className={styles.description}>
            <h2 className={styles.sectionTitle}>Tavsif</h2>
            <p className={styles.descriptionText}>{member.description}</p>
          </div>

          <aside className={styles.contactPanel}>
            <h2 className={styles.sectionTitle}>Aloqa</h2>

            <dl className={styles.detailList}>
              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Qabul kunlari</dt>
                <dd className={styles.detailValue}>{member.schedule}</dd>
              </div>

              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Telefon</dt>
                <dd className={styles.detailValue}>
                  <a href={`tel:${member.contact.phone.replace(/\s/g, '')}`}>
                    {member.contact.phone}
                  </a>
                </dd>
              </div>

              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Email</dt>
                <dd className={styles.detailValue}>
                  <a href={`mailto:${member.contact.email}`}>
                    {member.contact.email}
                  </a>
                </dd>
              </div>

              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Manzil</dt>
                <dd className={styles.detailValue}>{member.address}</dd>
              </div>
            </dl>

            {member.social?.length > 0 && (
              <div className={styles.socialBlock}>
                <span className={styles.detailLabel}>Ijtimoiy tarmoqlar</span>
                <ul className={styles.socialList}>
                  {member.social.map((s) => (
                    <li key={s.platform}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        <span className="material-symbols-outlined" aria-hidden="true">
                          {SOCIAL_ICON[s.platform] || 'link'}
                        </span>
                        {s.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </article>
  );
}
