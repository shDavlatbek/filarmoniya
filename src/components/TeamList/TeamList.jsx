import styles from './TeamList.module.css';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Elias Thorne',
    role: 'Principal Conductor',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq0bTve7jECeanDAWU9h-3AoNrbH3PFUvjC0zXrq8D6caKwDzcbRGNio7WC5kglAn-PlxOrAHMK5okZoQqfOpM0qSglzWOLK-DZz7nqHHKsnx61S78yI6IX79BtM8YMzuiKy5yhX_wR-_aAc-9s-GB0j3qsez9etW9GJ-Dt-qg2hOGcKEJDz5jTBi27XKd9UtXpYf2ZkDaXY33uKvLAjhvBUbBGplcVTOBU9U_wOfzEri5ux2bYP3M3tWtXFe3sDvbQhcVv-_CAg'
  },
  {
    id: 2,
    name: 'Aria Vance',
    role: 'First Chair, Violin',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaeF2gL94Y8InZrivIopQ4HGWzKUjC-0gjlRVVyyNG_jRH1pPgJpf_geSJ0B-3DDz54S5u0soUgylVMzBCqlJIm4AVfHAKfejISBRXK5TtXe0vBlcscdOG3ORoKcIpSHqhUbk3p8H35mS_jhh2g9uAZIL8GolhoodDxPTXNwsrAu8vvakvbKqJ68MgGuzPF9k7Yj9-3BCeuE1HFrquigNZoTOPgaZDWD6wqT9cZbKQ90aNizsKCdiUrkNTA8VTFd-GyWXbWDZbxw'
  },
  {
    id: 3,
    name: 'Julian Reyes',
    role: 'Principal Cello',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKCHWE6Q1VGxZVPH5Y_5JVeNkWxA9zBwV0-JhGLix1eGqR_NNZNBTtvRxc1jXuMQ8_CjA1KRYzVgLEYdVpo5YWRwocBllLT8Vca8181A78kzGQAQZjchf33VDTucztxoEAeI2_xO8F3vcfNpPjPtzll7hLOClr_PooGrIDWnv0sU9Ton0WXLkTy0q2EEvon2JowwiMzbOJXBrbItAHYw7y8e1bGsgobEC9vZ5ZY-EKmp9oF28t0lQbDgOI1E1QpuDdlmkohQIvGQ'
  },
  {
    id: 4,
    name: 'Elena Rostova',
    role: 'Principal Flute',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8GFukjEXrNHV7uEsEvG7MrVPE9PPWzu5ACT3DrNiGeVtvN2lrgbdFbYc8hLcxhat0SPD2pZcH-sUzLfcam_xg0MaoeujskGGFGxH_Ef-DY2Y9ov3YEq-8vkW01pQ0vrN4cz9-spKgSgTPrSdgtActBWOoUQ_6jsU2ZeO9t_pt2DZUPvb8EX44JpywpBs7AIHG6eAtK_npPHm862QkE-COP_fXl1eT7crowpkEmR3-emoPxXBRAgBfPqDk0s2UdWy0buFMG1W99g'
  },
  {
    id: 5,
    name: 'Marcus Lin',
    role: 'Principal Timpani',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDREi64Zw9c5XGm4uXv1VLx6M3WL2R8iPwjWciohp2V3XHFFwOmd-KftXtuWY4mUU9G5eZ1S1cq_2w01wPMy3D8V9frA-OGc11qVlTxzFp9lv7tkOiUSBaoAAsb61eVCcuI7gIvu_i-xX2LZ_ih1Ial8WwLaGK1CpaVGN6f3J_GMpqeRXjzYYUe8aYBU6gHR7JEkOSMJpZU4PsGacVMOcVLXmQp3CVca-SzpJu1IEFd2ZZhhy6Rhj-YHufZ5F5Aaazx8fcGn821A'
  },
  {
    id: 6,
    name: 'Sarah Jenkins',
    role: 'Principal Horn',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZi56QCfYvx9WOBU6v4-shlBYzpVBUd81Ukt0WjYlRXapbjuE_UT2eedLuBe5fjUduRkzX5RD_nh_NeGGcwkWnQvmhL9eo8CowIuTe-fcVXinwzb_nTBQfrqLqS4JemAoNl1D9zgvwejR0tODfoTld7vHjJTMjmH5pkBSDCiKcE5TeBjV3j7QYZnagFQsvQxlTJj_Nf04Pz9sChf96UACinMlzm82FbSUKDMhoCwpKO2c0pQ1gfoQSTRHBjaePrDtasTbOWNaOBA'
  }
];

import HalftoneCanvas from '../HalftoneCanvas/HalftoneCanvas';

export default function TeamList() {
  return (
    <section className={styles.section}>
      <HalftoneCanvas />
      <div className={styles.headerContainer}>
        {/* Decorative background flare */}
        {/* <div className={styles.brushStroke}></div> */}
        
        <header className={styles.headerContent}>
          <h2 className={styles.title}>
            Bizning
            <span className={styles.titleAccent}> Jamoa</span>
          </h2>
          <p className={styles.description}>
            Meet the virtuosos defining the next era of classical performance. A convergence of technical mastery and artistic rebellion.
          </p>
        </header>
      </div>

      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          <button className={`${styles.filterBtn} ${styles.active}`}>Hamma</button>
          <button className={styles.filterBtn}>Rahbariyat</button>
          <button className={styles.filterBtn}>Markaziy apparat</button>
          <button className={styles.filterBtn}>Hududiy bo'linmalar</button>
        </div>
      </div>

      <div className={styles.gridArea}>
        <div className={styles.grid}>
          {TEAM_MEMBERS.map((member) => (
            <article key={member.id} className={styles.card}>
              <div className={styles.imgWrapper}>
                <img 
                  src={member.img} 
                  alt={member.name}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.imgOverlay}></div>
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
