import { useMemo, useState } from "react";
import { MemeTemplate } from "../App";
import styles from "./Generator.module.css";
import { create_meme, send_to_me, sendCanvasToAPI, upload_meme } from "../api";
import html2canvas from "html2canvas";
import { Button, Input, Typography } from "antd";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface GeneratorProps {
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
    const memeElement = document.getElementById("meme");

    if (memeElement) {
      html2canvas(memeElement).then((canvas) => {
        sendCanvasToAPI(canvas);
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
    if (!props.memeTemplate.url) {
      return "";
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = props.memeTemplate.url;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
    };

    return canvas.toDataURL();
  }, [props.memeTemplate.url]);

  return (
    <div className={styles.container}>
      <div
        id="meme"
        style={{
          backgroundImage: `url('${imageBlobUrl}')`,
          border: "1px solid #000",
          backgroundSize: "cover",
          width: "90%",
          position: "relative",
          textAlign: "center",
        }}
      >
        <img
          className={styles.image}
          // src={imageUrl || props.memeTemplate.url}
          src={imageBlobUrl}
          // alt={props.memeTemplate.name}
        />

        {topText &&
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
        }

{bottomText &&

        <Draggable position={bottomTextPosition} onDrag={handleBottomTextDrag}>
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
}
      </div>

      <div className={styles.input_list}>
        <Typography.Title level={5}>متن اول</Typography.Title>
        <Input
          onChange={(e) => {
            setTopText(e.target.value);
          }}
          placeholder="Top Text"
          value={topText}
        />
        <Typography.Title level={5}>متن دوم</Typography.Title>
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
          {/* <Button
            onClick={() => {
              send_to_me(imageUrl || props.memeTemplate.url).then(() => {
                alert("فرستادیم برات");
              });
            }}
            type="dashed"
          >
            Export
          </Button> */}
          {/* <Button
            size="large"
            style={{}}
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
          </Button> */}

          <Button
            onClick={exportMeme}
            loading={loading}
            type="primary"
            size="large"
            style={{
              backgroundColor:"#3B82F6",
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
