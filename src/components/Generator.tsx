import { useState } from "react";
import { MemeTemplate } from "../App";
import styles from "./Generator.module.css";
import { create_meme, send_to_me } from "../api";

interface GeneratorProps {
  memeTemplate: MemeTemplate;
}

export const Generator: React.FC<GeneratorProps> = (props) => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={imageUrl || props.memeTemplate.url}
        alt={props.memeTemplate.name}
      />
      <div className={styles.input_list}>
        <input
          onChange={(e) => setTopText(e.target.value)}
          placeholder="Top Text"
          value={topText}
        />
        <input
          onChange={(e) => setBottomText(e.target.value)}
          placeholder="Bottom Text"
          value={bottomText}
        />
        {loading && <div>Loading...</div>}
        <button
          onClick={() => {
            send_to_me(imageUrl || props.memeTemplate.url, "311532832");
          }}
        >
          Export
        </button>
        <button
          onClick={() => {
            setLoading(true);
            create_meme(props.memeTemplate.id, topText, bottomText, "123").then(
              (res) => {
                setLoading(false);
                setImageUrl(res.data.url);
                console.log(res.data);
              }
            );
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};
