import styles from './AboutLeadership.module.css';

export default function AboutLeadership({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.description}>{data.description}</p>
        </div>

        <div className={styles.grid}>
          {data.members.map((member) => (
            <article key={member.id} className={styles.card}>
              <div className={styles.imgWrapper}>
                <img
                  src={member.img}
                  alt={member.name}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
