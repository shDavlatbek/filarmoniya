'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { navItems, languages } from '@/data/navigation';

/* Shared inner bar — used in both headers */
function HeaderBar({ menuOpen, setMenuOpen, langOpen, setLangOpen, currentLang, setCurrentLang, isSticky }) {
  return (
    <div className={styles.container}>
      {/* Logo */}
      <Link href="/" className={`${styles.logo} ${menuOpen ? styles.hiddenWhenOpen : ''}`}>
        <Image src="/images/logo.webp" alt="O'zbekiston Davlat Filarmoniyasi" width={220} height={50} className={styles.logoImage} />
      </Link>

      {/* Inline Nav */}
      <nav className={`${styles.inlineNav} ${menuOpen ? styles.hiddenWhenOpen : ''}`}>
        {navItems.map((item, i) => {
          if (item.children) {
            return (
              <div key={item.label} className={`${styles.inlineNavDropdownGroup} ${styles[`navItem${i}`]}`}>
                <button className={`${item.active ? styles.activeLink : styles.link} ${styles.inlineNavDropdownBtn}`}>
                  {item.label}
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', marginLeft: '2px' }}>expand_more</span>
                </button>
                <div className={styles.inlineNavDropdownMenu}>
                  {item.children.map(child => (
                    <Link key={child.label} href={child.href} className={styles.inlineNavDropdownItem}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`${item.active ? styles.activeLink : styles.link} ${styles[`navItem${i}`]}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right actions */}
      <div className={styles.actions}>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <div className={`${styles.actionGroup} ${menuOpen ? styles.hiddenWhenOpen : ''}`}>
          <a href="#" className={styles.iconLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.96-.64-.34-1 .22-1.58.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.19-.07-.05-.16-.03-.23-.01-.1.02-1.74 1.11-4.92 3.25-.46.32-.88.48-1.26.47-.42-.01-1.22-.24-1.82-.43-.49-.16-.88-.24-.85-.51.02-.14.22-.29.61-.45 2.39-1.04 7.97-3.4 9.38-3.99 1.34-.56 1.62-.66 1.8-.66.04 0 .14.01.21.06.06.04.1.1.11.16.01.07.03.22.01.44z"/>
            </svg>
          </a>
          <a href="#" className={styles.iconLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.23.41.56.22.96.48 1.37.89s.67.81.89 1.37c.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.41 2.23-.22.56-.48.96-.89 1.37s-.81.67-1.37.89c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.41-.56-.22-.96-.48-1.37-.89s-.67-.81-.89-1.37c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.81.41-2.23.22-.56.48-.96.89-1.37s.81-.67 1.37-.89c.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zm0-2.16C8.74 0 8.33.01 7.05.07 5.77.13 4.89.33 4.14.62c-.78.3-1.44.71-2.1 1.37S.92 3.36.62 4.14C.33 4.89.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.16.55 2.91.3.78.71 1.44 1.37 2.1s1.32 1.07 2.1 1.37c.75.29 1.63.49 2.91.55 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.16-.26 2.91-.55.78-.3 1.44-.71 2.1-1.37s1.07-1.32 1.37-2.1c.29-.75.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.16-.55-2.91-.3-.78-.71-1.44-1.37-2.1s-1.32-1.07-2.1-1.37c-.75-.29-1.63-.49-2.91-.55C15.67.01 15.26 0 12 0zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.41-10.46c0 .79-.64 1.43-1.43 1.43s-1.43-.64-1.43-1.43.64-1.43 1.43-1.43 1.43.64 1.43 1.43z"/>
            </svg>
          </a>

          <div className={styles.langWrapper}>
            <button
              className={`${styles.link} ${styles.langBtn}`}
              onClick={() => setLangOpen(!langOpen)}
              onBlur={() => setTimeout(() => setLangOpen(false), 200)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '4px' }}>language</span>
              {currentLang}
              <span className={`material-symbols-outlined ${styles.langChevron}`} style={{ fontSize: '16px', marginLeft: '2px', transform: langOpen ? 'rotate(180deg)' : 'none' }}>expand_more</span>
            </button>
            <div className={`${styles.langMenu} ${langOpen ? styles.langMenuOpen : ''}`}>
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={styles.langMenuItem}
                  onClick={() => {
                    setCurrentLang(lang);
                    setLangOpen(false);
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('Русский');
  const [stickyState, setStickyState] = useState('hidden'); // 'hidden' | 'visible' | 'leaving'
  const [expandedItem, setExpandedItem] = useState(null);
  const wasScrolled = useRef(false);

  const handleScroll = useCallback(() => {
    const isPast = window.scrollY > 200;

    if (isPast && !wasScrolled.current) {
      setStickyState('visible');
      wasScrolled.current = true;
    } else if (!isPast && wasScrolled.current) {
      setStickyState('leaving');
      wasScrolled.current = false;
      setTimeout(() => setStickyState('hidden'), 400);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    let timeoutId;
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      setExpandedItem(null);
      timeoutId = setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.style.removeProperty('--scrollbar-width');
      }, 500); // Wait for CSS transition to complete before enabling scroll
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [menuOpen]);

  const sharedProps = { menuOpen, setMenuOpen, langOpen, setLangOpen, currentLang, setCurrentLang };

  const stickyClasses = [
    styles.stickyHeader,
    stickyState === 'visible' ? styles.stickyVisible : '',
    stickyState === 'leaving' ? styles.stickyLeaving : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* 1. Original transparent header — lives inside the hero */}
      <header className={styles.header}>
        <HeaderBar {...sharedProps} isSticky={false} />
      </header>

      {/* 2. Separate sticky header — fixed, slides down on scroll */}
      <div className={stickyClasses}>
        <HeaderBar {...sharedProps} isSticky={true} />
      </div>

      {/* Full Screen Menu Overlay */}
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.menuOverlayOpen : ''}`}>
        <div className={`${styles.overlayLayout} ${expandedItem ? styles.hasExpanded : ''}`}>
          <nav className={styles.navFull}>
            {navItems.map((item) => (
              <div key={item.label} className={styles.navFullItem}>
                {item.children ? (
                  <>
                    <button
                      className={`${styles.linkFull} ${expandedItem === item.label ? styles.linkFullExpanded : ''}`}
                      onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                    >
                      <span className={styles.innerLink}>
                        {item.label}
                        <span className={`material-symbols-outlined ${styles.chevronMobile}`} style={{ fontSize: '20px', marginLeft: '0.5rem', transform: expandedItem === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>expand_more</span>
                        <span className={`material-symbols-outlined ${styles.chevronDesktop}`} style={{ fontSize: '24px', marginLeft: '1rem', opacity: expandedItem === item.label ? 1 : 0.6, transform: expandedItem === item.label ? 'translateX(4px)' : 'translateX(0)', transition: 'all 0.3s' }}>chevron_right</span>
                      </span>
                    </button>
                    <div className={`${styles.submenu} ${expandedItem === item.label ? styles.submenuOpen : ''}`}>
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href} className={styles.submenuLink} onClick={() => setMenuOpen(false)}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={item.active ? styles.activeLinkFull : styles.linkFull} onClick={() => setMenuOpen(false)}>
                    <span className={styles.innerLink}>
                      {item.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          <div className={styles.desktopSubmenuPanel}>
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div 
                    key={`desktop-${item.label}`} 
                    className={`${styles.desktopSubmenuGroup} ${expandedItem === item.label ? styles.desktopSubmenuGroupActive : ''}`}
                  >
                    {item.children.map((child) => (
                      <Link key={`desktop-child-${child.label}`} href={child.href} className={styles.desktopSubmenuLink} onClick={() => setMenuOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )
              }
              return null;
            })}
          </div>
        </div>
        <div className={styles.overlayFooter}>
          <a href="#" className={styles.overlayIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.96-.64-.34-1 .22-1.58.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.19-.07-.05-.16-.03-.23-.01-.1.02-1.74 1.11-4.92 3.25-.46.32-.88.48-1.26.47-.42-.01-1.22-.24-1.82-.43-.49-.16-.88-.24-.85-.51.02-.14.22-.29.61-.45 2.39-1.04 7.97-3.4 9.38-3.99 1.34-.56 1.62-.66 1.8-.66.04 0 .14.01.21.06.06.04.1.1.11.16.01.07.03.22.01.44z"/></svg>
            Telegram
          </a>
          <a href="#" className={styles.overlayIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.23.41.56.22.96.48 1.37.89s.67.81.89 1.37c.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.41 2.23-.22.56-.48.96-.89 1.37s-.81.67-1.37.89c-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.41-.56-.22-.96-.48-1.37-.89s-.67-.81-.89-1.37c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.81.41-2.23.22-.56.48-.96.89-1.37s.81-.67 1.37-.89c.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zm0-2.16C8.74 0 8.33.01 7.05.07 5.77.13 4.89.33 4.14.62c-.78.3-1.44.71-2.1 1.37S.92 3.36.62 4.14C.33 4.89.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.16.55 2.91.3.78.71 1.44 1.37 2.1s1.32 1.07 2.1 1.37c.75.29 1.63.49 2.91.55 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.16-.26 2.91-.55.78-.3 1.44-.71 2.1-1.37s1.07-1.32 1.37-2.1c.29-.75.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.16-.55-2.91-.3-.78-.71-1.44-1.37-2.1s-1.32-1.07-2.1-1.37c-.75-.29-1.63-.49-2.91-.55C15.67.01 15.26 0 12 0zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.41-10.46c0 .79-.64 1.43-1.43 1.43s-1.43-.64-1.43-1.43.64-1.43 1.43-1.43 1.43.64 1.43 1.43z"/></svg>
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
