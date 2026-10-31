"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, type RefObject } from "react";
import { Color, type Group, type ShaderMaterial } from "three";
import type { CommitProduct } from "./commit-field";

const HAND = new Color("#b4b4b4");
const STEP = 0.0042; // tower height per commit, the same for every product so volume compares honestly
const TURN = 0.38; // radians between consecutive commits in a tower

// Each commit is one point. It starts in a loose cloud and, as the section scrolls, climbs into
// its product's tower in the order it was written, oldest at the bottom.
const vertex = /* glsl */ `
  attribute vec3 aCloud;
  attribute vec2 aTower; // angle, height
  attribute float aCol;
  attribute float aDelay;
  attribute vec3 aColor;
  uniform float uProgress, uSpacing, uRadius, uCloud, uScale, uSize;
  varying vec3 vColor;
  void main() {
    float t = smoothstep(0.0, 1.0, clamp(uProgress * 1.6 - aDelay * 0.6, 0.0, 1.0));
    vec3 tower = vec3((aCol - 1.5) * uSpacing + cos(aTower.x) * uRadius, aTower.y, sin(aTower.x) * uRadius);
    vec3 p = mix(aCloud * uCloud, tower, t);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uScale / -mv.z;
    vColor = aColor;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.38, d));
  }
`;

// Deterministic so the cloud looks the same on every visit.
function random(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

function Commits({ products, section, still }: { products: CommitProduct[]; section: RefObject<HTMLElement | null>; still: boolean }) {
  const group = useRef<Group>(null);
  const material = useRef<ShaderMaterial>(null);
  const viewport = useThree((s) => s.viewport.getCurrentViewport(s.camera, [0, 0, 0]));

  const attributes = useMemo(() => {
    const rand = random(7);
    const n = products.reduce((sum, p) => sum + p.seq.length, 0);
    const cloud = new Float32Array(n * 3);
    const tower = new Float32Array(n * 2);
    const col = new Float32Array(n);
    const delay = new Float32Array(n);
    const color = new Float32Array(n * 3);
    let i = 0;
    products.forEach((p, k) => {
      const agent = new Color(p.color);
      for (let j = 0; j < p.seq.length; j++, i++) {
        // Uniform point inside a unit sphere.
        const u = rand() * 2 - 1;
        const a = rand() * Math.PI * 2;
        const r = Math.cbrt(rand());
        const s = Math.sqrt(1 - u * u) * r;
        cloud.set([Math.cos(a) * s, u * r * 0.7, Math.sin(a) * s], i * 3);
        tower.set([j * TURN, -2.3 + j * STEP], i * 2);
        col[i] = k;
        delay[i] = j / p.seq.length;
        (p.seq[j] === "1" ? agent : HAND).toArray(color, i * 3);
      }
    });
    return { cloud, tower, col, delay, color, n };
  }, [products]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: still ? 1 : 0 },
      uSpacing: { value: 1 },
      uRadius: { value: 0.3 },
      uCloud: { value: 3 },
      uScale: { value: 1 },
      uSize: { value: 0.07 },
    }),
    [still],
  );

  useFrame((state) => {
    const u = material.current?.uniforms;
    if (!u || !group.current) return;
    // Towers line up with the four product labels, which split the same width in quarters.
    u.uSpacing.value = viewport.width / 4;
    u.uRadius.value = Math.min(0.42, viewport.width / 22);
    u.uCloud.value = Math.min(3.2, viewport.width * 0.4);
    u.uScale.value = (state.size.height * state.gl.getPixelRatio()) / (2 * Math.tan((20 * Math.PI) / 180));
    if (still) return;

    const el = section.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrolled = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
    const target = Math.min(1, Math.max(0, (scrolled - 0.12) / 0.6));
    u.uProgress.value += (target - u.uProgress.value) * 0.08;
    // The cloud drifts; the towers settle face-on so they match the labels below.
    const settle = Math.min(1, u.uProgress.value * 1.2);
    group.current.rotation.y = (1 - settle) * state.clock.elapsedTime * 0.12;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[attributes.cloud, 3]} />
          <bufferAttribute attach="attributes-aCloud" args={[attributes.cloud, 3]} />
          <bufferAttribute attach="attributes-aTower" args={[attributes.tower, 2]} />
          <bufferAttribute attach="attributes-aCol" args={[attributes.col, 1]} />
          <bufferAttribute attach="attributes-aDelay" args={[attributes.delay, 1]} />
          <bufferAttribute attach="attributes-aColor" args={[attributes.color, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function CommitScene(props: {
  products: CommitProduct[];
  section: RefObject<HTMLElement | null>;
  active: boolean;
}) {
  // Client-only module, so matchMedia is safe here. Reduced motion shows the towers, no scroll story.
  const [still] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 40 }}
      dpr={[1, 2]}
      frameloop={props.active && !still ? "always" : "demand"}
      gl={{ alpha: true, antialias: false }}
      aria-hidden="true"
    >
      <Commits products={props.products} section={props.section} still={still} />
    </Canvas>
  );
}
