import styles from "./Haeder.module.css";

interface HeaderProps {
  onBack: () => void;
  selectedMeme: string;
}
export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.selectedMeme && (
        <button
          onClick={() => {
            props.onBack();
          }}
        >
          back
        </button>
      )}
      {/* <div>Mimsaz</div> */}
    </div>
  );
};
