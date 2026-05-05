'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './EventList.module.css';
import { afishaEvents } from '@/data/afisha';

const MONTH_NAMES = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
];

const WEEKDAY_NAMES = ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Ya'];

/* Build a lookup: "YYYY-MM-DD" → [events] */
function buildEventMap(events) {
  const map = {};
  events.forEach((evt) => {
    const monthIndex = MONTH_NAMES.indexOf(evt.month);
    if (monthIndex === -1) return;
    const key = `${evt.year}-${String(monthIndex + 1).padStart(2, '0')}-${evt.day.padStart(2, '0')}`;
    if (!map[key]) map[key] = [];
    map[key].push(evt);
  });
  return map;
}

const EVENT_MAP = buildEventMap(afishaEvents);

/* Get all unique months that have events, sorted */
function getEventMonths() {
  const months = new Set();
  afishaEvents.forEach((evt) => {
    const monthIndex = MONTH_NAMES.indexOf(evt.month);
    if (monthIndex !== -1) months.add(`${evt.year}-${String(monthIndex + 1).padStart(2, '0')}`);
  });
  return Array.from(months).sort();
}

/* Generate calendar grid for a given year/month */
function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Monday = 0, Sunday = 6 (ISO)
  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const days = [];

  // Fill leading blanks
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return days;
}

export default function EventList() {
  // Start with today's month
  const [currentYM, setCurrentYM] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const year = parseInt(currentYM.split('-')[0]);
  const month = parseInt(currentYM.split('-')[1]) - 1;

  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);

  const goToPrevMonth = () => {
    const d = new Date(year, month - 1, 1);
    setCurrentYM(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    const d = new Date(year, month + 1, 1);
    setCurrentYM(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(selectedDate === key ? null : key);
  };

  const hasEvent = (day) => {
    if (!day) return false;
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return !!EVENT_MAP[key];
  };

  /* Events to show: strictly for selected date, or all month events if nothing selected */
  const displayEvents = useMemo(() => {
    if (selectedDate) {
      return EVENT_MAP[selectedDate] || [];
    }
    // Show all events for this month
    return afishaEvents.filter((evt) => {
      const mi = MONTH_NAMES.indexOf(evt.month);
      return mi === month && parseInt(evt.year) === year;
    });
  }, [selectedDate, month, year]);

  /* Find nearest event from today or from selected date */
  const findNearestEvent = () => {
    const allKeys = Object.keys(EVENT_MAP).sort();
    if (allKeys.length === 0) return;

    // Reference date: selected date or today
    const refDate = selectedDate || (() => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    })();

    // Find nearest key
    let nearest = allKeys[0];
    let minDiff = Infinity;
    allKeys.forEach((key) => {
      const diff = Math.abs(new Date(key) - new Date(refDate));
      if (diff < minDiff) {
        minDiff = diff;
        nearest = key;
      }
    });

    // Navigate calendar to that month and select the date
    const [ny, nm] = nearest.split('-');
    setCurrentYM(`${ny}-${nm}`);
    setSelectedDate(nearest);
  };

  const isEmpty = displayEvents.length === 0;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.sectionTitle}>Afisha va Tadbirlar</h2>
          <Link href="/concerts" className={styles.viewAllBtn}>
            Barchasini ko'rish
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </Link>
        </header>

        <div className={styles.layout}>
          {/* ---- Calendar ---- */}
          <div className={styles.calendarPanel}>
            <div className={styles.calendarHeader}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={goToPrevMonth}
                aria-label="Oldingi oy"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className={styles.calendarMonth}>
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                type="button"
                className={styles.navBtn}
                onClick={goToNextMonth}
                aria-label="Keyingi oy"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            <div className={styles.weekdayRow}>
              {WEEKDAY_NAMES.map((w) => (
                <span key={w} className={styles.weekdayCell}>{w}</span>
              ))}
            </div>

            <div className={styles.daysGrid}>
              {calendarDays.map((day, i) => {
                if (day === null) {
                  return <span key={`blank-${i}`} className={styles.dayBlank} />;
                }
                const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isEvent = hasEvent(day);
                const isSelected = selectedDate === key;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    className={`
                      ${styles.dayCell}
                      ${isEvent ? styles.dayCellEvent : ''}
                      ${isSelected ? styles.dayCellSelected : ''}
                    `}
                  >
                    {day}
                    {isEvent && <span className={styles.eventDot} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---- Event Cards ---- */}
          <div className={styles.eventsPanel}>
            {isEmpty ? (
              <div className={styles.emptyState}>
                <span className={`material-symbols-outlined ${styles.emptyIcon}`}>
                  event_busy
                </span>
                <p className={styles.emptyText}>
                  {selectedDate
                    ? 'Tanlangan sana uchun tadbirlar mavjud emas.'
                    : 'Bu oyda tadbirlar mavjud emas.'}
                </p>
                <button
                  type="button"
                  className={styles.findNearestBtn}
                  onClick={findNearestEvent}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    near_me
                  </span>
                  Eng yaqin tadbirni topish
                </button>
              </div>
            ) : (
              <div className={styles.eventsList}>
                {displayEvents.map((evt) => (
                  <Link
                    key={evt.id}
                    href={`/concerts/${evt.slug}`}
                    className={styles.eventCard}
                  >
                    <div className={styles.eventImageBox}>
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className={styles.eventImage}
                        loading="lazy"
                      />
                    </div>

                    <div className={styles.eventInfo}>
                      <div className={styles.eventMeta}>
                        <span className={styles.eventDate}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            calendar_today
                          </span>
                          {evt.day} {evt.month}, {evt.time}
                        </span>
                        <span className={styles.eventVenue}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            location_on
                          </span>
                          {evt.venue}
                        </span>
                      </div>
                      <h3 className={styles.eventTitle}>{evt.title}</h3>
                      <p className={styles.eventExcerpt}>{evt.excerpt}</p>
                      <div className={styles.eventFooter}>
                        <span className={styles.eventCategory}>{evt.categoryLabel}</span>
                        {/* <span className={styles.eventPrice}>{evt.price}</span> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
