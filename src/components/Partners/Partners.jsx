import React from 'react';
import styles from './Partners.module.css';

const PARTNERS = [
  { name: "Acoustica", img: "https://placehold.co/240x80/transparent/596065.png?text=ACOUSTICA" },
  { name: "SymphonySys", img: "https://placehold.co/240x80/transparent/596065.png?text=SYMPHONYSYS" },
  { name: "Overture", img: "https://placehold.co/240x80/transparent/596065.png?text=OVERTURE" },
  { name: "Crescendo Co.", img: "https://placehold.co/240x80/transparent/596065.png?text=CRESCENDO%20CO" },
  { name: "Harmonics", img: "https://placehold.co/240x80/transparent/596065.png?text=HARMONICS" },
  { name: "Resonance", img: "https://placehold.co/240x80/transparent/596065.png?text=RESONANCE" },
  { name: "Philharmonic Group", img: "https://placehold.co/240x80/transparent/596065.png?text=PHILHARMONIC%20GRP" }
];

export default function Partners() {
  // We duplicate the array to ensure a seamless infinite slider.
  // The CSS animation translates from 0 to -50%. At 50% the second array is perfectly aligned visually where the first array started.
  const duplicatedLogos = [...PARTNERS, ...PARTNERS];

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Bizning Hamkorlar</h3>
      
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {duplicatedLogos.map((partner, idx) => (
            <div key={idx} className={styles.logoBox}>
              <img src={partner.img} alt={partner.name} className={styles.partnerImg} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
