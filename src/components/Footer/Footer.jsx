import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>Aetheric Resonance</div>
        <div className={styles.links}>
          <a className={styles.linkItem} href="#">Mahfiylik siyosati</a>
          <a className={styles.linkItem} href="#">Xizmat ko'rsatish shartlari</a>
          <a className={styles.linkItem} href="#">Matbuot</a>
          <a className={styles.linkItem} href="#">Aloqa</a>
        </div>
        <div className={styles.copyright}>
          © 2024 Aetheric Resonance. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
}
