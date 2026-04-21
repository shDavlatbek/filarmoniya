import styles from './RelationsList.module.css';

function Flag({ code, size = 'md', className = '' }) {
  const sizeClass = size === 'lg' ? styles.flagLg : size === 'sm' ? styles.flagSm : styles.flagMd;
  if (!code) {
    return (
      <span className={`${styles.flagFallback} ${sizeClass} ${className}`} aria-hidden="true">
        <span className="material-symbols-outlined">public</span>
      </span>
    );
  }
  return (
    <span
      className={`fi fi-${code} ${styles.flag} ${sizeClass} ${className}`}
      aria-hidden="true"
    />
  );
}

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

function MemorandumCard({ item }) {
  return (
    <article className={styles.memoCard}>
      <div className={styles.memoHead}>
        <Flag code={item.flagCode} size="lg" />
        <div className={styles.memoHeadText}>
          <span className={styles.country}>{item.country}</span>
          <h2 className={styles.memoTitle}>{item.title}</h2>
        </div>
        <span className={styles.docNumber}>{item.documentNumber}</span>
      </div>
      <p className={styles.memoPartner}>
        <span className={styles.partnerLabel}>Hamkor</span>
        <span>{item.partner}</span>
      </p>
      <p className={styles.summary}>{item.summary}</p>
      <div className={styles.memoFooter}>
        <div className={styles.dateCol}>
          <span className={styles.dateLabel}>Imzolangan</span>
          <span className={styles.dateValue}>{formatDate(item.signedAt)}</span>
        </div>
        <div className={styles.dateCol}>
          <span className={styles.dateLabel}>Amal qilish</span>
          <span className={styles.dateValue}>{formatDate(item.validUntil)}</span>
        </div>
        <a
          href={item.docUrl || '#'}
          className={styles.downloadBtn}
          download
        >
          <span>Yuklab olish</span>
          <span className="material-symbols-outlined" aria-hidden="true">download</span>
        </a>
      </div>
    </article>
  );
}

function ConcertCard({ item }) {
  return (
    <article className={styles.concertCard}>
      <div className={styles.concertImgWrap}>
        <img src={item.image} alt={item.title} className={styles.concertImg} loading="lazy" />
        <span className={styles.flagBadge}>
          <Flag code={item.flagCode} size="sm" />
          <span>{item.country}</span>
        </span>
      </div>
      <div className={styles.concertBody}>
        <span className={styles.concertDate}>{formatDate(item.date)} • {item.venue}</span>
        <h2 className={styles.concertTitle}>{item.title}</h2>
        <span className={styles.partner}>
          <span className={styles.partnerLabel}>Hamkor</span>
          {item.partner}
        </span>
        <p className={styles.summary}>{item.summary}</p>
      </div>
    </article>
  );
}

function CompetitionCard({ item }) {
  return (
    <article className={styles.compCard}>
      <div className={styles.compHead}>
        <span className={styles.yearBlock}>
          <span className={styles.yearLabel}>Yil</span>
          <span className={styles.year}>{item.year}</span>
        </span>
        <div className={styles.compHeadText}>
          <span className={styles.country}>
            <Flag code={item.flagCode} size="sm" className={styles.flagInline} />
            {item.city}, {item.country}
          </span>
          <h2 className={styles.compTitle}>{item.name}</h2>
          <span className={styles.compCategory}>{item.category}</span>
        </div>
      </div>
      <div className={styles.laureateList}>
        <span className={styles.laureateHeading}>Laureatlar</span>
        <ul>
          {item.laureates?.map((l, i) => (
            <li key={i} className={styles.laureateRow}>
              <span className={styles.laureateName}>{l.name}</span>
              <span className={styles.laureateAward}>{l.award}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

const RENDERERS = {
  memorandums: MemorandumCard,
  concerts: ConcertCard,
  competitions: CompetitionCard,
};

const LAYOUTS = {
  memorandums: styles.listColumn,
  concerts: styles.gridTwo,
  competitions: styles.gridTwo,
};

export default function RelationsList({ meta, items = [], kind }) {
  const Card = RENDERERS[kind];
  const layoutClass = LAYOUTS[kind] || styles.listColumn;

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

      <section className={styles.body}>
        <div className={`${styles.container} ${layoutClass}`}>
          {items.length === 0 ? (
            <p className={styles.empty}>Yozuvlar mavjud emas.</p>
          ) : (
            items.map((item) => <Card key={item.id} item={item} />)
          )}
        </div>
      </section>
    </>
  );
}
