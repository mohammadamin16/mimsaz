import { useMemo, useState } from "react";
import { MemeTemplate } from "../App";
import styles from "./Generator.module.css";
import { create_meme, send_to_me, sendCanvasToAPI, upload_meme } from "../api";
import html2canvas from "html2canvas";
import { Button, Input, Typography } from "antd";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface GeneratorProps {
  onBack: () => void;
  memeTemplate: MemeTemplate;
}

function close() {
  window?.Bale?.WebApp.close();
}

export const Generator: React.FC<GeneratorProps> = (props) => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [topTextPosition, setTopTextPosition] = useState({ x: 0, y: 0 });
  const [bottomTextPosition, setBottomTextPosition] = useState({ x: 0, y: 0 });

  // Handle dragging for top text
  const handleTopTextDrag = (e: DraggableEvent, data: DraggableData) => {
    setTopTextPosition({ x: data.x, y: data.y });
  };

  // Handle dragging for bottom text
  const handleBottomTextDrag = (e: DraggableEvent, data: DraggableData) => {
    setBottomTextPosition({ x: data.x, y: data.y });
  };

  const exportMeme = () => {
    setLoading(true);
    const memeElement = document.getElementById("meme");

    if (memeElement) {
      html2canvas(memeElement, {
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        sendCanvasToAPI(canvas).then(() => {
          setLoading(false);
          close();
        })
      });
    }
  };

  const calculateFontSize = (text: string): string => {
    const maxLength = 20; // Maximum characters before reducing font size
    const baseSize = 2; // Base font size in rem
    const minSize = 1; // Minimum font size in rem

    if (text.length > maxLength) {
      return `${Math.max(
        minSize,
        baseSize - (text.length - maxLength) * 0.1
      )}rem`;
    }
    return `${baseSize}rem`;
  };

  // stores image of the meme template in a blob to prevent CORS issues
  const imageBlobUrl = useMemo(() => {
    fetch(props.memeTemplate.url).then((response) => {
      response.blob().then((blob) => {
        setImageUrl(URL.createObjectURL(blob));
      });
    });
  }, [props.memeTemplate.url]);

  return (
    <div className={styles.container}>
      <div
        id="meme"
        style={{
          backgroundSize: "cover",
          width: "90%",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <img
          className={styles.image}
          // src={imageUrl || props.memeTemplate.url}
          // src={imageBlobUrl}
          src={imageUrl}
          // alt={props.memeTemplate.name}
        />

        {topText && (
          <Draggable position={topTextPosition} onDrag={handleTopTextDrag}>
            <h2
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                fontSize: calculateFontSize(topText), // Dynamic font size
                cursor: "move",
                fontFamily: "VazirMatn, sans-serif",
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Break long words
                overflowWrap: "break-word", // Break long words
                maxWidth: "200px", // Limit width to prevent overflow
                textAlign: "center", // Center-align text
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                padding: "5px 10px", // Add padding for better readability
                borderRadius: "5px", // Rounded corners
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Improved text shadow
              }}
            >
              {topText}
            </h2>
          </Draggable>
        )}

        {bottomText && (
          <Draggable
            position={bottomTextPosition}
            onDrag={handleBottomTextDrag}
          >
            <h2
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                fontSize: calculateFontSize(bottomText), // Dynamic font size
                cursor: "move",
                fontFamily: "VazirMatn, sans-serif",
                whiteSpace: "normal", // Allow text to wrap
                wordWrap: "break-word", // Break long words
                overflowWrap: "break-word", // Break long words
                maxWidth: "200px", // Limit width to prevent overflow
                textAlign: "center", // Center-align text
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                padding: "5px 10px", // Add padding for better readability
                borderRadius: "5px", // Rounded corners
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Improved text shadow
              }}
            >
              {bottomText}
            </h2>
          </Draggable>
        )}
      </div>

      <div className={styles.input_list}>
        <Input
          className={styles.input}
          autoComplete="off"
          onChange={(e) => {
            setTopText(e.target.value);
          }}
          placeholder="متن اول"
          value={topText}
        />
        <Input
          className={styles.input}
          autoComplete="off"
          onChange={(e) => {
            setBottomText(e.target.value);
          }}
          placeholder="متن دوم"
          value={bottomText}
        />
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
            onClick={props.onBack}
            type="dashed"
            size="large"
            style={{
              backgroundColor: "#5555",
              outline: "none",
              border: "none",
              color: "white",
              margin: "20px 20px 0 20px",
              padding: "10px 20px",
              fontFamily: "VazirMatn, sans-serif",
            }}
            disabled={!topText && !bottomText}
          >
            بازگشت
          </Button>

          <Button
            onClick={exportMeme}
            loading={loading}
            type="primary"
            size="large"
            style={{
              opacity: !topText && !bottomText ? 0.5 : 1,
              backgroundColor: "#3B82F6",
              outline: "none",
              border: "none",
              color: "white",
              margin: "20px",
              padding: "10px 20px",
              fontFamily: "VazirMatn, sans-serif",
            }}
            disabled={!topText && !bottomText}
          >
            همینو بفرست
          </Button>
        </div>
      </div>
    </div>
  );
};
