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
              <div className={styles.socialLinks}>
                {footerContent.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon === 'telegram' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    )}
                    {social.icon === 'instagram' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                      </svg>
                    )}
                    {social.icon === 'facebook' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
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
