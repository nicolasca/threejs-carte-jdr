import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";

const gui = new GUI();

const scene = new THREE.Scene();
//scene.background = new THREE.Color("white");

const canvas = document.querySelector("canvas.webgl");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 2;

function initLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.3);
  pointLight.position.x = 0;
  pointLight.position.y = 0;
  pointLight.position.z = 3;
  scene.add(pointLight);

  const pointLightBack = new THREE.PointLight(0xffffff, 0.3);
  pointLightBack.position.x = 0;
  pointLightBack.position.y = 0;
  pointLightBack.position.z = -3;
  scene.add(pointLightBack);

  const folderSun = gui.addFolder("Light");
  folderSun.add(pointLight.position, "x", -5, 5, 0.01);
  folderSun.add(pointLight.position, "y", -5, 5, 0.01);
  folderSun.add(pointLight.position, "z", -5, 5, 0.01);
}

/**
 * Textures loader
 */
const textureLoader = new THREE.TextureLoader();
const karleTexture = textureLoader.load("src/karle.jpg");
const height = textureLoader.load("src/height.jpg");
const aoTexture = textureLoader.load("src/ao.jpg");
const backCard = textureLoader.load("src/back-card-white.jpg");
const backCardHeight = textureLoader.load("src/height-back.jpg");

/**
 * Objects
 */
const cardMaterial = new THREE.MeshStandardMaterial({
  map: karleTexture,
  displacementMap: height,
  metalness: 0.25,
  roughness: 0.5
});
const planeGeometry = new THREE.PlaneGeometry(1, 1.39, 156, 156);
const cardFrontMesh = new THREE.Mesh(planeGeometry, cardMaterial);
cardFrontMesh.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cardFrontMesh.geometry.attributes.uv.array, 2)
);
cardFrontMesh.material.ao = aoTexture;
cardFrontMesh.material.aoMapIntensity = 1;

const cardBackMesh = new THREE.Mesh(
  planeGeometry,
  new THREE.MeshStandardMaterial({
    map: backCard,
    displacementMap: backCardHeight,
    displacementScale: 0.02
  })
);

cardBackMesh.rotation.y = Math.PI;
scene.add(cardFrontMesh, cardBackMesh);

const cardFront = gui.addFolder("Front Card");
cardFront.add(cardFrontMesh.material, "metalness", 0, 1, 0.01);
cardFront.add(cardFrontMesh.material, "roughness", 0, 1, 0.01);
cardFront.add(cardFrontMesh.material, "aoMapIntensity", 0, 5, 0.01);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render
function animate() {
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

initLights();
animate();
