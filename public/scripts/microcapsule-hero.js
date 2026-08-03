/*
 * Microcapsule hero background.
 *
 * The body of this file is the supplied reference build
 * (Microcapsule 3D model / deploy/microcapsule-animation.html) copied verbatim.
 * Only the lines that bound it to a standalone page are changed: it draws into
 * the host canvas instead of one appended to the body, reads its size from that
 * element instead of the window, takes the portrait data as an import instead of
 * a global, drops the HUD and its scrub/persist controls, and runs only while
 * the hero is actually on screen. No geometry, material, timeline, or colour
 * value is altered — keep it that way when the reference build is updated.
 *
 * Load with:  <script type="module" src="/scripts/microcapsule-hero.js"></script>
 * Requires an import map resolving "three" (see the site <head>).
 */
const HOST = document.querySelector("[data-microcapsule]");
if (HOST) boot(HOST);

/*
 * Three.js and the portrait cloud are ~3MB together, so they are imported only
 * once a hero canvas is actually on the page. A static import would download
 * them on every route that loads this script.
 */
async function boot(canvas) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Reduced motion, or no WebGL2: drop the canvas so the hero's own poster
  // shows through untouched.
  const supported = (() => {
    try {
      return !!document.createElement("canvas").getContext("webgl2");
    } catch {
      return false;
    }
  })();
  if (reduced.matches || !supported) {
    canvas.remove();
    return;
  }

  // The vendored build is imported by path, not as the bare specifier "three":
  // a bare specifier needs an import map, and a host that does not execute the
  // page's script tags never registers one. three.module.js resolves its own
  // "./three.core.js" relatively, so nothing else is needed.
  const [THREE, { default: PORTRAIT_DATA }] = await Promise.all([
    import("/vendor/three.module.js"),
    import("./portrait-data.js"),
  ]);

  const VW = () => Math.max(2, canvas.clientWidth);
  const VH = () => Math.max(2, canvas.clientHeight);

  const BEADS = 80000;
  const ACTS = [
    { name: 'Encapsulation', d: 6 },
    { name: 'Release',       d: 6 },
    { name: 'Antibodies',    d: 11 },
    { name: 'Vortex',        d: 3.6 },
    { name: 'Emergence',     d: 10 },
    { name: 'Recirculate',   d: 5 }
  ];
  // every transition uses the same curve and the same stagger spread, so no act
  // reads faster or slower than another
  const TAU = Math.PI * 2;
  // quantise every angular speed to a whole number of cycles per loop so the
  // last frame lines up exactly with the first
  const qf = f => Math.max(1, Math.round(f * TOTAL / TAU)) * TAU / TOTAL;
  const MORPH = 1.02, STAGGER = 0.5;
  const morphK = (lt, i, mod) => {
    const t = lt * MORPH - (i % mod) / mod * STAGGER;
    return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  };
  let acc = 0; for (const A of ACTS) { A.t = acc; acc += A.d; }
  const TOTAL = acc;

  // ---------- renderer, camera, studio environment ---------------------------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(VW(), VH(), false);
  renderer.toneMapping = THREE.NoToneMapping;   // tone mapping happens in the post pass
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // scene renders into an HDR target so the post pass can do depth-of-field + bloom
  function makeRT() {
    const dpr = renderer.getPixelRatio();
    const w = Math.max(2, Math.floor(VW() * dpr)), hh = Math.max(2, Math.floor(VH() * dpr));
    const depth = new THREE.DepthTexture(w, hh);
    const rt = new THREE.WebGLRenderTarget(w, hh, {
      type: THREE.HalfFloatType, depthBuffer: true, depthTexture: depth,
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, samples: 4
    });
    return rt;
  }
  let rt = makeRT();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd7e6f2);
  scene.fog = new THREE.FogExp2(0xd7e6f2, 0.02);

  // soft studio backdrop: vertical gradient with a gentle light pool, not a flat fill
  const backdrop = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 80),
    new THREE.ShaderMaterial({
      depthWrite: false, fog: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `varying vec2 vUv;
        void main(){
          vec3 top = vec3(1.158, 1.585, 2.189);  // resolves to #D7E6F2 after the post curve
          vec3 bot = vec3(0.882, 1.248, 1.778);
          vec3 c = mix(bot, top, smoothstep(0.0, 1.0, vUv.y));
          float pool = smoothstep(0.75, 0.0, length((vUv - vec2(0.44, 0.62)) * vec2(1.5, 1.0)));
          c += pool * 0.06;
          gl_FragColor = vec4(c, 1.0);
        }`
    })
  );
  backdrop.position.set(0, 0, -26);
  backdrop.name = 'backdrop';
  scene.add(backdrop);

  const camera = new THREE.PerspectiveCamera(38, VW() / VH(), 0.05, 60);
  camera.position.set(0, 0, 7);

  function buildEnv() {
    const s = new THREE.Scene();
    const m = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `varying vec3 vP;
        void main(){
          vec3 n = normalize(vP);
          float h = n.y * 0.5 + 0.5;
          vec3 sky = mix(vec3(0.62,0.72,0.82), vec3(1.35,1.38,1.42), smoothstep(0.45,1.0,h));
          vec3 flo = mix(vec3(0.78,0.74,0.70), sky, smoothstep(0.0,0.45,h));
          vec3 c = h < 0.45 ? flo : sky;
          c += smoothstep(0.55, 1.0, dot(n, normalize(vec3(-0.45,0.85,0.35)))) * 2.6;
          gl_FragColor = vec4(c, 1.0);
        }`
    });
    s.add(new THREE.Mesh(new THREE.SphereGeometry(12, 32, 24), m));
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(s, 0.04).texture;
    pmrem.dispose();
    return env;
  }
  scene.environment = buildEnv();

  const key = new THREE.DirectionalLight(0xfff6ec, 1.75);
  key.position.set(-3.2, 4.4, 3.0);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xbfd8ef, 0.85);
  rim.position.set(3.4, -1.2, -2.6);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xe6f0f8, 0.32));

  // ---------- materials ------------------------------------------------------
  const beadMat = new THREE.MeshStandardMaterial({
    name: 'beads', color: 0xffffff, roughness: 0.5, metalness: 0.0, envMapIntensity: 0.9
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    name: 'glass', color: 0xfaf0e6, transparent: true, opacity: 1,
    transmission: 0.97, ior: 1.03, thickness: 0.0, roughness: 0.0,
    metalness: 0, clearcoat: 1, clearcoatRoughness: 0.04,
    envMapIntensity: 0.75, depthWrite: false
  });

  const rimMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.FrontSide,
    uniforms: { uColor: { value: new THREE.Color(0xd8b79b) }, uOpacity: { value: 1 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: `varying vec3 vN; varying vec3 vV; uniform vec3 uColor; uniform float uOpacity;
      void main(){
        float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));
        float rim = pow(f, 4.5);
        gl_FragColor = vec4(uColor, rim * 0.75 * uOpacity);
      }`
  });

  const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 7, 5), beadMat, BEADS);
  beads.name = 'bead_cloud';
  beads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  beads.frustumCulled = false;
  scene.add(beads);

  let seed = 20260802;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const PAL = [
    new THREE.Color(0x3f7fcd), new THREE.Color(0x3f7fcd), new THREE.Color(0x3f7fcd),
    new THREE.Color(0x86b8e3), new THREE.Color(0x86b8e3), new THREE.Color(0x86b8e3),
    new THREE.Color(0xfbfcfd), new THREE.Color(0xfbfcfd),
    new THREE.Color(0xf5c095), new THREE.Color(0xeeab73), new THREE.Color(0x3f7fcd)
  ];

  const pos = new Float32Array(BEADS * 3);
  const col = new Float32Array(BEADS * 3);
  const baseCol = new Float32Array(BEADS * 3);
  const scl = new Float32Array(BEADS);
  const lag = new Float32Array(BEADS);
  const spinPhase = new Float32Array(BEADS);
  const capsuleOf = new Int16Array(BEADS);
  const local = new Float32Array(BEADS * 3);

  // ---------- capsules -------------------------------------------------------
  const CAPS = 28;
  const capsules = [];
  const shells = new THREE.Group();
  shells.name = 'shells';
  scene.add(shells);
  // even, non-intersecting spread over a jittered 5x3x3 grid so the frame never
  // has a bare quadrant and no two capsules interpenetrate
  const cells = [];
  for (let gx = 0; gx < 5; gx++) for (let gy = 0; gy < 3; gy++) for (let gz = 0; gz < 3; gz++) cells.push([gx, gy, gz]);
  for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
  const placed = [];
  for (let i = 0; i < CAPS; i++) {
    const big = i < 4;
    let R = big ? 0.54 + rnd() * 0.22 : 0.15 + rnd() * 0.26;
    const cell = cells[i % cells.length];
    let home = new THREE.Vector3();
    for (let attempt = 0; attempt < 7; attempt++) {
      home.set(
        (cell[0] + 0.5 + (rnd() - 0.5) * 0.7) / 5 * 10.4 - 5.2,
        (cell[1] + 0.5 + (rnd() - 0.5) * 0.7) / 3 * 6.0 - 3.0,
        (cell[2] + 0.5 + (rnd() - 0.5) * 0.7) / 3 * 6.4 - 3.2
      );
      if (placed.every(p => home.distanceTo(p.h) > (R + p.R) * 1.3)) break;
      R *= 0.82;
    }
    if (i === 0) { home.set(0.2, 0.1, 1.6); R = 0.78; }
    placed.push({ h: home.clone(), R });
    const shell = new THREE.Mesh(new THREE.SphereGeometry(R, R > 0.4 ? 64 : 40, R > 0.4 ? 44 : 28), glassMat);
    shell.name = 'capsule_shell_' + (i + 1);
    shell.position.copy(home);
    const rim = new THREE.Mesh(new THREE.SphereGeometry(R * 1.015, 48, 32), rimMat);
    rim.name = 'capsule_rim_' + (i + 1);
    rim.renderOrder = 3;
    shell.add(rim);
    shells.add(shell);
    capsules.push({
      mesh: shell, R, home,
      amp: 0.13 + rnd() * 0.06, spd: qf(0.16 + rnd() * 0.05), ph: rnd() * 6.28,
      spin: new THREE.Vector3(qf(0.1) * (rnd() < 0.5 ? -1 : 1), qf(0.11) * (rnd() < 0.5 ? -1 : 1), qf(0.09) * (rnd() < 0.5 ? -1 : 1)),
      rot: new THREE.Euler(rnd() * 6.28, rnd() * 6.28, rnd() * 6.28),
      q: new THREE.Quaternion()
    });
    const c = capsules[capsules.length - 1];
    c.spdB = qf(c.spd * 0.83);
    c.spdC = qf(c.spd * 0.6);
  }
  {
    const w = capsules.map(c => c.R * c.R);
    const wSum = w.reduce((s, v) => s + v, 0);
    let cur = 0;
    capsules.forEach((c, ci) => {
      const count = ci === capsules.length - 1 ? BEADS - cur : Math.floor(BEADS * w[ci] / wSum);
      const patches = [];
      for (let p = 0; p < 16; p++) {
        const u = rnd() * 2 - 1, th = rnd() * 6.283, s = Math.sqrt(1 - u * u);
        patches.push({ d: new THREE.Vector3(s * Math.cos(th), u, s * Math.sin(th)), c: PAL[Math.floor(rnd() * PAL.length)] });
      }
      for (let k = 0; k < count; k++) {
        const id = cur + k;
        const u = rnd() * 2 - 1, th = rnd() * 6.283, s = Math.sqrt(1 - u * u);
        const dir = new THREE.Vector3(s * Math.cos(th), u, s * Math.sin(th));
        const r = c.R * 0.945 * (0.80 + Math.cbrt(rnd()) * 0.20);
        local[id * 3] = dir.x * r; local[id * 3 + 1] = dir.y * r; local[id * 3 + 2] = dir.z * r;
        capsuleOf[id] = ci;
        const s0 = Math.min(0.018, Math.max(0.008, c.R * 0.027));
        scl[id] = s0 * (0.85 + rnd() * 0.38);
        lag[id] = 0.055 + rnd() * 0.012;
        spinPhase[id] = rnd() * 6.28;
        let best = patches[0], bd = -2;
        for (const p of patches) { const dot = dir.dot(p.d) + (rnd() - 0.5) * 0.045; if (dot > bd) { bd = dot; best = p; } }
        const cc = rnd() < 0.05 ? PAL[Math.floor(rnd() * PAL.length)] : best.c;
        baseCol[id * 3] = cc.r; baseCol[id * 3 + 1] = cc.g; baseCol[id * 3 + 2] = cc.b;
        col[id * 3] = cc.r; col[id * 3 + 1] = cc.g; col[id * 3 + 2] = cc.b;
        pos[id * 3] = c.home.x + local[id * 3];
        pos[id * 3 + 1] = c.home.y + local[id * 3 + 1];
        pos[id * 3 + 2] = c.home.z + local[id * 3 + 2];
      }
      cur += count;
    });
  }
  beads.instanceColor = new THREE.InstancedBufferAttribute(col, 3);
  beads.instanceColor.setUsage(THREE.DynamicDrawUsage);

  // ---------- dispersed cloud ------------------------------------------------
  const cloud = new Float32Array(BEADS * 3);
  for (let i = 0; i < BEADS; i++) {
    const u = rnd() * 2 - 1, th = rnd() * 6.283, s = Math.sqrt(1 - u * u);
    const r = 1.3 + Math.cbrt(rnd()) * 1.9;
    cloud[i * 3] = s * Math.cos(th) * r * 1.35;
    cloud[i * 3 + 1] = u * r * 0.85;
    cloud[i * 3 + 2] = s * Math.sin(th) * r * 0.75;
  }

  // ---------- antibodies: IgG from real domain chains ------------------------
  const AB = 26;
  const abodies = [];
  for (let i = 0; i < AB; i++) {
    abodies.push({
      p: i === 0 ? new THREE.Vector3(0, 0, 0.5)
        : new THREE.Vector3(
            (rnd() - 0.5) * 9.6,
            // upper half gets the denser scatter
            (i % 3 === 0 ? 0.35 + rnd() * 0.65 : rnd() * 2 - 1) * 2.6,
            (rnd() - 0.5) * 2.6
          ),
      q: new THREE.Quaternion().setFromEuler(new THREE.Euler(rnd() * 6.28, rnd() * 6.28, rnd() * 6.28)),
      s: i === 0 ? 1.15 : (i < 5 ? 0.45 + rnd() * 0.28 : 0.14 + rnd() * 0.2),
      q0: null,
      spin: new THREE.Vector3(qf(0.1) * (rnd() < 0.5 ? -1 : 1), qf(0.12) * (rnd() < 0.5 ? -1 : 1), qf(0.08) * (rnd() < 0.5 ? -1 : 1)),
      tipWarm: Math.floor(rnd() * 3)
    });
  }
  for (const o of abodies) o.q0 = o.q.clone();
  const abLocal = new Float32Array(BEADS * 3);
  const abCol = new Float32Array(BEADS * 3);
  const abOf = new Int16Array(BEADS);

  const AB_BLUE = new THREE.Color(0x4b86cd), AB_MID = new THREE.Color(0x7fb0da),
        AB_PALE = new THREE.Color(0xc3dcee), AB_WHITE = new THREE.Color(0xf2f2ee),
        AB_PEACH = new THREE.Color(0xf1c3a0), AB_PEACH_D = new THREE.Color(0xe3a377);

  // two heavy + two light chains: Fc and each Fab arm are parallel domain stacks,
  // which is what gives the real molecule its grooved, finger-like arms
  function lobes(tipWarm) {
    const L = [];
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const down = V(0, -1, 0);
    const add = (c, rx, ry, rz, axis, kind) => L.push({
      c: c.clone(), r: V(rx, ry, rz),
      q: new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), axis.clone().normalize()),
      kind
    });
    add(V(0, -0.10, 0), 0.052, 0.10, 0.052, down, 'pale');
    add(V(0, 0.02, 0), 0.045, 0.07, 0.045, down, 'pale');
    for (const off of [-0.072, 0.072]) {
      for (const [y, r, ry] of [[-0.26, 0.108, 0.15], [-0.50, 0.118, 0.16], [-0.72, 0.112, 0.15], [-0.90, 0.088, 0.11]])
        add(V(off, y, off * 0.25), r, ry, r * 1.05, down, 'body');
    }
    for (const sgn of [-1, 1]) {
      const dir = V(sgn * 0.70, 0.80, sgn * 0.08).normalize();
      const side = new THREE.Vector3().crossVectors(dir, V(0, 0, 1)).normalize();
      const warm = tipWarm === 0 ? sgn < 0 : tipWarm === 1 ? sgn > 0 : true;
      for (const off of [-0.075, 0.075]) {
        for (const [t, r, ry] of [[0.20, 0.078, 0.125], [0.44, 0.084, 0.135], [0.68, 0.086, 0.135], [0.90, 0.082, 0.125], [1.06, 0.070, 0.10]]) {
          const spread = off * (1 + Math.max(0, t - 0.6) * 0.5);
          add(dir.clone().multiplyScalar(t).addScaledVector(side, spread), r, ry, r * 1.05, dir, t >= 0.85 ? (warm ? 'tip' : 'pale') : 'body');
        }
      }
    }
    return L;
  }
  {
    const wA = abodies.map(o => o.s * o.s);
    const tot = wA.reduce((s, v) => s + v, 0);
    const tmp = new THREE.Color();
    let c2 = 0;
    abodies.forEach((o, oi) => {
      const count = oi === AB - 1 ? BEADS - c2 : Math.floor(BEADS * wA[oi] / tot);
      const L = lobes(o.tipWarm);
      const area = L.map(l => l.r.x * l.r.y + l.r.y * l.r.z + l.r.x * l.r.z);
      const aTot = area.reduce((s, a) => s + a, 0);
      const cum = []; let a2 = 0;
      for (const a of area) { a2 += a / aTot; cum.push(a2); }
      for (let k = 0; k < count; k++) {
        const id = c2 + k;
        const pick = rnd();
        let li = 0; while (li < cum.length - 1 && pick > cum[li]) li++;
        const l = L[li];
        const u = rnd() * 2 - 1, th = rnd() * 6.283, ss = Math.sqrt(1 - u * u);
        const n = new THREE.Vector3(ss * Math.cos(th), u, ss * Math.sin(th));
        const depth = 1 - Math.pow(rnd(), 2.6) * 0.22;
        const p = new THREE.Vector3(n.x * l.r.x, n.y * l.r.y, n.z * l.r.z)
          .multiplyScalar(depth).applyQuaternion(l.q).add(l.c);
        abLocal[id * 3] = p.x; abLocal[id * 3 + 1] = p.y; abLocal[id * 3 + 2] = p.z;
        abOf[id] = oi;
        const roll = rnd();
        let base;
        if (l.kind === 'tip') base = roll < 0.55 ? AB_PEACH : (roll < 0.78 ? AB_PEACH_D : AB_WHITE);
        else if (l.kind === 'pale') base = roll < 0.6 ? AB_PALE : AB_WHITE;
        else base = roll < 0.42 ? AB_BLUE : (roll < 0.72 ? AB_MID : (roll < 0.9 ? AB_PALE : AB_WHITE));
        tmp.copy(base).offsetHSL(0, 0, (n.y * 0.5 + n.x * 0.2) * 0.05);
        tmp.convertSRGBToLinear();
        abCol[id * 3] = tmp.r; abCol[id * 3 + 1] = tmp.g; abCol[id * 3 + 2] = tmp.b;
      }
      c2 += count;
    });
  }

  // ---------- vortex ring (the swirl the antibodies collapse into) -----------
  const RING_N = new THREE.Vector3(0.16, 0.80, 0.58).normalize();
  const RING_U = new THREE.Vector3().crossVectors(RING_N, new THREE.Vector3(0, 0, 1)).normalize();
  const RING_V = new THREE.Vector3().crossVectors(RING_N, RING_U).normalize();
  const vTheta = new Float32Array(BEADS);   // start angle
  const vMajor = new Float32Array(BEADS);   // ring radius
  const vTube = new Float32Array(BEADS * 3);// offset inside the tube
  const vSpeed = new Float32Array(BEADS);
  const vortexCol = new Float32Array(BEADS * 3);
  {
    const STREAK = [new THREE.Color(0xe89a5f), new THREE.Color(0xf0c49b), new THREE.Color(0x3f7cc4), new THREE.Color(0x7fb0da), new THREE.Color(0xf4f4f0)];
    const tmp = new THREE.Color();
    for (let i = 0; i < BEADS; i++) {
      const th = rnd() * 6.283;
      vTheta[i] = th;
      const maj = 1.85 + rnd() * 1.15;
      vMajor[i] = maj;
      const a = rnd() * 6.283, rr = Math.sqrt(rnd()) * 0.62;
      vTube[i * 3] = Math.cos(a) * rr;             // along ring normal
      vTube[i * 3 + 1] = Math.sin(a) * rr * 0.75;  // radial
      vTube[i * 3 + 2] = (rnd() - 0.5) * 0.3;      // extra jitter
      vSpeed[i] = qf(0.5 + (3.0 - maj) * 0.12 + rnd() * 0.05);
      // colour streaks banded around the ring, like the video's orange/blue swirl
      const band = Math.floor((th / 6.283 * 5 + rnd() * 0.28) % 5);
      tmp.copy(STREAK[band]).offsetHSL(0, 0, (rnd() - 0.5) * 0.06).convertSRGBToLinear();
      vortexCol[i * 3] = tmp.r; vortexCol[i * 3 + 1] = tmp.g; vortexCol[i * 3 + 2] = tmp.b;
    }
  }
  function vortexAt(i, t, out) {
    const th = vTheta[i] + t * vSpeed[i];
    const c = Math.cos(th), s = Math.sin(th);
    const maj = vMajor[i] + vTube[i * 3 + 1];
    out.set(
      (RING_U.x * c + RING_V.x * s) * maj + RING_N.x * vTube[i * 3] + vTube[i * 3 + 2] * 0.3,
      (RING_U.y * c + RING_V.y * s) * maj + RING_N.y * vTube[i * 3],
      (RING_U.z * c + RING_V.z * s) * maj + RING_N.z * vTube[i * 3]
    );
    return out;
  }
  const tangent = (i, t, out) => {
    const th = vTheta[i] + t * vSpeed[i];
    const c = Math.cos(th), s = Math.sin(th);
    return out.set(-RING_U.x * s + RING_V.x * c, -RING_U.y * s + RING_V.y * c, -RING_U.z * s + RING_V.z * c);
  };

  // ---------- portrait -------------------------------------------------------
  const portrait = new Float32Array(BEADS * 3);
  const portraitCol = new Float32Array(BEADS * 3);
  const portraitScl = new Float32Array(BEADS).fill(1);
  let portraitReady = false;
  const portraitFade = new Float32Array(BEADS).fill(1);
  let pAspect = 1.34;
  {
    // portrait point cloud, embedded so the file is fully self-contained
    const raw = atob(PORTRAIT_DATA);
    const B = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) B[i] = raw.charCodeAt(i);
    const NP = B.length / 10;
    pAspect = 1.33794;
    const tmp = new THREE.Color();
    for (let i = 0; i < BEADS; i++) {
      const o = (i % NP) * 10;
      const px = ((B[o] | (B[o+1] << 8)) / 65535) - 0.5;
      const py = ((B[o+2] | (B[o+3] << 8)) / 65535) - 0.5;
      const lum = B[o+7] / 255, edg = B[o+8] / 255, fw = B[o+9] / 255;
      const x = px * pAspect, y = py;
      const bulge = Math.max(0, 1 - (x * x) / (pAspect * pAspect * 1.6) - (y * y) / 1.6);
      const edge = Math.min(0.5 - Math.abs(px), 0.5 - Math.abs(py)) / 0.07;
      portraitFade[i] = Math.min(1, Math.max(0, edge));
      const scatter = (1 - portraitFade[i]) * (0.022 - fw * 0.02) * (1 - edg * 0.9);
      portrait[i * 3] = x + (rnd() - 0.5) * scatter * pAspect;
      portrait[i * 3 + 1] = y + (rnd() - 0.5) * scatter;
      portrait[i * 3 + 2] = ((lum - 0.25) * 2.6 + bulge * 0.25 + (rnd() - 0.5) * (0.03 - fw * 0.024)) / 6;
      tmp.setRGB(B[o+4] / 255, B[o+5] / 255, B[o+6] / 255).offsetHSL(0, 0.06, -0.03).convertSRGBToLinear();
      portraitCol[i * 3] = tmp.r * 0.88; portraitCol[i * 3 + 1] = tmp.g * 0.88; portraitCol[i * 3 + 2] = tmp.b * 0.88;
      // hair and clothing (blue, away from the faces) clump into big beads;
      // skin stays fine — the size contrast the reference gets its texture from
      const blueness = (B[o+6] - B[o+4]) / 255;
      const clump = Math.max(0, Math.min(1, blueness * 3.2)) * (1 - fw * 0.7);
      portraitScl[i] = (1.15 - fw * 0.3 - edg * 0.8) * (1 + clump * 1.6);
    }
    portraitReady = true;
  }

  // ---------- timeline -------------------------------------------------------
  let time = 0;
  const playing = true;
  function resize() {
    camera.aspect = VW() / VH(); camera.updateProjectionMatrix();
    renderer.setSize(VW(), VH(), false);
    rt.dispose();
    rt = makeRT();
    postMat.uniforms.tColor.value = rt.texture;
    postMat.uniforms.tDepth.value = rt.depthTexture;
    postMat.uniforms.uTexel.value.set(1 / VW(), 1 / VH());
  }
  if (typeof ResizeObserver === 'function') new ResizeObserver(resize).observe(canvas);
  else addEventListener('resize', resize);

  const smooth = t => t * t * (3 - 2 * t);
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const actAt = t => { for (let i = ACTS.length - 1; i >= 0; i--) if (t >= ACTS[i].t) return i; return 0; };

  const CAM = [
    { p: new THREE.Vector3(0.1, 0.05, 7.6), l: new THREE.Vector3(0, 0, 1.6) },
    { p: new THREE.Vector3(0.6, 0.25, 8.8), l: new THREE.Vector3(0, 0, 0) },
    { p: new THREE.Vector3(-0.3, 0.1, 7.4),  l: new THREE.Vector3(0, 0, 0.3) },
    { p: new THREE.Vector3(0.1, 0.5, 5.4),   l: new THREE.Vector3(0, 0, 0) },
    { p: new THREE.Vector3(0.0, 0.0, 8.9),   l: new THREE.Vector3(0, 0, 0) },
    { p: new THREE.Vector3(0.1, 0.05, 8.6), l: new THREE.Vector3(0, 0, 0.8) }
  ];

  // ---------- post: depth of field + bloom + filmic tone map -----------------
  const postScene = new THREE.Scene();
  const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const postMat = new THREE.ShaderMaterial({
    uniforms: {
      tColor: { value: rt.texture }, tDepth: { value: rt.depthTexture },
      uTexel: { value: new THREE.Vector2(1 / VW(), 1 / VH()) },
      uNear: { value: camera.near }, uFar: { value: camera.far },
      uFocus: { value: 6.0 }, uAperture: { value: 0.3 }, uMaxCoC: { value: 6.0 },
      uExposure: { value: 1.0 }, uTime: { value: 0 }
    },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D tColor;
      uniform sampler2D tDepth;
      uniform vec2 uTexel;
      uniform float uNear, uFar, uFocus, uAperture, uMaxCoC, uExposure, uTime;

      float viewZ(float d) { return (2.0 * uNear * uFar) / (uFar + uNear - (d * 2.0 - 1.0) * (uFar - uNear)); }
      float coc(float d) {
        float z = viewZ(d);
        return clamp(abs(z - uFocus) / max(z, 0.4) * uAperture, 0.0, 1.0) * uMaxCoC;
      }
      vec3 aces(vec3 x) {
        return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
      }

      void main() {
        float dCentre = texture2D(tDepth, vUv).r;
        float r = coc(dCentre);

        vec3 sum = texture2D(tColor, vUv).rgb;
        float wsum = 1.0;
        // golden-angle disk: taps scale with the circle of confusion
        for (int i = 0; i < 12; i++) {
          float fi = float(i) + 0.5;
          float ang = fi * 2.39996323;
          float rad = sqrt(fi / 12.0) * r;
          vec2 off = vec2(cos(ang), sin(ang)) * rad * uTexel;
          vec2 uv = vUv + off;
          float dS = texture2D(tDepth, uv).r;
          float rS = coc(dS);
          // only let samples bleed in if they are themselves defocused enough
          float w = smoothstep(rad - 1.5, rad + 1.5, max(rS, r));
          sum += texture2D(tColor, uv).rgb * w;
          wsum += w;
        }
        vec3 c = sum / wsum;

        c = 1.0 - exp(-c * uExposure);
        c = pow(c, vec3(1.0 / 2.2));
        gl_FragColor = vec4(c, 1.0);
      }
    `
  });
  postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat));

  // aperture per act: wide open on the close capsule field and the portrait swirl
  const APERTURE = [0.12, 0.24, 0.22, 0.3, 0.26, 0.12];

  const DR = {
    w: qf(0.35), w2: qf(0.3), a: qf(0.6), b: qf(0.72), c: qf(0.5),
    wob: qf(1.6), cx: qf(0.13), cy: qf(0.1), cz: qf(0.07), swirl: qf(0.35)
  };
  const E = new THREE.Euler();

  const M = new THREE.Matrix4();
  const V = new THREE.Vector3();
  const T = new THREE.Vector3();
  const S = new THREE.Vector3();
  const Q = new THREE.Quaternion();
  const camLook = new THREE.Vector3();
  const IDQ = new THREE.Quaternion();
  let last = performance.now();
  let frameCount = 0;

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (playing) time = (time + dt) % TOTAL;
    const act = actAt(time);
    const A = ACTS[act];
    const lt = (time - A.t) / A.d;

    for (const c of capsules) {
      c.mesh.position.set(
        c.home.x + Math.sin(time * c.spd + c.ph) * c.amp,
        c.home.y + Math.cos(time * c.spdB + c.ph * 1.7) * c.amp,
        c.home.z + Math.sin(time * c.spdC + c.ph * 2.1) * c.amp * 0.7
      );
      c.mesh.rotation.set(c.rot.x + time * c.spin.x, c.rot.y + time * c.spin.y, c.rot.z + time * c.spin.z);
      c.mesh.updateMatrix();
      c.q.setFromEuler(c.mesh.rotation);
    }

    let shellOpacity = 1;
    if (act === 1) shellOpacity = 1 - smooth(Math.min(1, lt / 0.4));
    else if (act >= 2 && act <= 4) shellOpacity = 0;
    else if (act === 5) shellOpacity = smooth(Math.max(0, (lt - 0.55) / 0.45));
    glassMat.opacity = shellOpacity * 0.32;   // a faint film, not a white ball
    glassMat.transmission = 0.97;
    shells.visible = shellOpacity > 0.01;
    // shells expand slightly as they go, so the exit reads as a burst not a dissolve
    const shellScale = 1 + (1 - shellOpacity) * 0.1;
    shells.scale.setScalar(shellScale);

    for (const o of abodies) {
      o.q.copy(o.q0).multiply(Q.setFromEuler(E.set(o.spin.x * time, o.spin.y * time, o.spin.z * time)));
    }

    // scale the portrait so the whole image always fits the viewport
    const pDist = Math.max(1, camera.position.z - 0.3);
    const visH = 2 * pDist * Math.tan(camera.fov * Math.PI / 360);
    // fill the frame edge to edge (cover), keeping the faces centred
    const pFit = Math.max(visH * camera.aspect / pAspect, visH) * 1.02;
    const pShiftY = -0.06 * pFit;

    const swirl = time * DR.swirl;
    for (let i = 0; i < BEADS; i++) {
      const i3 = i * 3;
      let sizeMul = 1;
      let cr, cg, cb;

      if (act === 0 || (act === 5 && lt > 0.45)) {
        const c = capsules[capsuleOf[i]];
        V.set(local[i3], local[i3 + 1], local[i3 + 2]).applyQuaternion(c.q).add(c.mesh.position);
        cr = baseCol[i3]; cg = baseCol[i3 + 1]; cb = baseCol[i3 + 2];
      } else if (act === 1) {
        const c = capsules[capsuleOf[i]];
        V.set(local[i3], local[i3 + 1], local[i3 + 2]).applyQuaternion(c.q).add(c.mesh.position);
        const k = morphK(lt, i, 131);
        V.lerp(S.set(cloud[i3], cloud[i3 + 1], cloud[i3 + 2]), k);
        cr = baseCol[i3]; cg = baseCol[i3 + 1]; cb = baseCol[i3 + 2];
      } else if (act === 2) {
        const o = abodies[abOf[i]];
        V.set(abLocal[i3] * o.s, abLocal[i3 + 1] * o.s, abLocal[i3 + 2] * o.s).applyQuaternion(o.q).add(o.p);
        const k = morphK(lt * 7.0, i, 97);
        S.set(cloud[i3], cloud[i3 + 1], cloud[i3 + 2]);
        V.lerpVectors(S, V, k);
        sizeMul = 0.7 + 0.8 * k;
        cr = baseCol[i3] + (abCol[i3] - baseCol[i3]) * k;
        cg = baseCol[i3 + 1] + (abCol[i3 + 1] - baseCol[i3 + 1]) * k;
        cb = baseCol[i3 + 2] + (abCol[i3 + 2] - baseCol[i3 + 2]) * k;
      } else if (act === 3) {
        // antibodies unravel into a spinning vortex ring
        const o = abodies[abOf[i]];
        T.set(abLocal[i3] * o.s, abLocal[i3 + 1] * o.s, abLocal[i3 + 2] * o.s).applyQuaternion(o.q).add(o.p);
        vortexAt(i, time, V);
        const k = morphK(lt, i, 149);
        V.lerpVectors(T, V, k);
        sizeMul = 1.45 - 0.35 * k;
        cr = abCol[i3] + (vortexCol[i3] - abCol[i3]) * k;
        cg = abCol[i3 + 1] + (vortexCol[i3 + 1] - abCol[i3 + 1]) * k;
        cb = abCol[i3 + 2] + (vortexCol[i3 + 2] - abCol[i3 + 2]) * k;
      } else if (act === 4 && portraitReady) {
        // beads peel off the spinning ring and settle onto the figures,
        // curving in along the ring tangent the way the video's swirl does
        vortexAt(i, time, T);
        const k = morphK(lt * 3.2, i, 211);
        V.set(portrait[i3] * pFit, portrait[i3 + 1] * pFit + pShiftY, portrait[i3 + 2] * pFit).sub(T).multiplyScalar(k).add(T);
        if (k > 0.001 && k < 0.999) {
          tangent(i, time, S).multiplyScalar(Math.sin(k * Math.PI) * 1.15);
          V.add(S);
        }
        const pSize = Math.max(0.42, portraitScl[i]) * 1.5 * (pFit / 6.0) * (0.6 + 0.4 * portraitFade[i]);
        sizeMul = 1.1 + (pSize - 1.1) * k;
        cr = vortexCol[i3] + (portraitCol[i3] - vortexCol[i3]) * k;
        cg = vortexCol[i3 + 1] + (portraitCol[i3 + 1] - vortexCol[i3 + 1]) * k;
        cb = vortexCol[i3 + 2] + (portraitCol[i3 + 2] - vortexCol[i3 + 2]) * k;
      } else if (act === 4) {
        // portrait data still loading: hold the vortex rather than showing mush
        vortexAt(i, time, V);
        sizeMul = 1.1;
        cr = vortexCol[i3]; cg = vortexCol[i3 + 1]; cb = vortexCol[i3 + 2];
      } else {
        // straight from the figures back into the capsules — no cloud scene in between
        const c = capsules[capsuleOf[i]];
        T.set(local[i3], local[i3 + 1], local[i3 + 2]).applyQuaternion(c.q).add(c.mesh.position);
        const back = morphK(lt * 1.6, i, 173);
        S.set(portrait[i3] * pFit, portrait[i3 + 1] * pFit + pShiftY, portrait[i3 + 2] * pFit);
        V.lerpVectors(S, T, back);
        const kc = Math.min(1, Math.max(0, back * 1.6 - 0.35));
        cr = portraitCol[i3] + (baseCol[i3] - portraitCol[i3]) * kc;
        cg = portraitCol[i3 + 1] + (baseCol[i3 + 1] - portraitCol[i3 + 1]) * kc;
        cb = portraitCol[i3 + 2] + (baseCol[i3 + 2] - portraitCol[i3 + 2]) * kc;
        // hold the portrait's fine bead size until the figures actually break apart
        const pS = Math.max(0.42, portraitScl[i]) * 1.5 * (pFit / 6.0) * (0.35 + 0.65 * portraitFade[i]);
        sizeMul = pS + (1 - pS) * kc;
      }

      // nothing is ever fully still: every bead keeps a slow individual drift,
      // and the settled portrait breathes with a travelling wave
      if (act === 4) {
        // coherent, very soft swell: neighbours move together so features hold
        const w = Math.sin(time * DR.w + V.x * 0.5 + V.y * 0.3);
        V.z += w * 0.035;
        V.x += w * 0.006;
        V.y += Math.cos(time * DR.w2 + V.x * 0.4) * 0.006;
      } else {
        const ph = spinPhase[i];
        V.x += Math.sin(time * DR.a + ph) * 0.01;
        V.y += Math.cos(time * DR.b + ph * 1.3) * 0.01;
        V.z += Math.sin(time * DR.c + ph * 0.7) * 0.016;
      }

      const kk = 1 - Math.pow(1 - lag[i], dt * 60);
      pos[i3] += (V.x - pos[i3]) * kk;
      pos[i3 + 1] += (V.y - pos[i3 + 1]) * kk;
      pos[i3 + 2] += (V.z - pos[i3 + 2]) * kk;

      const wob = 1 + Math.sin(time * DR.wob + spinPhase[i]) * 0.05;
      M.compose(V.set(pos[i3], pos[i3 + 1], pos[i3 + 2]), IDQ, S.setScalar(scl[i] * wob * sizeMul));
      beads.setMatrixAt(i, M);

      col[i3] += (cr - col[i3]) * 0.18;
      col[i3 + 1] += (cg - col[i3 + 1]) * 0.18;
      col[i3 + 2] += (cb - col[i3 + 2]) * 0.18;
    }
    beads.instanceMatrix.needsUpdate = true;
    if ((frameCount++ & 1) === 0) beads.instanceColor.needsUpdate = true;

    const c0 = CAM[act], c1 = CAM[(act + 1) % CAM.length];
    const ck = ease(Math.min(1, Math.max(0, (lt - 0.68) / 0.32)));
    camera.position.lerpVectors(c0.p, c1.p, ck);
    camera.position.x += Math.sin(time * DR.cx) * 0.34;
    camera.position.y += Math.cos(time * DR.cy) * 0.2;
    camera.position.z += Math.sin(time * DR.cz) * 0.18;
    camLook.lerpVectors(c0.l, c1.l, ck);
    camera.lookAt(camLook);

    // focus on whatever the camera is looking at, with act-dependent aperture
    const focusTarget = (act === 0 || act === 5)
      ? camera.position.distanceTo(capsules[0].mesh.position)
      : camera.position.distanceTo(camLook);
    postMat.uniforms.uFocus.value += (focusTarget - postMat.uniforms.uFocus.value) * 0.08;
    const apNext = APERTURE[act];
    postMat.uniforms.uAperture.value += (apNext - postMat.uniforms.uAperture.value) * 0.04;
    const expTarget = 1.0;
    postMat.uniforms.uExposure.value += (expTarget - postMat.uniforms.uExposure.value) * 0.05;
    postMat.uniforms.uTime.value = time;

    renderer.setRenderTarget(rt);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.render(postScene, postCam);
    raf = requestAnimationFrame(frame);
  }

  let raf = 0;
  let running = false;
  function play() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    running = false;
    cancelAnimationFrame(raf);
  }
  if (typeof IntersectionObserver === 'function') {
    new IntersectionObserver(
      (entries) => { for (const e of entries) (e.isIntersecting ? play : pause)(); },
      { threshold: 0 },
    ).observe(canvas);
  } else {
    play();
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
  canvas.dataset.microcapsule = 'ready';
}
