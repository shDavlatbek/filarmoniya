'use client';

import { useState } from 'react';
import styles from './ContactPage.module.css';

export default function ContactPage({ meta, info, subjects = [] }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: subjects[0] || '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | sent

  const update = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('sent');
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: subjects[0] || '',
        message: '',
      });
      setTimeout(() => setStatus('idle'), 4000);
    }, 800);
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.brushStroke} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>{meta.eyebrow}</span>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.description}>{meta.description}</p>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.infoInner}>
          <div className={styles.infoCard}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`} aria-hidden="true">
              location_on
            </span>
            <span className={styles.infoLabel}>Manzil</span>
            <span className={styles.infoValue}>
              {info.address.line1}
              <br />
              {info.address.line2}
            </span>
          </div>

          <div className={styles.infoCard}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`} aria-hidden="true">
              call
            </span>
            <span className={styles.infoLabel}>Telefon</span>
            <ul className={styles.infoList}>
              {info.phones.map((p) => (
                <li key={p.value} className={styles.infoListItem}>
                  <span className={styles.infoSub}>{p.label}</span>
                  <a href={p.href} className={styles.infoLink}>{p.value}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.infoCard}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`} aria-hidden="true">
              mail
            </span>
            <span className={styles.infoLabel}>Elektron pochta</span>
            <ul className={styles.infoList}>
              {info.emails.map((m) => (
                <li key={m.value} className={styles.infoListItem}>
                  <span className={styles.infoSub}>{m.label}</span>
                  <a href={m.href} className={styles.infoLink}>{m.value}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.infoCard}>
            <span className={`material-symbols-outlined ${styles.infoIcon}`} aria-hidden="true">
              schedule
            </span>
            <span className={styles.infoLabel}>Ish vaqti</span>
            <ul className={styles.infoList}>
              {info.hours.map((h) => (
                <li key={h.days} className={styles.infoListItem}>
                  <span className={styles.infoSub}>{h.days}</span>
                  <span className={styles.infoValueSmall}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.bodySection}>
        <div className={styles.bodyGrid}>
          <div className={styles.formColumn}>
            <span className={styles.sectionEyebrow}>Xabar yuboring</span>
            <h2 className={styles.sectionTitle}>Bizga yozing</h2>
            <p className={styles.sectionDesc}>
              Forma orqali so'rovingizni qoldiring — 1–2 ish kuni ichida javob beramiz.
            </p>

            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.formRow}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Ism-familiya</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Ism Familiyangizni kiriting"
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Telefon raqam</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+998 __ ___ __ __"
                    className={styles.input}
                  />
                </label>
              </div>

              <div className={styles.formRow}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Elektron pochta</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="sizning@email.uz"
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Murojaat mavzusi</span>
                  <select
                    value={form.subject}
                    onChange={update('subject')}
                    className={styles.select}
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Xabar matni</span>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="So'rovingizni batafsil yozing..."
                  className={styles.textarea}
                />
              </label>

              <div className={styles.formFooter}>
                <p className={styles.formNote}>
                  Forma yuborilgach, ma'lumotlaringiz faqat bog'lanish maqsadida ishlatiladi.
                </p>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? "Yuborilmoqda..." : status === 'sent' ? "Yuborildi ✓" : "Xabarni yuborish"}
                  {status === 'idle' && (
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside className={styles.sideColumn}>
            <div className={styles.socialBox}>
              <span className={styles.sectionEyebrow}>Ijtimoiy tarmoqlar</span>
              <h3 className={styles.socialTitle}>Bizni kuzatib boring</h3>
              <ul className={styles.socialList}>
                {info.social.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={styles.socialLink}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">{s.icon}</span>
                      <span className={styles.socialLabel}>{s.platform}</span>
                      <span className={`material-symbols-outlined ${styles.socialArrow}`} aria-hidden="true">
                        arrow_outward
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.quickInfo}>
              <span className={styles.quickLabel}>Shoshilinch savol?</span>
              <a href={info.phones[0]?.href} className={styles.quickPhone}>
                {info.phones[0]?.value}
              </a>
              <span className={styles.quickNote}>
                {info.hours[0]?.days} — {info.hours[0]?.time}
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapHead}>
          <div>
            <span className={styles.sectionEyebrow}>Joylashuv</span>
            <h2 className={styles.sectionTitle}>Bizni qanday topish mumkin</h2>
          </div>
          <a
            href={info.mapLink}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.mapLink}
          >
            Kengroq xaritada ochish
            <span className="material-symbols-outlined" aria-hidden="true">arrow_outward</span>
          </a>
        </div>
        <div className={styles.mapFrame}>
          <iframe
            src={info.mapEmbed}
            title="Filarmoniya joylashuvi"
            className={styles.map}
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
