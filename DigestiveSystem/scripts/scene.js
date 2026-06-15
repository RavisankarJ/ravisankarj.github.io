import * as THREE from "https://esm.sh/three@0.152.0";
import { OrbitControls } from "https://esm.sh/three@0.152.0/examples/jsm/controls/OrbitControls.js";

export function createScene() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 100;
  camera.position.y = 15;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x9E938B); // Set background to white
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // scene.add(directionalLight);
  const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.6
  );

  // scene.add(ambientLight);
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 50);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  // console.log("scene light :", light);
  return { scene, camera, renderer, controls, light };
}