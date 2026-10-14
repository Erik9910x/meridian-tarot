/**
 * Meridian Tarot — 3D AR Experience (Three.js r128 + MediaPipe Hands)
 * Optimized for full canonical 78-card deck with even card separation
 * Strictly conforms to SPEC.md & Meridian Design Principles
 */

class TarotARScene {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('canvas-container');
    this.onCardPicked = options.onCardPicked || (() => {});
    this.onDrawComplete = options.onDrawComplete || (() => {});
    this.onStatusChange = options.onStatusChange || (() => {});

    // Recalibrated for 78 cards: Radius 12.8 gives circumference ~80.4,
    // ensuring ~1.03 units per card with width 0.98 -> clean, even separation!
    this.CONFIG = {
      cardCount: 78,
      radius: 12.8,
      cardWidth: 0.98,
      cardHeight: 1.76,
      inspectPos: { x: 0, y: 0, z: 4.4 },
      inspectScale: 0.58,
      storageScale: 0.085,
      storageZ: 3.5,
      storeMarginX: 0.12,
      storeMarginTop: 1.05,
      storeGapY: 0.26
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cardGroup = null;
    this.textureLoader = null;
    this.raycaster = null;
    this.mouse = null;
    this.starFieldMesh = null;

    this.explosions = [];
    this.storedCards = [];
    this.inspectingCard = null;
    this.isGameActive = false;
    this.animFrameId = null;

    this.particleTexture = null;
    this.handX = 0.5;
    this.isPinching = false;
    this.cursorPosition = { x: 0, y: 0 };
    this.rotationSpeed = 0.0018;
    this.hasCameraAccess = false;
    this.mediaStream = null;
    this.hands = null;
    this.cam = null;

    // Shared Three.js resources for high performance & zero memory waste
    this.sharedCardGeo = null;
    this.sharedEdgeMat = null;
    this.sharedBackMat = null;

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onResize = this._onResize.bind(this);
    this._animate = this._animate.bind(this);
    this._onHandResults = this._onHandResults.bind(this);
  }

  generateParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(235, 238, 231, 0.8)');
    grad.addColorStop(1, 'rgba(235, 238, 231, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const tex = new THREE.Texture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  init(deckData) {
    if (!this.container) return;
    this.container.innerHTML = '';
    this.storedCards = [];
    this.inspectingCard = null;
    this.explosions = [];
    this.isGameActive = true;

    // 1. Scene & Fog (Meridian atmospheric sage-tinted fog)
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x060807, 0.012);

    // 2. Camera: Positioned to frame the widened 12.8-radius orbit comfortably
    this.camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0.35, 7.2);

    // 3. Renderer (Capped DPR for 60fps)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights: Atmospheric warm lighting with green-gold rim reflections
    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambient);

    const spotLight = new THREE.SpotLight(0xfffaed, 2.4);
    spotLight.position.set(0, 14, 14);
    this.scene.add(spotLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 0.9);
    rimLight.position.set(0, -6, -6);
    this.scene.add(rimLight);

    this.textureLoader = new THREE.TextureLoader();
    this.particleTexture = this.generateParticleTexture();

    // 5. Shared Geometry & Materials (High performance)
    this.sharedCardGeo = new THREE.BoxGeometry(this.CONFIG.cardWidth, this.CONFIG.cardHeight, 0.02);
    this.sharedEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25
    });

    const backTex = this.textureLoader.load('assets/tarot/card-back.png', undefined, undefined, () => {
      this.textureLoader.load('back.png');
    });
    this.sharedBackMat = new THREE.MeshStandardMaterial({ map: backTex, color: 0xffffff, roughness: 0.4 });

    // 6. Build Deck with Even Distribution
    const shuffledDeck = this._shuffle([...deckData]);
    this._createCards(shuffledDeck);
    this._createBackgroundStars();

    // 7. Raycasting & Events
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    window.addEventListener('resize', this._onResize);
    window.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('touchstart', this._onTouchStart, { passive: false });

    // Start Animation Loop
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this._animate(0);
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  _createCards(deck) {
    this.cardGroup = new THREE.Group();
    this.scene.add(this.cardGroup);

    const total = deck.length;
    deck.forEach((cardData, i) => {
      const frontTex = this.textureLoader.load(cardData.image);
      const matFront = new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.35 });

      // Materials order: [px, nx, py, ny, pz (front/back), nz]
      const materials = [
        this.sharedEdgeMat,
        this.sharedEdgeMat,
        this.sharedEdgeMat,
        this.sharedEdgeMat,
        this.sharedBackMat,
        matFront
      ];

      const card = new THREE.Mesh(this.sharedCardGeo, materials);

      // Tách đều 78 lá bài quanh đường tròn bán kính 12.8
      const angle = (i / total) * Math.PI * 2;
      const x = Math.sin(angle) * this.CONFIG.radius;
      const z = Math.cos(angle) * this.CONFIG.radius;
      // Nhấp nhô nhẹ theo sóng lượng giác để tạo chiều sâu tự nhiên, không che khuất
      const y = Math.sin(angle * 6) * 0.22;

      card.position.set(x, y, z);
      card.lookAt(0, y * 0.4, 0);

      card.userData = {
        id: cardData.id,
        data: cardData,
        isPicked: false,
        baseY: y,
        index: i
      };

      this.cardGroup.add(card);
    });
  }

  _createBackgroundStars() {
    const starCount = 950;
    const geo = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];

    for (let i = 0; i < starCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 70 - 15
      );
      sizes.push(Math.random() * 0.55 + 0.15);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const sprite = this.textureLoader.load('sparkle.png');
    const mat = new THREE.PointsMaterial({
      size: 0.9,
      map: sprite,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xffffff
    });

    this.starFieldMesh = new THREE.Points(geo, mat);
    this.scene.add(this.starFieldMesh);
  }

  createExplosion(position) {
    const particleCount = 140;
    const geo = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];
    const sizes = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push(position.x, position.y, position.z);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = Math.random() * 0.035 + 0.012;

      velocities.push(
        speed * Math.sin(phi) * Math.cos(theta),
        speed * Math.sin(phi) * Math.sin(theta),
        speed * Math.cos(phi)
      );
      sizes.push(Math.random() * 0.18 + 0.06);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.25,
      map: this.particleTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xfff8e7
    });

    const points = new THREE.Points(geo, mat);
    this.scene.add(points);
    this.explosions.push({ mesh: points, velocities, age: 0 });
  }

  updateExplosions() {
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const ex = this.explosions[i];
      const posArr = ex.mesh.geometry.attributes.position.array;
      ex.age += 1;

      for (let j = 0; j < ex.velocities.length / 3; j++) {
        posArr[j * 3] += ex.velocities[j * 3];
        posArr[j * 3 + 1] += ex.velocities[j * 3 + 1];
        posArr[j * 3 + 2] += ex.velocities[j * 3 + 2];
      }
      ex.mesh.geometry.attributes.position.needsUpdate = true;
      ex.mesh.material.opacity = Math.max(0, 1 - ex.age / 55);
      ex.mesh.scale.setScalar(1 + ex.age * 0.012);

      if (ex.age > 55) {
        this.scene.remove(ex.mesh);
        ex.mesh.geometry.dispose();
        ex.mesh.material.dispose();
        this.explosions.splice(i, 1);
      }
    }
  }

  pickCard(cardMesh) {
    if (!this.isGameActive || this.inspectingCard || this.storedCards.length >= 3 || cardMesh.userData.isPicked) {
      return;
    }

    cardMesh.userData.isPicked = true;
    this.inspectingCard = cardMesh;
    this.scene.attach(cardMesh);

    // Call external progress hook
    this.onCardPicked(this.storedCards.length + 1, cardMesh.userData.data);

    // Reveal and Flip to face camera
    new TWEEN.Tween(cardMesh.position)
      .to(this.CONFIG.inspectPos, 900)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(cardMesh.rotation)
      .to({ x: 0, y: Math.PI, z: 0 }, 900)
      .easing(TWEEN.Easing.Back.Out)
      .start();

    const targetScale = this.CONFIG.inspectScale;
    new TWEEN.Tween(cardMesh.scale)
      .to({ x: targetScale, y: targetScale, z: targetScale }, 900)
      .onComplete(() => {
        setTimeout(() => {
          this.createExplosion(cardMesh.position);
          setTimeout(() => this.storeCard(), 120);
        }, 1200);
      })
      .start();
  }

  getSafeVerticalLeftPosition(index) {
    const dist = this.camera.position.z - this.CONFIG.storageZ;
    const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
    const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
    const visibleWidth = visibleHeight * this.camera.aspect;

    const leftEdge = -visibleWidth / 2;
    const topEdge = visibleHeight / 2;

    const x = leftEdge + this.CONFIG.storeMarginX;
    const y = topEdge - this.CONFIG.storeMarginTop - index * this.CONFIG.storeGapY;

    return { x, y, z: this.CONFIG.storageZ };
  }

  storeCard() {
    if (!this.inspectingCard) return;
    const card = this.inspectingCard;
    this.storedCards.push(card);
    this.inspectingCard = null;

    const index = this.storedCards.length - 1;
    const pos = this.getSafeVerticalLeftPosition(index);
    const scale = this.CONFIG.storageScale;

    new TWEEN.Tween(card.position)
      .to({ x: pos.x, y: pos.y, z: pos.z }, 750)
      .easing(TWEEN.Easing.Exponential.Out)
      .start();

    new TWEEN.Tween(card.scale)
      .to({ x: scale, y: scale, z: scale }, 750)
      .start();

    this.repositionStoredCards();

    // Check if 3 cards drawn
    if (this.storedCards.length >= 3) {
      this.isGameActive = false;
      this.onStatusChange('Định mệnh đã an bài... Đang kết nối trí tuệ vũ trụ...');
      setTimeout(() => {
        this.onDrawComplete(this.storedCards.map(c => ({ id: c.userData.id, data: c.userData.data })));
      }, 1500);
    }
  }

  repositionStoredCards() {
    const scale = this.CONFIG.storageScale;
    this.storedCards.forEach((c, i) => {
      const pos = this.getSafeVerticalLeftPosition(i);
      new TWEEN.Tween(c.position).to({ x: pos.x, y: pos.y, z: pos.z }, 450).start();
      new TWEEN.Tween(c.scale).to({ x: scale, y: scale, z: scale }, 450).start();
    });
  }

  _onMouseDown(event) {
    if (!this.isGameActive || this.storedCards.length >= 3) return;
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this._raycastPick(this.mouse);
  }

  _onTouchStart(event) {
    if (!this.isGameActive || this.storedCards.length >= 3) return;
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      this._raycastPick(this.mouse);
    }
  }

  _raycastPick(normalizedCoord) {
    if (!this.raycaster || !this.camera || !this.cardGroup) return;
    this.raycaster.setFromCamera(normalizedCoord, this.camera);
    const intersects = this.raycaster.intersectObjects(this.cardGroup.children, false);
    if (intersects.length > 0) {
      // Find closest unpicked card
      const target = intersects.find(hit => !hit.object.userData.isPicked);
      if (target) {
        this.pickCard(target.object);
      }
    }
  }

  _onResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.repositionStoredCards();
  }

  _animate(time) {
    this.animFrameId = requestAnimationFrame(this._animate);

    TWEEN.update(time);
    this.updateExplosions();

    if (this.isGameActive && this.cardGroup) {
      let targetRotSpeed = 0.0012;

      // Accelerated rotation when hand moves to sides
      if (this.hasCameraAccess) {
        if (this.handX < 0.38) targetRotSpeed = -0.026;
        else if (this.handX > 0.62) targetRotSpeed = 0.026;
      }

      this.rotationSpeed += (targetRotSpeed - this.rotationSpeed) * 0.06;
      this.cardGroup.rotation.y += this.rotationSpeed;

      // Gentle floating harmonic wave
      this.cardGroup.children.forEach((c) => {
        if (!c.userData.isPicked) {
          c.position.y = c.userData.baseY + Math.sin(time * 0.0016 + c.userData.index * 0.2) * 0.1;
        }
      });
    }

    if (this.starFieldMesh) {
      this.starFieldMesh.rotation.y = time * 0.000035;
      this.starFieldMesh.material.size = Math.sin(time * 0.002) * 0.1 + 0.9;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  // --- MediaPipe Hands & Camera Integration ---
  async startCamera(videoElement, cursorElement) {
    if (!videoElement) return;

    try {
      this.hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      this.hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      this.cursorEl = cursorElement;
      this.hands.onResults(this._onHandResults);

      this.cam = new Camera(videoElement, {
        onFrame: async () => {
          if (videoElement.readyState >= 2) {
            await this.hands.send({ image: videoElement });
          }
        },
        width: 640,
        height: 480
      });

      await this.cam.start();
      this.hasCameraAccess = true;
      this.onStatusChange('Đưa tay lên trước Camera để xoay và chụm ngón tay để bốc bài');
    } catch (err) {
      console.warn('Camera or MediaPipe unavailable, fallback to mouse/touch mode:', err);
      this.hasCameraAccess = false;
      this.onStatusChange('Nhấp chuột hoặc chạm trực tiếp vào lá bài để bốc');
    }
  }

  _onHandResults(results) {
    if (!this.cursorEl) return;

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const lm = results.multiHandLandmarks[0];
      this.handX = 1 - lm[9].x;

      const x = (lm[8].x + lm[4].x) / 2;
      const y = (lm[8].y + lm[4].y) / 2;

      const screenX = (1 - x) * window.innerWidth;
      const screenY = y * window.innerHeight;

      this.cursorEl.style.display = 'block';
      this.cursorEl.style.left = `${screenX}px`;
      this.cursorEl.style.top = `${screenY}px`;

      this.cursorPosition.x = (screenX / window.innerWidth) * 2 - 1;
      this.cursorPosition.y = -(screenY / window.innerHeight) * 2 + 1;

      const distance = Math.hypot(lm[8].x - lm[4].x, lm[8].y - lm[4].y);
      const isPinchingNow = distance < 0.075;

      // Single pinch trigger with debouncing
      if (isPinchingNow && !this.isPinching) {
        this.cursorEl.classList.add('pinching');
        if (this.isGameActive) {
          this._raycastPick(this.cursorPosition);
        }
      } else if (!isPinchingNow && this.isPinching) {
        this.cursorEl.classList.remove('pinching');
      }
      this.isPinching = isPinchingNow;
    } else {
      this.cursorEl.style.display = 'none';
    }
  }

  stopCamera() {
    if (this.cam) {
      try { this.cam.stop(); } catch (e) {}
      this.cam = null;
    }
    if (this.hands) {
      try { this.hands.close(); } catch (e) {}
      this.hands = null;
    }
    if (this.cursorEl) {
      this.cursorEl.style.display = 'none';
    }
  }

  destroy() {
    this.stopCamera();
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('mousedown', this._onMouseDown);
    window.removeEventListener('touchstart', this._onTouchStart);

    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}

if (typeof window !== 'undefined') {
  window.TarotARScene = TarotARScene;
}
