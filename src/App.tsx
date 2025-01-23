import { useEffect, useMemo, useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Template } from "./components/Template";
import { get_memes } from "./api";
import { Generator } from "./components/Generator";
import { Footer } from "./components/Footer";

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

  return (
    <div className={styles.app}>
      {/* <Header /> */}
      <div className={styles.list}>
        {selectedMeme && selectedTemplate ? (
          <Generator memeTemplate={selectedTemplate} />
        ) : (
          memes.map((m) => (
            <Template
              onSelect={() => setSelectedMeme(m.id)}
              key={m.id}
              template_id={m.id}
              url={m.url}
              uses={m.use_count}
              name={m.name}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
