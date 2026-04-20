import React from 'react';
import styles from './Footer.module.css';
import { footerContent } from '@/data/footer';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>{footerContent.brand}</div>
        <div className={styles.links}>
          {footerContent.links.map((link) => (
            <a key={link.label} className={styles.linkItem} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className={styles.copyright}>{footerContent.copyright}</div>
      </div>
    </footer>
  );
}
