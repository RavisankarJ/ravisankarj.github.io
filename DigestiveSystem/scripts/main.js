import { createScene } from "./scene.js";
import { loadDigestiveSystem } from "./modelLoader.js";
import { animateScene, resetProgress, setCurrentFood } from "./animation.js";
import { createPathSystem, createFoodSprite } from "./pathSystem.js";
import { initMarkers } from "./markerSystem.js";
import { setDashboardFood } from "./dashboard.js";
import { initQuizSystem, handleMarkerClick } from "./quizSystem.js";

const { scene, camera, renderer, controls, light } = createScene();
let path = null;
let currentFood = null;
let model = null;

// SLEEK DRAWER & TAB LOGIC
const sideDrawer = document.getElementById("sideDrawer");
const tabFood = document.getElementById("tabFood");
const tabSettings = document.getElementById("tabSettings");
const tabQuiz = document.getElementById("tabQuiz");

const panelFood = document.getElementById("panelFood");
const panelSettings = document.getElementById("panelSettings");
const panelQuiz = document.getElementById("panelQuiz");

function openPanel(panelId) {
  const isOpen = !sideDrawer.classList.contains("closed");
  const isTargetActive = (panelId === "food" && panelFood.classList.contains("active")) || 
                        (panelId === "settings" && panelSettings.classList.contains("active")) ||
                        (panelId === "quiz" && panelQuiz.classList.contains("active"));

  if (isOpen && isTargetActive) {
    sideDrawer.classList.add("closed");
  } else {
    sideDrawer.classList.remove("closed");
    tabFood.classList.toggle("active", panelId === "food");
    panelFood.classList.toggle("active", panelId === "food");
    tabSettings.classList.toggle("active", panelId === "settings");
    panelSettings.classList.toggle("active", panelId === "settings");
    tabQuiz.classList.toggle("active", panelId === "quiz");
    panelQuiz.classList.toggle("active", panelId === "quiz");
  }
}

tabFood.onclick = () => openPanel("food");
tabSettings.onclick = () => openPanel("settings");
tabQuiz.onclick = () => openPanel("quiz");

// Start with drawer open
setTimeout(() => { sideDrawer.classList.remove("closed"); }, 500);
loadDigestiveSystem(scene)
  .then((digestiveSystem) => {
    const { curve, pathLine, stageTValues } = createPathSystem(digestiveSystem.model);
    path = pathLine;
    path.visible = false; // hide path by default
    model = digestiveSystem.model;
    
    const { animateMarkers, markerGroup, setMarkersVisible } = initMarkers(digestiveSystem.model, camera, renderer, handleMarkerClick);
    
    // Initialize Quiz System with marker visibility control
    initQuizSystem(setMarkersVisible);
    
    // Hide markers by default
    markerGroup.visible = false;

    const markerBtn = document.getElementById("toggleMarkersBtn");
    markerBtn.addEventListener("click", () => {
      markerGroup.visible = !markerGroup.visible;
      markerBtn.classList.toggle("active", markerGroup.visible);
    });

    const pathBtn = document.getElementById("togglePathBtn");
    pathBtn.addEventListener("click", () => {
      path.visible = !path.visible;
      pathBtn.classList.toggle("active", path.visible);
    });

    // Listen for completion to show food tray again
    const onSimulationComplete = () => {
      openPanel("food");
      sideDrawer.classList.remove("closed");
    };

    animateScene(
      renderer,
      scene,
      camera,
      controls,
      digestiveSystem,
      curve,
      light,
      stageTValues,
      animateMarkers,
      onSimulationComplete
    );
  })
  .catch((error) => {
    console.error("Failed to load digestive system model:", error);
  });


document.querySelectorAll(".foodTile").forEach((tile) => {
  tile.addEventListener("click", () => {
    const foodName = tile.dataset.food;
    
    // Hide drawer
    sideDrawer.classList.add("closed");

    if (currentFood) model.remove(currentFood);
    currentFood = createFoodSprite(foodName);
    model.add(currentFood);
    setCurrentFood(currentFood);
    setDashboardFood(foodName);
    resetProgress();
  });
});

// TUTORIAL MODAL LOGIC
const tutorialData = [
  { img: "assets/tutorial_1.png", text: "1. The 3D Digestive System model can be explored from different angles." },
  { img: "assets/tutorial_2.png", text: "2. Use mouse scroll button to zoom in and out." },
  { img: "assets/tutorial_3.png", text: "3. Use the playback controls to pause, scrub, or change speed. Watch the nutritional dashboard track absorption as food travels." },
  { img: "assets/tutorial_4.png", text: "4. Explore the 3D model and interact with different organs." },
  { img: "assets/tutorial_5.png", text: "5. Select a food item from the menu on the right to start." },
  { img: "assets/tutorial_6.png", text: "6. Toggle physiology settings to see the effects of organ malfunction." },
  { img: "assets/tutorial_7.png", text: "7. Take the quiz to test your knowledge of the digestive system." }
];

let currentTutorialStep = 0;

const btnAppInfo = document.getElementById("btnAppInfo");
const tutorialModal = document.getElementById("tutorialModal");
const btnCloseTutorial = document.getElementById("btnCloseTutorial");
const btnPrevTutorial = document.getElementById("btnPrevTutorial");
const btnNextTutorial = document.getElementById("btnNextTutorial");
const tutorialImage = document.getElementById("tutorialImage");
const tutorialText = document.getElementById("tutorialText");
const tutorialDots = document.getElementById("tutorialDots")?.children;

function updateTutorialView() {
  const data = tutorialData[currentTutorialStep];
  if(tutorialImage) tutorialImage.src = data.img;
  if(tutorialText) tutorialText.textContent = data.text;
  
  if(btnPrevTutorial) btnPrevTutorial.style.visibility = currentTutorialStep === 0 ? "hidden" : "visible";
  if(btnNextTutorial) btnNextTutorial.textContent = currentTutorialStep === tutorialData.length - 1 ? "Finish" : "Next \u2192";
  
  if(tutorialDots) {
    Array.from(tutorialDots).forEach((dot, index) => {
      dot.classList.toggle("active", index === currentTutorialStep);
    });
  }
}

if(btnAppInfo) {
  btnAppInfo.addEventListener("click", () => {
    currentTutorialStep = 0;
    updateTutorialView();
    if(tutorialModal) tutorialModal.classList.remove("hidden");
  });
}

if(btnCloseTutorial) {
  btnCloseTutorial.addEventListener("click", () => {
    if(tutorialModal) tutorialModal.classList.add("hidden");
  });
}

if(btnPrevTutorial) {
  btnPrevTutorial.addEventListener("click", () => {
    if (currentTutorialStep > 0) {
      currentTutorialStep--;
      updateTutorialView();
    }
  });
}

if(btnNextTutorial) {
  btnNextTutorial.addEventListener("click", () => {
    if (currentTutorialStep < tutorialData.length - 1) {
      currentTutorialStep++;
      updateTutorialView();
    } else {
      if(tutorialModal) tutorialModal.classList.add("hidden");
    }
  });
}