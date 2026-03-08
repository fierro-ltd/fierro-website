import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 120;
const MOUSE_INFLUENCE_RADIUS = 200;
const MOUSE_FORCE = 0.03;

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
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      velocities[i * 3] = (Math.random() - 0.5) * 0.3;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      sizes[i] = Math.random() * 2 + 1;
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
        uOpacity: { value: 0.6 },
      },
      vertexShader: `
        attribute float size;
        varying float vAlpha;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = smoothstep(0.0, 1.0, 1.0 - (-mvPosition.z / 400.0));
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d) * vAlpha * uOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Connection lines
    const maxConnections = PARTICLE_COUNT * 6;
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

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x =
        ((e.clientX / window.innerWidth) * 2 - 1) * 300;
      mouseRef.current.y =
        (-(e.clientY / window.innerHeight) * 2 + 1) * 200;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Theme observer — update particle color based on dark/light mode
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      particleMaterial.uniforms.uColor.value.set(
        isDark ? 0x6366f1 : 0x4f46e5
      );
      particleMaterial.uniforms.uOpacity.value = isDark ? 0.6 : 0.35;
    };
    updateColor();

    const themeObserver = new MutationObserver(updateColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Animation loop
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (reducedMotion.current) {
        renderer.render(scene, camera);
        return;
      }

      const posAttr = particleGeometry.getAttribute("position");
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        // Apply velocity
        posArr[ix] += velocities[ix];
        posArr[iy] += velocities[iy];
        posArr[iz] += velocities[iz];

        // Boundary wrapping
        if (posArr[ix] > 320) posArr[ix] = -320;
        if (posArr[ix] < -320) posArr[ix] = 320;
        if (posArr[iy] > 220) posArr[iy] = -220;
        if (posArr[iy] < -220) posArr[iy] = 220;
        if (posArr[iz] > 120) posArr[iz] = -120;
        if (posArr[iz] < -120) posArr[iz] = 120;

        // Mouse influence
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - posArr[ix];
          const dy = mouseRef.current.y - posArr[iy];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_INFLUENCE_RADIUS) {
            const force =
              (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_FORCE;
            velocities[ix] += dx * force * 0.01;
            velocities[iy] += dy * force * 0.01;
          }
        }

        // Damping
        velocities[ix] *= 0.998;
        velocities[iy] *= 0.998;
        velocities[iz] *= 0.998;
      }

      posAttr.needsUpdate = true;

      // Update connections
      let lineIdx = 0;
      const linePos = lineGeometry.getAttribute("position")
        .array as Float32Array;
      const lineCol = lineGeometry.getAttribute("color")
        .array as Float32Array;
      const isDark = document.documentElement.classList.contains("dark");
      const baseR = isDark ? 0.39 : 0.31;
      const baseG = isDark ? 0.4 : 0.27;
      const baseB = isDark ? 0.95 : 0.89;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          if (lineIdx >= maxConnections) break;

          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_DISTANCE) {
            const alpha =
              (1 - dist / CONNECTION_DISTANCE) * (isDark ? 0.15 : 0.08);

            linePos[lineIdx * 6] = posArr[i * 3];
            linePos[lineIdx * 6 + 1] = posArr[i * 3 + 1];
            linePos[lineIdx * 6 + 2] = posArr[i * 3 + 2];
            linePos[lineIdx * 6 + 3] = posArr[j * 3];
            linePos[lineIdx * 6 + 4] = posArr[j * 3 + 1];
            linePos[lineIdx * 6 + 5] = posArr[j * 3 + 2];

            lineCol[lineIdx * 8] = baseR;
            lineCol[lineIdx * 8 + 1] = baseG;
            lineCol[lineIdx * 8 + 2] = baseB;
            lineCol[lineIdx * 8 + 3] = alpha;
            lineCol[lineIdx * 8 + 4] = baseR;
            lineCol[lineIdx * 8 + 5] = baseG;
            lineCol[lineIdx * 8 + 6] = baseB;
            lineCol[lineIdx * 8 + 7] = alpha;

            lineIdx++;
          }
        }
      }

      // Zero out unused connections
      for (let i = lineIdx; i < maxConnections; i++) {
        lineCol[i * 8 + 3] = 0;
        lineCol[i * 8 + 7] = 0;
      }

      lineGeometry.getAttribute("position").needsUpdate = true;
      lineGeometry.getAttribute("color").needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIdx * 2);

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
