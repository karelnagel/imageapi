import { Player } from "@asius/player";
import { useState } from "react";
import { components } from "./components";

export function PlayerExample() {
  const [text, setText] = useState("Your text");
  const [seed, setSeed] = useState("sdf");
  const [color, setColor] = useState("#FFFF00");

  const modifications = [
    {
      id: "m5sk14y",
      text,
    },
    {
      id: "r81ebs",
      src: `https://picsum.photos/seed/${seed}/1080/1080`,
    },
    {
      id: "skz7v8m",
      color,
    },
  ];

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
        <Player
          comps={components}
          duration={40}
          fps={30}
          height={1080}
          width={1080}
          style={{ width: `100%` }}
          controls
          modifications={modifications}
        />
      </div>
    </div>
  );
}