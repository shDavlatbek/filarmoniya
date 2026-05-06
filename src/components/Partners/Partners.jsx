import React from 'react';
import styles from './Partners.module.css';
import { partners as PARTNERS } from '@/data/partners';

export default function Partners() {
  // Quadruple the array for seamless infinite loop.
  // The CSS animation translates from 0 to -25% (one set's worth).
  // With 4 copies there is always enough content to fill wide screens.
  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

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
