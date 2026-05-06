import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { footerContent } from '@/data/footer';
import { navItems } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <img
                  src="/images/logo.webp"
                  alt="Filarmoniya Logo"
                  className={styles.logoImage}
                  loading="lazy"
                />
              </div>
              {/* <span className={styles.brandName}>{footerContent.brand}</span> */}
            </Link>
            <div className={styles.contactInfo}>
              <p>{footerContent.address}</p>
              <p>{footerContent.phone}</p>
              <p>{footerContent.email}</p>
            </div>
          </div>
          
          <div className={styles.navSection}>
            <div className={styles.navColumn}>
              <h4 className={styles.columnTitle}>Menyu</h4>
              <ul className={styles.navList}>
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.label}>
                    <Link href={item.href === '#' && item.children ? item.children[0].href : item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.navColumn}>
              <h4 className={styles.columnTitle}>Qo'shimcha</h4>
              <ul className={styles.navList}>
                {navItems.slice(5).map((item) => (
                  <li key={item.label}>
                    <Link href={item.href === '#' && item.children ? item.children[0].href : item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.navColumn}>
              <h4 className={styles.columnTitle}>Havolalar</h4>
              <ul className={styles.navList}>
                {footerContent.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>{footerContent.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
