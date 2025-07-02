import { Sphere, Environment, Lightformer, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Color } from "three";

export default function Scene() {
  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={0.5}
        shadow-mapSize={1024}
      />

      {/* Environment light */}
      <Environment preset="sunset" />

      {/* Glowing spheres */}
      <Float>
        <group>
          {[...Array(20)].map((_, i) => (
            <Sphere
              key={i}
              args={[0.3, 32, 32]}
              position={[
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 5,
              ]}
            >
              <meshStandardMaterial
                color={new Color(`hsl(${i * 20}, 100%, 70%)`)}
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.6}
                emissive={new Color(`hsl(${i * 20}, 100%, 50%)`)}
              />
            </Sphere>
          ))}
        </group>
      </Float>
      {/* Bloom postprocessing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1} />
      </EffectComposer>
    </>
  );
}
