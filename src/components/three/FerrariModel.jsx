import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export default function FerrariModel({
  position = [0.8, -0.85, 0],
  rotation = [0, -Math.PI / 4.2, 0],
  steering = 0
}) {
  const { scene } = useGLTF('/models/2021_ferrari_sf90_spider.glb');

  // Apply steering locally to the front wheels via side-effect
  useEffect(() => {
    const frontLeftWheel = scene.getObjectByName("3DWheel Front L");
    const frontRightWheel = scene.getObjectByName("3DWheel Front R");
    if (frontLeftWheel) {
      frontLeftWheel.rotation.y = steering ?? 0;
    }
    if (frontRightWheel) {
      frontRightWheel.rotation.y = steering ?? 0;
    }
  }, [scene, steering]);

  // Destructure rotation array to pass as explicit Euler components
  const [rx = 0, ry = -Math.PI / 4.2, rz = 0] = rotation ?? [];

  return (
    <group
      position={position}
      scale={105}
      rotation-x={rx}
      rotation-y={ry}
      rotation-z={rz}
    >
      <primitive
        object={scene}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/models/2021_ferrari_sf90_spider.glb');
