import "./App.css";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import Scene from "./components/Scene";
import Player from "./components/Player";
import { Physics } from "@react-three/rapier";

export default function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "left", keys: ["ArrowLeft", "KeyA"] },
        { name: "right", keys: ["ArrowRight", "KeyD"] },
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
        <Physics gravity={[0, -7, 0]}>
          <Player />
          <Scene />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
