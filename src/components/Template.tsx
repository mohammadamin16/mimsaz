import { theme } from "../App";
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
      <div className={styles.name}

        style={{ color: theme.subtitle_text_color }}
      >{props.name}</div>
      <div className={styles.count}

        style={{ color: theme.hint_color }}
      >{formatNumber(props.uses)} uses</div>
    </div>
  );
};

