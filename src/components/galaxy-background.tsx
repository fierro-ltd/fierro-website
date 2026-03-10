import { useEffect, useRef } from "react";
import * as THREE from "three";

const STAR_COUNT = 1500;
const BRIGHT_STAR_COUNT = 20;
const TOTAL_STARS = STAR_COUNT + BRIGHT_STAR_COUNT;

export function GalaxyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Renderer setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Star data ---
    const starPositions = new Float32Array(TOTAL_STARS * 3);
    const starSizes = new Float32Array(TOTAL_STARS);
    const starBrightness = new Float32Array(TOTAL_STARS);
    const starSpeed = new Float32Array(TOTAL_STARS);
    const starPhase = new Float32Array(TOTAL_STARS);
    const starIsBright = new Float32Array(TOTAL_STARS);

    for (let i = 0; i < TOTAL_STARS; i++) {
      // Distribute in NDC-ish space for the orthographic camera
      starPositions[i * 3] = (Math.random() - 0.5) * 2.4;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2.4;
      starPositions[i * 3 + 2] = Math.random() * -2; // depth spread

      if (i < BRIGHT_STAR_COUNT) {
        starSizes[i] = 3.0 + Math.random() * 3.0; // 3-6px
        starBrightness[i] = 0.8 + Math.random() * 0.2;
        starIsBright[i] = 1.0;
      } else {
        starSizes[i] = 0.3 + Math.random() * 2.7; // 0.3-3.0px
        starBrightness[i] = 0.3 + Math.random() * 0.7;
        starIsBright[i] = 0.0;
      }

      starSpeed[i] = 0.5 + Math.random() * 2.0;
      starPhase[i] = Math.random() * Math.PI * 2;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    starGeometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(starSizes, 1)
    );
    starGeometry.setAttribute(
      "aBrightness",
      new THREE.BufferAttribute(starBrightness, 1)
    );
    starGeometry.setAttribute(
      "aSpeed",
      new THREE.BufferAttribute(starSpeed, 1)
    );
    starGeometry.setAttribute(
      "aPhase",
      new THREE.BufferAttribute(starPhase, 1)
    );
    starGeometry.setAttribute(
      "aIsBright",
      new THREE.BufferAttribute(starIsBright, 1)
    );

    const starMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uOpacityScale: { value: 1.0 },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aBrightness;
        attribute float aSpeed;
        attribute float aPhase;
        attribute float aIsBright;

        uniform float uTime;
        uniform float uPixelRatio;

        varying float vBrightness;
        varying float vIsBright;

        void main() {
          // Twinkling
          float twinkle = sin(uTime * aSpeed + aPhase) * 0.3 + 0.7;
          vBrightness = aBrightness * twinkle;
          vIsBright = aIsBright;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio * (aIsBright > 0.5 ? 1.0 + sin(uTime * 0.8 + aPhase) * 0.2 : 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacityScale;

        varying float vBrightness;
        varying float vIsBright;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float d = length(coord);

          if (d > 0.5) discard;

          float alpha;
          vec3 color;

          if (vIsBright > 0.5) {
            // Cross-shaped glare for bright stars
            float core = exp(-d * d * 20.0);
            float halo = exp(-d * d * 6.0) * 0.5;

            // Cross glare along axes
            float crossX = exp(-coord.y * coord.y * 80.0) * exp(-coord.x * coord.x * 8.0);
            float crossY = exp(-coord.x * coord.x * 80.0) * exp(-coord.y * coord.y * 8.0);
            float cross = (crossX + crossY) * 0.35;

            alpha = (core + halo + cross) * vBrightness * uOpacityScale;
            color = vec3(0.85, 0.88, 1.0); // Slightly blue-white
          } else {
            // Simple soft dot for regular stars
            alpha = smoothstep(0.5, 0.0, d) * vBrightness * uOpacityScale;
            color = vec3(0.8, 0.82, 0.95);
          }

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    stars.renderOrder = 1;
    scene.add(stars);

    // --- Nebula quad (behind stars) ---
    const nebulaGeometry = new THREE.PlaneGeometry(2, 2);
    const nebulaMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uOpacity: { value: 0.3 },
        // Primary: indigo/violet
        uColor1A: { value: new THREE.Color(0x4338ca) },
        uColor1B: { value: new THREE.Color(0x7c3aed) },
        // Secondary: teal/cyan
        uColor2A: { value: new THREE.Color(0x06b6d4) },
        uColor2B: { value: new THREE.Color(0x2dd4bf) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        uniform float uOpacity;
        uniform vec3 uColor1A;
        uniform vec3 uColor1B;
        uniform vec3 uColor2A;
        uniform vec3 uColor2B;

        varying vec2 vUv;

        // Hash-based 2D noise
        float hash2d(vec2 p) {
          float h = dot(p, vec2(127.1, 311.7));
          return fract(sin(h) * 43758.5453);
        }

        float noise2d(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash2d(i), hash2d(i + vec2(1.0, 0.0)), u.x),
            mix(hash2d(i + vec2(0.0, 1.0)), hash2d(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        // 5-octave FBM
        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          for (int i = 0; i < 5; i++) {
            value += amplitude * noise2d(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 uv = vUv;

          // Mouse parallax (3-5% UV displacement)
          uv += uMouse * 0.04;

          // Correct aspect ratio for noise sampling
          float aspect = uResolution.x / uResolution.y;
          vec2 st = vec2(uv.x * aspect, uv.y);

          // FBM layers at different scales and drift speeds
          float n1 = fbm(st * 2.5 + uTime * 0.015);
          float n2 = fbm(st * 3.5 - uTime * 0.02 + vec2(5.3, 1.2));
          float n3 = fbm(st * 1.8 + uTime * 0.01 + vec2(n1, n2) * 0.6);
          float n4 = fbm(st * 5.0 - uTime * 0.025 + vec2(8.1, 3.7));
          float n5 = fbm(st * 4.0 + uTime * 0.008 + vec2(n3 * 0.4, n4 * 0.3));

          // Combine for cloud density
          float density = n1 * 0.3 + n2 * 0.25 + n3 * 0.2 + n4 * 0.15 + n5 * 0.1;

          // Higher contrast with smoothstep
          density = smoothstep(0.25, 0.75, density);

          // Spatial mask to separate the two nebula regions
          // Use a large-scale noise to create distinct zones
          float regionMask = fbm(st * 0.8 + vec2(42.0, 17.0) + uTime * 0.005);
          regionMask = smoothstep(0.35, 0.65, regionMask);

          // Primary region: indigo/violet
          vec3 color1 = mix(uColor1A, uColor1B, n2);
          // Secondary region: teal/cyan
          vec3 color2 = mix(uColor2A, uColor2B, n4);

          // Blend regions based on spatial mask
          vec3 nebulaColor = mix(color1, color2, regionMask);

          // Vignette - smooth falloff toward edges
          vec2 center = vUv - 0.5;
          float vignette = 1.0 - dot(center, center) * 2.5;
          vignette = smoothstep(0.0, 0.6, vignette);

          float alpha = density * vignette * uOpacity;

          gl_FragColor = vec4(nebulaColor, alpha);
        }
      `,
    });

    const nebulaQuad = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    nebulaQuad.renderOrder = 0;
    nebulaQuad.position.z = -1;
    scene.add(nebulaQuad);

    // --- Mouse tracking ---
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // --- Resize ---
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      nebulaMaterial.uniforms.uResolution.value.set(w, h);
      starMaterial.uniforms.uPixelRatio.value = Math.min(
        window.devicePixelRatio,
        2
      );
    };
    window.addEventListener("resize", onResize, { passive: true });

    // --- Theme ---
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        starMaterial.blending = THREE.AdditiveBlending;
        starMaterial.uniforms.uOpacityScale.value = 1.0;
        nebulaMaterial.uniforms.uOpacity.value = 0.3;
      } else {
        starMaterial.blending = THREE.NormalBlending;
        starMaterial.uniforms.uOpacityScale.value = 0.25;
        nebulaMaterial.uniforms.uOpacity.value = 0.08;
      }
      starMaterial.needsUpdate = true;
    };
    updateTheme();

    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- Animation with visibility pausing ---
    let frameId: number;
    let time = 0;
    let rendered = false;
    let running = true;

    const animate = () => {
      if (!running) return;
      frameId = requestAnimationFrame(animate);

      if (reducedMotionRef.current && rendered) {
        return;
      }

      time += 0.016;

      starMaterial.uniforms.uTime.value = time;
      nebulaMaterial.uniforms.uTime.value = time;
      nebulaMaterial.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      );

      renderer.render(scene, camera);
      rendered = true;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frameId);
      } else {
        running = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    animate();

    // --- Cleanup ---
    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
