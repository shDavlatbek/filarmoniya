'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import styles from './HeroSlider.module.css';

function parseEventDate(evt) {
  if (evt.starts_at) {
    const d = new Date(evt.starts_at);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
}

function getCountdown(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}

export default function HeroSlider({ events = [] }) {
  const SLIDES = events.slice(0, 5);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const update = () => {
      const result = {};
      SLIDES.forEach((evt) => {
        const target = parseEventDate(evt);
        if (target) result[evt.id] = getCountdown(target);
      });
      setCountdowns(result);
    };

    update();
    const timer = setInterval(update, 60000); // update every minute
    return () => clearInterval(timer);
  }, [events]);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <section className={styles.heroSection}>
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        onSlideChange={handleSlideChange}
        className={styles.swiperContainer}
      >
        {SLIDES.map((evt) => {
          const cd = countdowns[evt.id];

          return (
            <SwiperSlide key={evt.id}>
              <div className={styles.slideInner}>
                <div
                  className={styles.bgImage}
                  style={{ backgroundImage: `url(${evt.image})` }}
                />
                <div className={styles.overlay} />

                <div className={styles.content}>
                  <div className={styles.textContent}>
                    <h1 className={styles.title}>{evt.title}</h1>

                    {/* {evt.subtitle && (
                      <p className={styles.subtitle}>{evt.subtitle}</p>
                    )} */}

                    <p className={styles.dateLine}>
                      {evt.day} {evt.month} {evt.year}, {evt.time} — {evt.venue}
                    </p>

                    {cd && (
                      <p className={styles.timer}>
                        {cd.days} kun : {String(cd.hours).padStart(2, '0')} soat : {String(cd.minutes).padStart(2, '0')} daqiqa qoldi
                      </p>
                    )}

                    <Link href={`/concerts/${evt.slug}`} className={styles.cta}>
                      Batafsil ko'rish
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div className={styles.controls}>
          <button ref={prevRef} className={styles.navBtn} aria-label="Oldingi">
            <span className={`material-symbols-outlined ${styles.arrow}`}>arrow_back</span>
          </button>

          <div className={styles.slideCounter}>
            <span className={styles.slideCounterCurrent}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className={styles.slideCounterSep}>/</span>
            <span className={styles.slideCounterTotal}>
              {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          <button ref={nextRef} className={styles.navBtn} aria-label="Keyingi">
            <span className={`material-symbols-outlined ${styles.arrow}`}>arrow_forward</span>
          </button>
        </div>
      </Swiper>
    </section>
  );
}
