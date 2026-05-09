import React from 'react';
import styles from './Partners.module.css';

export default function Partners({ partners = [] }) {
  if (!partners.length) return null;
  // Quadruple the array for seamless infinite loop.
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Homiylar va Hamkorlar</h3>

      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {duplicatedPartners.map((partner, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardImageBox}>
                <img
                  src={partner.img}
                  alt={partner.name}
                  className={styles.partnerImg}
                  loading="lazy"
                />
              </div>
              <span className={styles.cardName}>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
