'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import styles from './HeroSlider.module.css';
import { heroSlides as slides } from '@/data/hero';

export default function HeroSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className={styles.heroSection}>
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // Re-assign navigation elements after init
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className={styles.swiperContainer}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slideInner}>
              <div 
                className={styles.bgImage} 
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className={styles.overlay} />
              
              <div className={styles.content}>
                <div className={styles.textContent}>
                  <p className={styles.subtext}>{slide.subtext}</p>
                  <h1 className={styles.title}>{slide.title}</h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className={styles.controls}>
          <button ref={prevRef} className={styles.navBtn}>
            <span className={`material-symbols-outlined ${styles.arrow}`}>arrow_back</span> OLDINGI
          </button>
          
          {/* Aesthetic gold brush overlay on the right */}
          <div className={styles.artisticOverlay}></div>
          
          <button ref={nextRef} className={styles.navBtn}>
            KEYINGI <span className={`material-symbols-outlined ${styles.arrow}`}>arrow_forward</span>
          </button>
        </div>
      </Swiper>
    </section>
  );
}
