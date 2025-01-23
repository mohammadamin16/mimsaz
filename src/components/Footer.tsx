import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>🔎</div>
        <div>Browse</div>
      </div>
      <div>
        <div>📜</div>
        <div>Recent</div>
      </div>
    </div>
  );
};
