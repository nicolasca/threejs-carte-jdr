import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 2;

function initLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;
  scene.add(pointLight);
}

/**
 * Textures loader
 */
const textureLoader = new THREE.TextureLoader();
const karleTexture = textureLoader.load("src/karle.jpg");

/**
 * Objects
 */
const cardMaterial = new THREE.MeshStandardMaterial();
cardMaterial.map = karleTexture;
const planeGeometry = new THREE.PlaneGeometry(1, 1.39, 128, 128);
const cardFrontMesh = new THREE.Mesh(planeGeometry, cardMaterial);

const cardBackMesh = new THREE.Mesh(
  planeGeometry,
  new THREE.MeshBasicMaterial({ color: 0x000000 })
);

cardBackMesh.rotation.y = Math.PI;
scene.add(cardFrontMesh, cardBackMesh);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// Render
function animate() {
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

initLights();
animate();
