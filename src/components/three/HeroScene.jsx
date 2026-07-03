import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Vector3, MathUtils } from 'three';
import FerrariModel from './FerrariModel';
import { useScrollStore, getInterpolatedState } from '../../store/useScrollStore';

// CinematicCameraDriver — operates the camera every frame with damped inertia.
// Reads scroll progress once, evaluates the timeline once, damps position and target.
// Damping coefficient 3.0 = leisurely, weighted, human-feeling camera movement.
function CinematicCameraDriver() {
  const currentTarget = useRef(new Vector3(0, -0.1, 0));
  const DAMP = 3.0;

  useFrame((state, delta) => {
    const scrollProgress = useScrollStore.getState().scrollProgress;
    const ts = getInterpolatedState(scrollProgress);

    // Apply camera offsets: shift left by 0.15, up by 0.15, back by 2.8, look right by 0.25 and down by 0.2
    const targetPosX = ts.camera.position[0] - 0.15;
    const targetPosY = ts.camera.position[1] + 0.15;
    const targetPosZ = ts.camera.position[2] + 2.8;

    const targetTarX = ts.camera.target[0] + 0.25;
    const targetTarY = ts.camera.target[1] - 0.2;
    const targetTarZ = ts.camera.target[2];

    // Damp camera position — each axis independently for organic feel
    state.camera.position.x = MathUtils.damp(state.camera.position.x, targetPosX, DAMP, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, targetPosY, DAMP, delta);
    state.camera.position.z = MathUtils.damp(state.camera.position.z, targetPosZ, DAMP, delta);

    // Damp lookAt target — separating it from camera position creates parallax-like depth
    currentTarget.current.x = MathUtils.damp(currentTarget.current.x, targetTarX, DAMP, delta);
    currentTarget.current.y = MathUtils.damp(currentTarget.current.y, targetTarY, DAMP, delta);
    currentTarget.current.z = MathUtils.damp(currentTarget.current.z, targetTarZ, DAMP, delta);

    state.camera.lookAt(currentTarget.current);
    state.camera.updateProjectionMatrix();
  });

  return null;
}

export default function HeroScene() {
  // Single timeline evaluation in React render — distributes props to FerrariModel only.
  // Camera state is handled entirely inside CinematicCameraDriver's useFrame.
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const ferrariState = getInterpolatedState(scrollProgress).ferrari;

  return (
    <Canvas>
      {/* Initial camera placement matches Shot 1 keyframe to avoid a cold-start damp from origin */}
      <PerspectiveCamera
        makeDefault
        position={[0.45, 0.6, 7.0]}
        fov={42}
      />
      <CinematicCameraDriver />

      <hemisphereLight color="#ffffff" groundColor="#111111" intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.0} />
      <directionalLight position={[-5, 2, 3]} intensity={0.6} />
      <directionalLight position={[-2, 6, -5]} intensity={3.0} />

      <FerrariModel
        position={[0.8, -0.85, 0]}
        rotation={ferrariState.bodyRotation}
        steering={ferrariState.steering}
      />
    </Canvas>
  );
}

