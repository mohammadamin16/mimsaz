import { useState } from "react";
import { MemeTemplate } from "../App";
import styles from "./Generator.module.css";
import { create_meme, send_to_me } from "../api";
import { Button, Input} from "antd";

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
        <Input
          onChange={(e) => {
            setTopText(e.target.value);
          }}
          placeholder="Top Text"
          value={topText}
        />
        <Input
          onChange={(e) => {
            setBottomText(e.target.value);
          }}
          placeholder="Bottom Text"
          value={bottomText}
        />
        {loading && <div>Loading...</div>}

        <div
          style={{
            display: "flex",
            width: "100%",
            gap: 4,
            flexDirection: "column",
            bottom: 0,
            position: "fixed",
          }}
        >
          <Button
            onClick={() => {
              send_to_me(imageUrl || props.memeTemplate.url).then(() => {
                alert("فرستادیم برات")
              });
            }}
            type="dashed"
          >
            Export
          </Button>
          <Button
            size="large"
            loading={loading}
            onClick={() => {
              setLoading(true);
              create_meme(props.memeTemplate.id, topText, bottomText).then(
                (res) => {
                  setLoading(false);
                  setImageUrl(res.data.url);
                  console.log(res.data);
                }
              );
            }}
            disabled={!topText && !bottomText}
            type="dashed"
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};
