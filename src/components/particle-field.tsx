import { useEffect, useRef } from "react";
import * as THREE from "three";

// --- Configuration ---
const PARTICLE_COUNT = 220;
const STAR_COUNT = 12; // larger glowing anchor particles
const CONNECTION_DISTANCE = 130;
const MOUSE_RADIUS = 260;
const MOUSE_PUSH = 0.08;
const FLOW_SPEED = 0.0004; // noise-like flow field speed
const DAMPING = 0.996;
const DEPTH_LAYERS = 3;

// Simple 2D hash-based pseudo-noise for flow field (avoids dependency)
function hash(x: number, y: number) {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
}
function smoothNoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  return (
    hash(ix, iy) * (1 - ux) * (1 - uy) +
    hash(ix + 1, iy) * ux * (1 - uy) +
    hash(ix, iy + 1) * (1 - ux) * uy +
    hash(ix + 1, iy + 1) * ux * uy
  );
}

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 350;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Particles ---
    const totalParticles = PARTICLE_COUNT + STAR_COUNT;
    const positions = new Float32Array(totalParticles * 3);
    const velocities = new Float32Array(totalParticles * 3);
    const sizes = new Float32Array(totalParticles);
    const layers = new Float32Array(totalParticles); // depth layer 0-2
    const phases = new Float32Array(totalParticles); // unique phase offset for flow

    for (let i = 0; i < totalParticles; i++) {
      const layer = i % DEPTH_LAYERS;
      const depthSpread = layer === 0 ? 60 : layer === 1 ? 140 : 220;
      layers[i] = layer;
      phases[i] = Math.random() * Math.PI * 2;

      positions[i * 3] = (Math.random() - 0.5) * 700;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 2] = (Math.random() - 0.5) * depthSpread;

      velocities[i * 3] = (Math.random() - 0.5) * 0.2;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

      // Stars are larger and in first STAR_COUNT indices
      if (i < STAR_COUNT) {
        sizes[i] = Math.random() * 3 + 4; // 4-7
      } else {
        sizes[i] = Math.random() * 1.8 + 0.8; // 0.8-2.6
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(sizes, 1)
    );

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(0x6366f1) },
        uAccent: { value: new THREE.Color(0x8b5cf6) },
        uOpacity: { value: 0.6 },
        uTime: { value: 0 },
        uStarCount: { value: STAR_COUNT },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        uniform float uStarCount;
        varying float vAlpha;
        varying float vIsStar;

        void main() {
          float idx = float(gl_VertexID);
          vIsStar = idx < uStarCount ? 1.0 : 0.0;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float depthFade = smoothstep(0.0, 1.0, 1.0 - (-mvPosition.z / 500.0));

          // Stars pulse gently
          float pulse = vIsStar > 0.5
            ? 1.0 + sin(uTime * 1.5 + idx * 2.1) * 0.25
            : 1.0;

          gl_PointSize = size * pulse * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = depthFade;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uAccent;
        uniform float uOpacity;
        varying float vAlpha;
        varying float vIsStar;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;

          // Soft glow for stars, crisp dot for regular particles
          float alpha;
          vec3 color;
          if (vIsStar > 0.5) {
            // Layered glow: bright core + soft halo
            float core = smoothstep(0.5, 0.05, d);
            float halo = smoothstep(0.5, 0.15, d) * 0.4;
            alpha = (core + halo) * vAlpha * uOpacity;
            color = mix(uColor, uAccent, 0.5);
          } else {
            alpha = smoothstep(0.5, 0.1, d) * vAlpha * uOpacity;
            color = uColor;
          }

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Connection lines ---
    const maxConnections = PARTICLE_COUNT * 8;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 8);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 4)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // --- Mouse tracking ---
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x =
        ((e.clientX / window.innerWidth) * 2 - 1) * 350;
      mouseRef.current.y =
        (-(e.clientY / window.innerHeight) * 2 + 1) * 250;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // --- Theme ---
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        particleMaterial.uniforms.uColor.value.set(0x6366f1);
        particleMaterial.uniforms.uAccent.value.set(0xa78bfa);
        particleMaterial.uniforms.uOpacity.value = 0.6;
        particleMaterial.blending = THREE.AdditiveBlending;
        lineMaterial.blending = THREE.AdditiveBlending;
      } else {
        particleMaterial.uniforms.uColor.value.set(0x4338ca);
        particleMaterial.uniforms.uAccent.value.set(0x7c3aed);
        particleMaterial.uniforms.uOpacity.value = 0.5;
        particleMaterial.blending = THREE.NormalBlending;
        lineMaterial.blending = THREE.NormalBlending;
      }
      particleMaterial.needsUpdate = true;
      lineMaterial.needsUpdate = true;
    };
    updateTheme();

    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- Animation ---
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.016;

      if (reducedMotion.current) {
        renderer.render(scene, camera);
        return;
      }

      particleMaterial.uniforms.uTime.value = time;

      const posAttr = particleGeometry.getAttribute("position");
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < totalParticles; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        // Flow field — organic drift based on position
        const flowScale = 0.003;
        const flowTime = time * FLOW_SPEED * 60 + phases[i];
        const noiseX = smoothNoise(
          posArr[iy] * flowScale + flowTime,
          posArr[iz] * flowScale
        );
        const noiseY = smoothNoise(
          posArr[ix] * flowScale + flowTime + 100,
          posArr[iz] * flowScale + 100
        );
        const flowAngleX = noiseX * Math.PI * 2;
        const flowAngleY = noiseY * Math.PI * 2;

        // Deeper layers move slower (parallax)
        const layerSpeed = layers[i] === 0 ? 1 : layers[i] === 1 ? 0.6 : 0.35;

        velocities[ix] += Math.cos(flowAngleX) * 0.008 * layerSpeed;
        velocities[iy] += Math.sin(flowAngleY) * 0.008 * layerSpeed;

        // Apply velocity
        posArr[ix] += velocities[ix];
        posArr[iy] += velocities[iy];
        posArr[iz] += velocities[iz];

        // Boundary wrapping
        if (posArr[ix] > 380) posArr[ix] = -380;
        if (posArr[ix] < -380) posArr[ix] = 380;
        if (posArr[iy] > 280) posArr[iy] = -280;
        if (posArr[iy] < -280) posArr[iy] = 280;
        if (posArr[iz] > 140) posArr[iz] = -140;
        if (posArr[iz] < -140) posArr[iz] = 140;

        // Mouse push — stronger, more visceral repulsion
        if (mouseRef.current.active) {
          const dx = posArr[ix] - mouseRef.current.x;
          const dy = posArr[iy] - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 1) {
            const force =
              (1 - dist / MOUSE_RADIUS) * (1 - dist / MOUSE_RADIUS) * MOUSE_PUSH;
            velocities[ix] += (dx / dist) * force * layerSpeed;
            velocities[iy] += (dy / dist) * force * layerSpeed;
          }
        }

        // Damping
        velocities[ix] *= DAMPING;
        velocities[iy] *= DAMPING;
        velocities[iz] *= DAMPING;
      }

      posAttr.needsUpdate = true;

      // --- Update connections ---
      let lineIdx = 0;
      const linePos = lineGeometry.getAttribute("position")
        .array as Float32Array;
      const lineCol = lineGeometry.getAttribute("color")
        .array as Float32Array;

      const isDark = document.documentElement.classList.contains("dark");
      // Gradient: primary → accent based on distance
      const primaryR = isDark ? 0.39 : 0.26;
      const primaryG = isDark ? 0.4 : 0.22;
      const primaryB = isDark ? 0.95 : 0.79;
      const accentR = isDark ? 0.66 : 0.49;
      const accentG = isDark ? 0.36 : 0.23;
      const accentB = isDark ? 0.98 : 0.93;

      // Only connect particles in nearby layers for cleaner look
      for (let i = STAR_COUNT; i < totalParticles; i++) {
        for (let j = i + 1; j < totalParticles; j++) {
          if (lineIdx >= maxConnections) break;
          if (Math.abs(layers[i] - layers[j]) > 1) continue;

          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DISTANCE) {
            const t = dist / CONNECTION_DISTANCE;
            const alpha = (1 - t) * (1 - t) * (isDark ? 0.14 : 0.12);

            // Color shifts from primary to accent with distance
            const r = primaryR + (accentR - primaryR) * t;
            const g = primaryG + (accentG - primaryG) * t;
            const b = primaryB + (accentB - primaryB) * t;

            linePos[lineIdx * 6] = posArr[i * 3];
            linePos[lineIdx * 6 + 1] = posArr[i * 3 + 1];
            linePos[lineIdx * 6 + 2] = posArr[i * 3 + 2];
            linePos[lineIdx * 6 + 3] = posArr[j * 3];
            linePos[lineIdx * 6 + 4] = posArr[j * 3 + 1];
            linePos[lineIdx * 6 + 5] = posArr[j * 3 + 2];

            lineCol[lineIdx * 8] = r;
            lineCol[lineIdx * 8 + 1] = g;
            lineCol[lineIdx * 8 + 2] = b;
            lineCol[lineIdx * 8 + 3] = alpha;
            lineCol[lineIdx * 8 + 4] = r;
            lineCol[lineIdx * 8 + 5] = g;
            lineCol[lineIdx * 8 + 6] = b;
            lineCol[lineIdx * 8 + 7] = alpha * 0.6;

            lineIdx++;
          }
        }
      }

      // Stars connect to nearby regular particles with brighter lines
      for (let i = 0; i < STAR_COUNT; i++) {
        for (let j = STAR_COUNT; j < totalParticles; j++) {
          if (lineIdx >= maxConnections) break;

          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DISTANCE * 1.2) {
            const t = dist / (CONNECTION_DISTANCE * 1.2);
            const alpha = (1 - t) * (1 - t) * (isDark ? 0.22 : 0.16);

            linePos[lineIdx * 6] = posArr[i * 3];
            linePos[lineIdx * 6 + 1] = posArr[i * 3 + 1];
            linePos[lineIdx * 6 + 2] = posArr[i * 3 + 2];
            linePos[lineIdx * 6 + 3] = posArr[j * 3];
            linePos[lineIdx * 6 + 4] = posArr[j * 3 + 1];
            linePos[lineIdx * 6 + 5] = posArr[j * 3 + 2];

            lineCol[lineIdx * 8] = accentR;
            lineCol[lineIdx * 8 + 1] = accentG;
            lineCol[lineIdx * 8 + 2] = accentB;
            lineCol[lineIdx * 8 + 3] = alpha;
            lineCol[lineIdx * 8 + 4] = primaryR;
            lineCol[lineIdx * 8 + 5] = primaryG;
            lineCol[lineIdx * 8 + 6] = primaryB;
            lineCol[lineIdx * 8 + 7] = alpha * 0.4;

            lineIdx++;
          }
        }
      }

      // Zero unused
      for (let i = lineIdx; i < maxConnections; i++) {
        lineCol[i * 8 + 3] = 0;
        lineCol[i * 8 + 7] = 0;
      }

      lineGeometry.getAttribute("position").needsUpdate = true;
      lineGeometry.getAttribute("color").needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIdx * 2);

      // Subtle camera parallax from mouse
      if (mouseRef.current.active) {
        camera.position.x += (mouseRef.current.x * 0.02 - camera.position.x) * 0.03;
        camera.position.y += (mouseRef.current.y * 0.015 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
