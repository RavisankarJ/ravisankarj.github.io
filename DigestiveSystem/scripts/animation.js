import * as THREE from "https://esm.sh/three@0.152.0";
import { updateDashboard, hideDashboard } from "./dashboard.js";

let progress = 0;
let currentFood = null;
let digestionFinished = false;
let activeParticles = [];
let stomachAcid = null;
let runTime = 0;
let lastFrameTime = 0;
let endReachedAt = null;
let isPaused = false;
let stomachLight = null;
let intestineLights = [];

const playbackBar = document.getElementById("playbackControls");
const btnPause = document.getElementById("btnPause");
const progressSlider = document.getElementById("progressSlider");

const MOUTH_HOLD_SECONDS = 2.4;
const EXIT_VISIBLE_SECONDS = 2.2;
let OESOPHAGUS_START = 0.01;
let OESOPHAGUS_END = 0.08;
let STOMACH_START = 0.08;
let STOMACH_END = 0.12;
const END_REMAINING_FRACTION = 0.3;
let BUBBLE_START = OESOPHAGUS_START;

const organTooltip = document.getElementById("organTooltip");
let lastOrganName = "";

function getOrganName(p, rt) {
  if (!currentFood) return "";

  if (p < 0.01) return "🦷 Mouth";
  if (p < 0.08) return "🟡 Oesophagus";
  if (p < 0.12) return "🔵 Stomach";
  if (p < 0.25) return "🧪 Bile & Pancreatic secretions";
  if (p < 0.85) return "🟢 Small Intestine";
  if (p < 0.98) return "🟠 Large Intestine";
  return "🔴 Rectum & Excretion";
}

function getOrganImage(p) {
  if (p >= 0.01 && p < 0.08) return "assets/peristalsis.png";
  if (p >= 0.08 && p < 0.12) return "assets/stomach.png";
  if (p >= 0.12 && p < 0.25) return "assets/pancrease_bile.png";
  if (p >= 0.25 && p < 0.85) return "assets/small_intesine.png";
  if (p >= 0.85 && p < 0.98) return "assets/large_intesine.png";
  return null;
}

function updateOrganTooltip(p, rt) {
  if (!organTooltip) return;
  const name = getOrganName(p, rt);
  if (!name || digestionFinished) {
    organTooltip.classList.add("hidden");
    return;
  }
  organTooltip.classList.remove("hidden");

  // Show organ name
  const displayContent = name;
  const nameTextEl = document.getElementById("organNameText");

  if (displayContent !== lastOrganName) {
    lastOrganName = displayContent;
    if (nameTextEl) {
      nameTextEl.textContent = displayContent;
    } else {
      organTooltip.textContent = displayContent;
    }
  }

  // Show organ detail image and sprites
  const imgEl = document.getElementById("organDetailImage");
  const spriteEl = document.getElementById("organSpriteAnimation");
  
  if (imgEl && spriteEl) {
    const imgSrc = getOrganImage(p);
    
    if (p < 0.01) {
      spriteEl.style.display = "block";
      imgEl.style.display = "none";
      imgEl.src = "";
    } else {
      spriteEl.style.display = "none";
      if (imgSrc) {
        if (!imgEl.src.endsWith(imgSrc)) {
          imgEl.src = imgSrc;
        }
        imgEl.style.display = "block";
      } else {
        imgEl.style.display = "none";
        imgEl.src = "";
      }
    }
  }
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(start, end, value) {
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}

function getWholeFood(food) {
  return food?.userData?.wholeFood ?? food;
}

function getTexture(food) {
  return food?.userData?.foodTexture ?? getWholeFood(food)?.material?.map;
}

function getStageSpeed(progressValue) {
  // Slow down significantly in the stomach for observation
  if (progressValue >= 0.08 && progressValue <= 0.12) {
    return 0.15; // Slow stomach phase
  }
  return 0.45; // Default speed elsewhere
}

function resetWholeFood(food) {
  const wholeFood = getWholeFood(food);

  if (!wholeFood?.material) {
    return;
  }

  wholeFood.visible = true;
  wholeFood.material.opacity = 1;
  wholeFood.material.rotation = 0;
  wholeFood.scale.set(3, 3, 3);
}

function ensureParticles(food) {
  if (activeParticles.length) {
    return;
  }

  const texture = getTexture(food);

  if (!texture) {
    return;
  }

  const particleCount = 15; // 5 main pieces * 3 sub-pieces
  const particleParent = food.parent ?? food;

  for (let i = 0; i < particleCount; i++) {
    const groupIndex = Math.floor(i / 3);
    const subIndex = i % 3;

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false
    });
    const particle = new THREE.Sprite(material);
    particle.renderOrder = 20;

    particle.userData = {
      index: i,
      groupIndex: groupIndex,
      subIndex: subIndex,
      // Initial progress spaced out
      t: -i * 0.008,
      isS1: true,
      side: groupIndex % 2 === 0 ? -1 : 1,
      wave: i * 0.7,
      baseSize: 2.2 - (groupIndex % 3) * 0.25
    };

    particle.visible = false;
    particleParent.add(particle);
    activeParticles.push(particle);
  }
}

function clearParticles() {
  activeParticles.forEach((particle) => {
    particle.parent?.remove(particle);
    particle.material?.dispose?.();
  });

  activeParticles = [];
}

function hideParticles() {
  activeParticles.forEach((particle) => {
    particle.visible = false;
    particle.material.opacity = 0;
  });
}

function createStomachAcid(curve, digestiveModel) {
  const acidGroup = new THREE.Group();
  const acidPoint = new THREE.Vector3();
  const stomachAnchors = ["PathPoint_13"]
    .map((name) => digestiveModel.getObjectByName(name))
    .filter(Boolean);

  if (stomachAnchors.length) {
    stomachAnchors.forEach((anchor) => {
      const point = new THREE.Vector3();

      anchor.updateWorldMatrix(true, false);
      point.setFromMatrixPosition(anchor.matrixWorld);
      digestiveModel.worldToLocal(point);
      acidPoint.add(point);
    });
    acidPoint.divideScalar(stomachAnchors.length);
  } else {
    acidPoint.copy(curve.getPoint(0.24));
  }

  acidPoint.x += 4.35;
  acidPoint.y += 0.55;
  acidPoint.z += 0.5; // Adjust Z if needed
  acidGroup.position.copy(acidPoint);
  acidGroup.renderOrder = 10;

  const acidMaterial = new THREE.MeshPhongMaterial({
    color: 0x9fe232,
    specular: 0xffffaa,
    shininess: 65,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false
  });
  const lowerMaterial = new THREE.MeshPhongMaterial({
    color: 0x5c8c19,
    specular: 0xb7ff37,
    shininess: 30,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false
  });
  const rimMaterial = new THREE.MeshPhongMaterial({
    color: 0xdfff65,
    specular: 0xffffff,
    shininess: 90,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false
  });
  const highlightMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff8a,
    specular: 0xffffff,
    shininess: 100,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false
  });
  const pool = new THREE.Mesh(
    new THREE.SphereGeometry(1, 40, 18),
    acidMaterial
  );
  const lowerBody = new THREE.Mesh(
    new THREE.SphereGeometry(1, 40, 14),
    lowerMaterial
  );
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.08, 10, 48),
    rimMaterial
  );
  const highlight = new THREE.Mesh(
    new THREE.SphereGeometry(1, 24, 10),
    highlightMaterial
  );

  lowerBody.position.set(0, -0.15, -0.08);
  lowerBody.scale.set(2.15, 0.46, 0.72);
  pool.position.set(0, 0.04, 0.08);
  pool.scale.set(2.05, 0.34, 0.8);
  pool.rotation.x = -0.18;
  rim.position.set(0, 0.08, 0.12);
  rim.scale.set(2.05, 0.52, 0.28);
  rim.rotation.x = 0.1;
  highlight.position.set(0.28, 0.18, 0.36);
  highlight.scale.set(0.72, 0.12, 0.28);
  acidGroup.add(lowerBody, pool, rim, highlight);

  const bubbles = [];
  const bubbleMaterial = new THREE.MeshBasicMaterial({
    color: 0xe8ffd2,
    transparent: true,
    opacity: 0,
    depthTest: false,
    depthWrite: false
  });

  for (let i = 0; i < 5; i++) {
    const bubble = new THREE.Mesh(
      new THREE.SphereGeometry(1, 12, 8),
      bubbleMaterial.clone()
    );

    bubble.position.set(
      -0.7 + (i % 3) * 0.48,
      -0.18 + (i % 2) * 0.16,
      -0.18 + (i % 3) * 0.16
    );
    bubble.scale.setScalar(0.12 + (i % 3) * 0.04);
    bubble.userData = {
      baseX: bubble.position.x,
      baseY: bubble.position.y,
      speed: 0.8 + i * 0.12,
      phase: i * 0.9
    };
    bubbles.push(bubble);
    acidGroup.add(bubble);
  }

  acidGroup.userData = {
    lowerBody,
    pool,
    rim,
    highlight,
    bubbles,
    materials: [
      lowerMaterial,
      acidMaterial,
      rimMaterial,
      highlightMaterial,
      ...bubbles.map((b) => b.material)
    ]
  };
  acidGroup.visible = true;
  acidGroup.scale.set(1, 1, 0.85);
  digestiveModel.add(acidGroup);

  return acidGroup;
}

function updateStomachAcid(acidGroup, progressValue, elapsedTime) {
  if (!acidGroup) {
    return;
  }

  const bubbleActivity =
    smoothstep(BUBBLE_START, BUBBLE_START + 0.025, progressValue) *
    (1 - smoothstep(STOMACH_END, STOMACH_END + 0.08, progressValue));
  const { lowerBody, pool, rim, highlight, bubbles } = acidGroup.userData;
  const wave = Math.sin(elapsedTime * 3.5) * 0.08;

  acidGroup.visible = true;
  lowerBody.scale.set(2.15 + wave * 0.2, 0.46 - wave * 0.06, 0.72 + wave * 0.08);
  lowerBody.material.opacity = 0.22;
  pool.scale.set(2.05 + wave * 0.28, 0.34 - wave * 0.05, 0.8 + wave * 0.14);
  pool.rotation.z = Math.sin(elapsedTime * 2) * 0.06;
  pool.material.opacity = 0.32;
  rim.scale.set(2.05 + wave * 0.16, 0.52 - wave * 0.05, 0.28);
  rim.rotation.z = Math.sin(elapsedTime * 2.4) * 0.05;
  rim.material.opacity = 0.38;
  highlight.material.opacity = 0.22;
  highlight.position.x = 0.28 + Math.sin(elapsedTime * 2.8) * 0.1;
  highlight.position.z = 0.24 + Math.sin(elapsedTime * 3.3) * 0.04;

  bubbles.forEach((bubble, index) => {
    const data = bubble.userData;
    const lift = (elapsedTime * data.speed + data.phase) % 1;

    bubble.visible = bubbleActivity > 0.04;
    bubble.position.x =
      data.baseX + Math.sin(elapsedTime * 2.2 + data.phase) * 0.08;
    bubble.position.y = data.baseY + lift * 0.38;
    bubble.position.z =
      -0.18 + (index % 3) * 0.16 + Math.sin(elapsedTime * 2 + data.phase) * 0.05;
    bubble.material.opacity = bubbleActivity * (1 - lift) * 0.25;
    bubble.scale.setScalar((0.12 + (index % 3) * 0.04) * (1 + lift * 0.45));
  });
}

function getVisibleParticleCount(progressValue) {
  const total = activeParticles.length;
  const minimum = Math.max(1, Math.round(total * END_REMAINING_FRACTION));
  const absorbed = smoothstep(0.72, 0.98, progressValue);

  return Math.round(THREE.MathUtils.lerp(total, minimum, absorbed));
}

function placeParticleTrain(food, curve, progressValue, elapsedTime) {
  const mouthBreakdown = smoothstep(MOUTH_HOLD_SECONDS * 0.45, MOUTH_HOLD_SECONDS * 0.85, runTime);

  activeParticles.forEach((particle) => {
    const data = particle.userData;
    const trailProgress = clamp01(data.t);

    const stomachBlend =
      smoothstep(STOMACH_START, STOMACH_START + 0.04, trailProgress) *
      (1 - smoothstep(STOMACH_END - 0.04, STOMACH_END, trailProgress));

    const particleStomachBreakdown = smoothstep(
      STOMACH_START,
      STOMACH_END,
      trailProgress
    );
    const particleReveal = Math.max(mouthBreakdown, particleStomachBreakdown);

    // Breakdown in Small Intestine (starts at 12% for this specific particle)
    const particleSiBreakdown = smoothstep(0.12, 0.20, trailProgress);

    // Visibility logic: only 1 piece per group visible until Small Intestine
    const isMainPiece = data.subIndex === 0;
    const isVisible = isMainPiece || particleSiBreakdown > 0.05;

    if (!isVisible || particleReveal <= 0.03 || trailProgress <= 0) {
      particle.visible = false;
      particle.material.opacity = 0;
      return;
    }

    const point = curve.getPoint(trailProgress);
    const tangent = curve.getTangent(trailProgress).normalize();
    const side = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
    const wobble =
      Math.sin(elapsedTime * 4 + data.wave) *
      THREE.MathUtils.lerp(0.04, 0.16, stomachBlend);
    const stomachSpread = THREE.MathUtils.lerp(0.06, 0.32, stomachBlend);
    const sideOffset =
      data.side * stomachSpread * (data.groupIndex % 3) * 0.25 + wobble;

    // Follow the path in a train (no side-spreading for subdivision)
    point.addScaledVector(side, sideOffset);

    particle.position.copy(point);
    particle.visible = true;
    particle.material.opacity = THREE.MathUtils.lerp(0.65, 1, particleReveal);

    // Scale adjustment: All S2 pieces become the same smaller size in the small intestine
    const siScaleFactor = THREE.MathUtils.lerp(1, 0.35, particleSiBreakdown);

    particle.material.color.set(0xffffff).lerp(
      new THREE.Color(0xff8a45),
      particleStomachBreakdown
    );
    particle.scale.setScalar(
      data.baseSize *
      siScaleFactor
    );
  });
}

function updateWholeFood(food, progressValue, elapsedTime) {
  const wholeFood = getWholeFood(food);

  if (!wholeFood?.material) {
    return;
  }

  const mouthChew = smoothstep(0.2, MOUTH_HOLD_SECONDS * 0.6, runTime);
  const stomachBreakdown = smoothstep(
    STOMACH_START,
    STOMACH_END - 0.06,
    progressValue
  );
  const squash =
    Math.sin(elapsedTime * 7) * 0.08 * mouthChew +
    Math.sin(elapsedTime * 10) * 0.18 * stomachBreakdown;
  const stomachSemiSolid = smoothstep(STOMACH_START, STOMACH_END, progressValue);
  const opacity = 1 - Math.max(mouthChew, stomachSemiSolid);

  wholeFood.visible = opacity > 0.04;
  wholeFood.material.opacity = opacity;
  wholeFood.material.rotation = Math.sin(elapsedTime * 4) * 0.15 * stomachBreakdown;
  wholeFood.scale.set(
    3 * (1 + squash),
    3 * (1 - squash * 0.65),
    3
  );
}

function updateFoodVisuals(food, curve, progressValue, elapsedTime) {
  ensureParticles(food);
  updateWholeFood(food, progressValue, elapsedTime);
  placeParticleTrain(food, curve, progressValue, elapsedTime);
}

function createMalfunctionLights(curve, model) {
  if (stomachLight) return; // Only create once

  // Stomach Light (Yellow-Orange for overload alert)
  stomachLight = new THREE.PointLight(0xffaa00, 0, 8); // Distance limit: 8
  const stomachPos = curve.getPoint(0.09);
  stomachLight.position.set(stomachPos.x, stomachPos.y, stomachPos.z);
  model.add(stomachLight);

  // Intestine Lights (Toxic Green for acid burn)
  const siPoints = [0.2, 0.4, 0.6, 0.8];
  siPoints.forEach(p => {
    const light = new THREE.PointLight(0x33ff33, 0, 5); // Distance limit: 5
    const pos = curve.getPoint(p);
    light.position.set(pos.x, pos.y, pos.z);
    model.add(light);
    intestineLights.push(light);
  });
}

function updateMalfunctionLights(progressValue, simState, elapsedTime) {
  if (!stomachLight) return;

  let targetStomach = 0;
  let targetIntestine = 0;
  let alertMessage = "";
  let alertColor = "";

  if (!simState.chewing && progressValue >= 0.08 && progressValue <= 0.14) {
    targetStomach = 100 + Math.sin(elapsedTime * 6) * 50; // Boosted intensity for Yellow
    alertMessage = "⚠️ Stomach Overload! Insufficient chewing leads to slower, harder digestion.";
    alertColor = "#ffaa00"; // Yellow-Orange
  }

  if (progressValue >= 0.12 && progressValue <= 0.85) {
    if (!simState.pancreas && !simState.liver) {
      targetIntestine = 1;
      alertMessage = "☣️ Intestine Acid Burn! Missing both bile and pancreatic juice creates a highly acidic, toxic environment.";
      alertColor = "#33ff33"; // Toxic Green
    } else if (!simState.pancreas) {
      targetIntestine = 1;
      alertMessage = "☣️ Indigestion Alert! Missing pancreatic juice prevents proper breakdown of proteins, carbs, and fats.";
      alertColor = "#33ff33"; // Toxic Green
    } else if (!simState.liver) {
      targetIntestine = 1;
      alertMessage = "☣️ Fat Malabsorption! Missing bile juice prevents emulsification of fats in the intestine.";
      alertColor = "#33ff33"; // Toxic Green
    }
  }

  // Update UI Alert
  const alertEl = document.getElementById("malfunctionAlert");
  if (alertEl) {
    if (alertMessage) {
      alertEl.textContent = alertMessage;
      alertEl.style.borderColor = alertColor;
      alertEl.style.color = alertColor;
      alertEl.style.boxShadow = `0 0 20px ${alertColor}66`; // 40% opacity hex
      alertEl.classList.remove("hidden");
    } else {
      alertEl.classList.add("hidden");
    }
  }

  stomachLight.intensity = targetStomach;
  intestineLights.forEach((light, i) => {
    if (targetIntestine > 0) {
      light.intensity = 80 + Math.sin(elapsedTime * 4 + i) * 40; // Boosted intensity for Green
    } else {
      light.intensity = 0;
    }
  });
}

export function animateScene(
  renderer,
  scene,
  camera,
  controls,
  digestiveSystem,
  curve,
  light,
  stageTValues,
  onUpdate,
  onComplete,
  simulationState
) {
  /*if (stageTValues) {
    OESOPHAGUS_START = stageTValues.oesophagusStart;
    OESOPHAGUS_END = stageTValues.oesophagusEnd;
    STOMACH_START = stageTValues.stomachStart;
    STOMACH_END = stageTValues.stomachEnd;
    BUBBLE_START = OESOPHAGUS_START;
  }*/
  progress = 0;
  runTime = 0;
  lastFrameTime = performance.now() * 0.001;
  endReachedAt = null;
  clearParticles();
  stomachAcid = createStomachAcid(curve, digestiveSystem.model);
  createMalfunctionLights(curve, digestiveSystem.model);

  let speed = 0.001;
  const speedControl = document.getElementById("speedControl");
  if (speedControl) {
    speed = parseFloat(speedControl.value);
    speedControl.addEventListener("input", () => {
      speed = parseFloat(speedControl.value);
    });
  }

  // Playback Button Listeners
  btnPause.onclick = () => {
    isPaused = !isPaused;
    btnPause.textContent = isPaused ? " > " : "||";
  };

  progressSlider.addEventListener("input", () => {
    progress = parseFloat(progressSlider.value);

    // Update every particle's individual progress based on the slider
    const trainOffset = 0.008;
    activeParticles.forEach((p, i) => {
      p.userData.t = progress - (i * trainOffset);
    });

    // If user scrubs, ensure digestionFinished is false so it updates
    digestionFinished = false;
    endReachedAt = null;

    // If scrubbing past start, bypass the mouth hold
    if (progress > 0 && runTime < MOUTH_HOLD_SECONDS) {
      runTime = MOUTH_HOLD_SECONDS;
    } else if (progress === 0) {
      runTime = 0;
    }
  });

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = performance.now() * 0.001;
    const deltaTime = Math.min(0.05, elapsedTime - lastFrameTime);
    lastFrameTime = elapsedTime;

    controls?.update();

    if (isPaused) {
      // Still update visuals so user can zoom/rotate/scrub while paused
      if (currentFood && !digestionFinished) {
        updateFoodVisuals(currentFood, curve, progress, elapsedTime);
        placeParticleTrain(currentFood, curve, progress, elapsedTime);
        // Sync slider if user is scrubbing while paused
        progressSlider.value = progress;
      }
      return;
    }

    digestiveSystem?.digest?.();
    updateStomachAcid(stomachAcid, progress, elapsedTime);
    updateOrganTooltip(progress, runTime);

    if (!digestionFinished) {
      runTime += deltaTime;

      // 1. READ LIVE SIMULATION STATE (Always use current settings)
      const simState = {
        chewing: document.getElementById("simChewing")?.checked ?? true,
        pancreas: document.getElementById("simPancreas")?.checked ?? true,
        liver: document.getElementById("simLiver")?.checked ?? true
      };

      // 2. UPDATE PROGRESS (Only if we haven't finished and are past mouth phase)
      if (currentFood && runTime >= MOUTH_HOLD_SECONDS && endReachedAt === null) {
        activeParticles.forEach(p => {
          if (p.userData.t < 1.0) {
            p.userData.t += speed * getStageSpeed(p.userData.t);
          }
        });

        if (activeParticles.length > 0) {
          progress = Math.max(0, activeParticles[0].userData.t);
        }

        // Finish check
        const lastP = activeParticles[activeParticles.length - 1];
        if (lastP && lastP.userData.t >= 1.0) {
          endReachedAt = elapsedTime;
        }
      }

      // 3. UPDATE DASHBOARD & SLIDER (Consolidated, always passing simState)
      if (currentFood) {
        updateDashboard(progress, simState);
        progressSlider.value = progress;
        updateMalfunctionLights(progress, simState, elapsedTime);
      }

      if (
        endReachedAt !== null &&
        elapsedTime - endReachedAt >= EXIT_VISIBLE_SECONDS
      ) {
        digestionFinished = true;
        if (currentFood) currentFood.visible = false;
        hideParticles();
        hideDashboard();
        if (stomachLight) stomachLight.intensity = 0;
        intestineLights.forEach(l => l.intensity = 0);
        if (playbackBar) playbackBar.classList.add("hidden");
        if (organTooltip) organTooltip.classList.add("hidden");
        if (onComplete) onComplete();
        lastOrganName = "";
      }
    }

    if (currentFood && !digestionFinished) {
      const headProgress = Math.min(1, progress);
      const point = curve.getPoint(headProgress);
      const tangent = curve.getTangent(headProgress);

      currentFood.visible = true;
      currentFood.position.copy(point);
      currentFood.lookAt(point.clone().add(tangent));
      updateFoodVisuals(currentFood, curve, progress, elapsedTime);
    }

    light.position.copy(camera.position);
    renderer.render(scene, camera);
  }

  animate();
}

export function resetProgress() {
  progress = 0;
  runTime = 0;
  lastFrameTime = performance.now() * 0.001;
  endReachedAt = null;
  digestionFinished = false;
  lastOrganName = "";
  clearParticles();
  if (stomachLight) stomachLight.intensity = 0;
  intestineLights.forEach(l => l.intensity = 0);

  if (currentFood) {
    currentFood.visible = true;
    resetWholeFood(currentFood);
  }
}

export function setCurrentFood(food) {
  clearParticles();
  currentFood = food;
  isPaused = false;
  if (btnPause) btnPause.textContent = "||";
  if (playbackBar) playbackBar.classList.remove("hidden");
  resetWholeFood(currentFood);
}
