import { create } from 'zustand';

// CINEMATIC_TIMELINE — A continuous luxury automotive camera path.
// Imagined as a professional cinematographer with a stabilized camera
// slowly walking around a Ferrari in a premium showroom.
//
// The Ferrari is positioned at world origin ~[0.8, -0.85, 0], rotated -PI/4.2 (~-42°).
// All camera positions are authored to keep the car beautifully composed.
// Targets point near the car's visual center of mass, adjusted per shot.
//
// Coordinate system: X = right, Y = up, Z = toward viewer.

export const CINEMATIC_TIMELINE = [
  // Shot 1 — Hero Establishing (scroll 0.0)
  // Confident front three-quarter. Camera is elevated slightly, pulled back.
  // The Ferrari fills the right two-thirds of the frame. Premium, calm.
  {
    scroll: 0.0,
    camera: { position: [0.6, 0.45, 4.2], target: [0.4, -0.1, 0] },
    ferrari: { steering: 0, bodyRotation: [0, -Math.PI / 4.2, 0] }
  },

  // Shot 2 — Slow Push-In (scroll 0.2)
  // The camera drifts closer and descends slightly.
  // Increases the Ferrari's presence. Movement barely perceptible.
  {
    scroll: 0.2,
    camera: { position: [0.3, 0.25, 3.6], target: [0.3, -0.15, 0] },
    ferrari: { steering: 0, bodyRotation: [0, -Math.PI / 4.2, 0] }
  },

  // Shot 3 — Shoulder Reveal (scroll 0.42)
  // Camera arcs leftward ~10°, revealing the shoulder line and door sill.
  // Target drifts to expose the side profile. Ferrari stays dominant.
  {
    scroll: 0.42,
    camera: { position: [-0.6, 0.2, 3.5], target: [0.1, -0.2, 0] },
    ferrari: { steering: 0.08, bodyRotation: [0, -Math.PI / 4.0, 0] }
  },

  // Shot 4 — Rear Three-Quarter (scroll 0.65)
  // Arc continues ~12° further. Rear haunch and exhaust are revealed.
  // Camera drops to hood height. Mystery preserved — rear is not fully shown.
  {
    scroll: 0.65,
    camera: { position: [-1.1, 0.12, 3.0], target: [-0.1, -0.1, 0] },
    ferrari: { steering: 0.12, bodyRotation: [0, -Math.PI / 3.9, 0] }
  },

  // Shot 5 — Hero Rest (scroll 1.0)
  // Camera settles into a final composed wide shot, slightly elevated.
  // Movement decelerates naturally. Frame feels intentional and complete.
  {
    scroll: 1.0,
    camera: { position: [0.2, 0.55, 4.0], target: [0.25, -0.05, 0] },
    ferrari: { steering: 0, bodyRotation: [0, -Math.PI / 4.3, 0] }
  }
];

export function getInterpolatedState(progress) {
  const p = Math.max(0, Math.min(1, progress));

  // Find bracketing keyframes
  let lower = CINEMATIC_TIMELINE[0];
  let upper = CINEMATIC_TIMELINE[CINEMATIC_TIMELINE.length - 1];

  for (let i = 0; i < CINEMATIC_TIMELINE.length - 1; i++) {
    const k1 = CINEMATIC_TIMELINE[i];
    const k2 = CINEMATIC_TIMELINE[i + 1];
    if (p >= k1.scroll && p <= k2.scroll) {
      lower = k1;
      upper = k2;
      break;
    }
  }

  const range = upper.scroll - lower.scroll;
  const rawFactor = range === 0 ? 0 : (p - lower.scroll) / range;

  // Smoothstep easing: smooth acceleration and deceleration at every keyframe boundary
  const factor = rawFactor * rawFactor * (3 - 2 * rawFactor);

  const lerp = (start, end, alpha) => start + (end - start) * alpha;
  const lerpArray = (a, b, alpha) => a.map((val, idx) => lerp(val, b[idx], alpha));

  return {
    camera: {
      position: lerpArray(lower.camera.position, upper.camera.position, factor),
      target: lerpArray(lower.camera.target, upper.camera.target, factor),
    },
    ferrari: {
      steering: lerp(lower.ferrari.steering, upper.ferrari.steering, factor),
      bodyRotation: lerpArray(lower.ferrari.bodyRotation, upper.ferrari.bodyRotation, factor),
    }
  };
}

export const useScrollStore = create((set) => ({
  targetScrollProgress: 0,
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ targetScrollProgress: Math.max(0, Math.min(1, progress)) }),
}));
