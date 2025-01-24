import { useEffect, useMemo, useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import { Template } from "./components/Template";
import { get_memes } from "./api";
import { Generator } from "./components/Generator";
import {
  WebAppProvider,
  MainButton,
  BackButton,

  
} from "@vkruglikov/react-telegram-web-app";

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
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
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
      <MainButton />
      <BackButton />
    </WebAppProvider>
  );
}

export default App;
