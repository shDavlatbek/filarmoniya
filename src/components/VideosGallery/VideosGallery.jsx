'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import styles from './VideosGallery.module.css';

const UZ_MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
];

function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return iso || '';
  const [, y, mo, d] = m;
  return `${parseInt(d, 10)}-${UZ_MONTHS[parseInt(mo, 10) - 1]}, ${y}`;
}

function thumbnailUrl(id) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

function VideoCard({ video, hoveredId, onHover, onOpen }) {
  const isHovered = hoveredId === video.id;
  return (
    <article
      className={`${styles.card} ${video.featured ? styles.cardFeatured : ''}`}
      onMouseEnter={() => onHover(video.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(video.id)}
      onBlur={() => onHover(null)}
    >
      <button
        type="button"
        onClick={() => onOpen(video)}
        className={styles.cardBtn}
        aria-label={`${video.title} — videoni ochish`}
      >
        <div className={styles.thumbWrap}>
          <img
            src={thumbnailUrl(video.youtubeId)}
            alt=""
            className={styles.thumb}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
            }}
          />

          {isHovered && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${video.youtubeId}`}
              title={video.title}
              className={styles.preview}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              frameBorder="0"
              tabIndex={-1}
              aria-hidden="true"
            />
          )}

          <div className={styles.overlay} aria-hidden="true" />

          <div className={styles.playRing} aria-hidden="true">
            <span className="material-symbols-outlined">play_arrow</span>
          </div>

          <span className={styles.durationPill}>{video.duration}</span>

          <span className={styles.categoryTag}>{video.categoryLabel}</span>
        </div>

        <div className={styles.meta}>
          <h2 className={styles.title}>{video.title}</h2>
          {video.subtitle && (
            <p className={styles.subtitle}>{video.subtitle}</p>
          )}
          <div className={styles.metaRow}>
            <span>{formatDate(video.date)}</span>
            <span className={styles.dot} aria-hidden="true">•</span>
            <span>{video.views} ko'rishlar</span>
          </div>
        </div>
      </button>
    </article>
  );
}

export default function VideosGallery({ meta, videos = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [openVideo, setOpenVideo] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return videos;
    return videos.filter((v) => v.category === activeCategory);
  }, [videos, activeCategory]);

  const closeModal = useCallback(() => setOpenVideo(null), []);

  useEffect(() => {
    if (!openVideo) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openVideo, closeModal]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>{meta.eyebrow}</span>
          <h1 className={styles.heroTitle}>{meta.title}</h1>
          <p className={styles.heroDesc}>{meta.description}</p>

          <div className={styles.filters}>
            {categories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setActiveCategory(c.value)}
                className={`${styles.filterBtn} ${
                  activeCategory === c.value ? styles.filterBtnActive : ''
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>Bu toifada videolar hali yo'q.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onOpen={setOpenVideo}
              />
            ))}
          </div>
        )}
      </section>

      {openVideo && (
        <div
          className={styles.modalRoot}
          role="dialog"
          aria-modal="true"
          aria-label={openVideo.title}
          onClick={closeModal}
        >
          <div
            className={styles.modalInner}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className={styles.modalClose}
              aria-label="Yopish"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className={styles.modalFrame}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${openVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={openVideo.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                frameBorder="0"
                className={styles.modalIframe}
              />
            </div>

            <div className={styles.modalMeta}>
              <span className={styles.modalCategory}>{openVideo.categoryLabel}</span>
              <h2 className={styles.modalTitle}>{openVideo.title}</h2>
              {openVideo.subtitle && (
                <p className={styles.modalSubtitle}>{openVideo.subtitle}</p>
              )}
              <div className={styles.modalMetaRow}>
                <span>{formatDate(openVideo.date)}</span>
                <span className={styles.dot} aria-hidden="true">•</span>
                <span>{openVideo.views} ko'rishlar</span>
                <span className={styles.dot} aria-hidden="true">•</span>
                <span>{openVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
