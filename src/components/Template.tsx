import { formatNumber } from "../utils";
import styles from "./Template.module.css";

interface TemplateProps {
  template_id: string;
  uses: number;
  name: string;
  url: string;
  onSelect: (template_id: string) => void;
}

export const Template: React.FC<TemplateProps> = (props) => {
  return (
    <div
      onClick={() => props.onSelect(props.template_id)}
      className={styles.container}
    >
      <img className={styles.image} width={40} height={40} src={props.url} />
      <div className={styles.name}>{props.name}</div>
      <div className={styles.count}>{formatNumber(props.uses)} uses</div>
    </div>
  );
};

// این گروه برای هکاتون ساخت مینی‌اپ ایجاد شده است تا شرکت‌کنندگان بتوانند اینجا با یکدیگر و با برگزارکنندگان هکاتون گفتگو کنند.
