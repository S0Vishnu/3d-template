import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3 } from "three";
import type { RapierRigidBody } from "@react-three/rapier";

const SPEED = 4;
const JUMP_FORCE = 5;
const CAMERA_DISTANCE = 4;
const CAMERA_HEIGHT = 2;

const direction = new Vector3();
const cameraDir = new Vector3();
const cameraRight = new Vector3();
const targetCameraPos = new Vector3();
const targetLookAt = new Vector3();

const Player: React.FC = () => {
  const body = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const [, get] = useKeyboardControls();

  useFrame((state, delta) => {
    const rb = body.current;
    if (!rb) return;

    const { forward, backward, left, right, jump } = get();

    // Get current linear velocity
    const linvel = rb.linvel();

    // Get direction relative to the camera
    camera.getWorldDirection(cameraDir);
    cameraDir.y = 0;
    cameraDir.normalize();

    cameraRight.crossVectors(camera.up, cameraDir).normalize();

    // Compute movement direction
    direction.set(0, 0, 0);
    if (forward) direction.add(cameraDir);
    if (backward) direction.sub(cameraDir);
    if (left) direction.add(cameraRight);
    if (right) direction.sub(cameraRight);
    direction.normalize().multiplyScalar(SPEED);

    // Apply movement
    rb.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true);

    // Jumping
    if (jump && Math.abs(linvel.y) < 0.05) {
      rb.setLinvel({ x: linvel.x, y: JUMP_FORCE, z: linvel.z }, true);
    }

    // Smooth third-person camera
    const pos = rb.translation();
    targetCameraPos
      .copy(cameraDir)
      .multiplyScalar(-CAMERA_DISTANCE)
      .add(new Vector3(pos.x, pos.y + CAMERA_HEIGHT, pos.z));

    camera.position.lerp(targetCameraPos, 5 * delta);
    targetLookAt.set(pos.x, pos.y + 1, pos.z);
    camera.lookAt(targetLookAt);
  });

  return (
    <RigidBody
      ref={body}
      type="dynamic"
      position={[0, 6, 0]}
      colliders="hull"
      friction={1}
      canSleep={false}
      lockRotations
    >
      <mesh>
        <capsuleGeometry args={[0.5, 1, 4, 4]} />
        <meshStandardMaterial color="skyblue" flatShading/>
      </mesh>
    </RigidBody>
  );
};

export default Player;
