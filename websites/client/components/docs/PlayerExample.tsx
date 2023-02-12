import { Player } from "@motionly/player";
import { useRender } from "@motionly/renderer";
import { useState } from "react";
import { components } from "./components";

export function PlayerExample() {
  const [text, setText] = useState("Your text");
  const [seed, setSeed] = useState("sdf");
  const [color, setColor] = useState("#FFFF00");
  const template = {
    components: {},
    childIds: [],
    duration: 40,
    fps: 30,
    height: 1080,
    width: 1080,
  };
  const { media, progress, fileUrl, cost, status, renderId } =
    useRender(template);
  return (
    <div>
      <div
        style={{
          maxWidth: "600px",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={() => media()}>Render</button>
        <p>{progress}</p>
        <p>{fileUrl}</p>
        <p>{status}</p>
        <Player template={template} style={{ width: `100%` }} controls />
      </div>
    </div>
  );
}