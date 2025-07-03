import "./App.css";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Scene from "./components/Scene";
import Player from "./components/Player";
import { useDebugToggle } from "./hooks/useDebugToggle"; // 👈 Import hook

export default function App() {
  const debugEnabled = useDebugToggle(); // 👈 Use hook

  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["w", "ArrowUp"] },
        { name: "backward", keys: ["s", "ArrowDown"] },
        { name: "left", keys: ["a", "ArrowLeft"] },
        { name: "right", keys: ["d", "ArrowRight"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        shadows
        style={{ height: "100vh", width: "100vw" }}
      >
        <color attach="background" args={["#111"]} />
        <OrbitControls />
        <Physics gravity={[0, -7, 0]} debug={debugEnabled}>
          <Player />
          <Scene />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
