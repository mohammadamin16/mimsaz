import { useEffect, useMemo, useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import { Template } from "./components/Template";
import { get_memes, load_history } from "./api";
import { Generator } from "./components/Generator";
import { Header } from "./components/Header";

interface Theme {
  bg_color: string;
  secondary_bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  header_bg_color: string;
  accent_text_color: string;
  section_bg_color: string;
  section_header_text_color: string;
  subtitle_text_color: string;
  destructive_text_color: string;
  bottom_bar_bg_color: string;
}

export const theme: Theme = {
  bg_color: "#091E42",
  secondary_bg_color: "#00B894",
  text_color: "#E82A3C",
  hint_color: "#FCFDFD",
  link_color: "#EBECF0",
  button_color: "#7A869A",
  button_text_color: "#1677FF",
  header_bg_color: "#EBECF0",
  accent_text_color: "#FCFDFD",
  section_bg_color: "#FCFDFD",
  section_header_text_color: "#7A869A",
  subtitle_text_color: "#7A869A",
  destructive_text_color: "#FFFFFF",
  bottom_bar_bg_color: "#00B894",
};

// #091E42
// #00B894
// #E82A3C
// #FCFDFD
// #EBECF0
// #7A869A
// #1677FF
// #EBECF0
// #FCFDFD
// #FCFDFD
// #7A869A
// #7A869A
// #FFFFFF
// #00B89

export interface MemeTemplate {
  id: string;
  name: string;
  box_count: number;
  use_count: number;
  url: string;
}

function App() {
  const [memes, setMemes] = useState<MemeTemplate[]>([]);
  const [selectedMeme, setSelectedMeme] = useState("");

  useEffect(() => {
    get_memes().then((res) => {
      setMemes(res.data);
      console.log(res.data);
    });
  }, []);

  const selectedTemplate = useMemo(() => {
    return memes.find((m) => m.id === selectedMeme);
  }, [selectedMeme]);

  useEffect(() => {
    load_history().then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div className={styles.app}>
      <Header
        selectedMeme={selectedMeme}
        onBack={() => {
          setSelectedMeme("");
        }}
      />
      {selectedMeme && selectedTemplate ? (
        <Generator memeTemplate={selectedTemplate} />
      ) : (
        <div className={styles.list}>
          {memes.map((m) => (
            <Template
              onSelect={() => setSelectedMeme(m.id)}
              key={m.id}
              template_id={m.id}
              url={m.url}
              uses={m.use_count}
              name={m.name}
            />
          ))}
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
