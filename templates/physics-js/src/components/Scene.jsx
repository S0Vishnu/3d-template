// Scene.jsx
import React from "react";
import {
  Sphere,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { RigidBody } from "@react-three/rapier";
import { Color } from "three";

function Floor() {
  return (
    <RigidBody type="fixed" restitution={0.2}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </RigidBody>
  );
}

function GlowingSpheres() {
  return (
    <group>
      {[...Array(20)].map((_, i) => (
        <RigidBody key={i} colliders="ball" restitution={0.7} friction={0.5}>
          <Sphere
            key={i}
            args={[0.3, 32, 32]}
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 3 + 2,
              (Math.random() - 0.5) * 5,
            ]}
          >
            <meshStandardMaterial
              color={new Color(`hsl(${i * 20}, 100%, 70%)`)}
              emissive={new Color(`hsl(${i * 20}, 100%, 50%)`)}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.6}
            />
          </Sphere>
        </RigidBody>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <color attach="background" args={["#1a1a1a"]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        position={[5, 5, 5]}
        intensity={0.5}
        shadow-mapSize={1024}
      />
      <Environment preset="sunset" />
      <Floor />
      <GlowingSpheres />
      <OrbitControls />
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1} />
      </EffectComposer>
    </>
  );
}
