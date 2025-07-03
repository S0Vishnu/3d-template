import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./components/Scene";

const App: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 50 }}
      shadows
      style={{ height: "100vh", width: "100vw" }}
    >
      <color attach="background" args={["#111"]} />
      <OrbitControls />
      <Scene />
    </Canvas>
  );
};

export default App;
