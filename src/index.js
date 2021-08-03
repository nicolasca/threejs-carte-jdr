import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import { Lights } from "./lights";
import { TextureLoader } from "three";
import { Card } from "./card";
import { heightMap, aoMap, textureLoader } from "./textures";

const basePath = "src/images/cards/";
const cardsToLoad = [
  "karle.jpg",
  "sven.jpg",
  "blusk.jpg",
  "djekal.jpg",
  "eelm.jpg",
  "harmony.jpg",
  "hedda.jpg",
  "ival.jpg"
];

const gui = new GUI();

const scene = new THREE.Scene();

const canvas = document.querySelector("canvas.webgl");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 2;

const lights = new Lights();
scene.add(lights.ambientLight);
scene.add(lights.directionalLight);

/**
 * Objects
 */

const cardsMesh = [];
cardsToLoad.forEach((cardPath) => {
  //const cardBackMesh = createBackMesh();

  const texture = textureLoader.load(basePath + cardPath);
  const meshCard = new Card(texture, heightMap, aoMap);
  cardsMesh.push(meshCard);
  scene.add(meshCard.mesh);

  /*   const group = new THREE.Group();
  group.add(cardBackMesh, cardFrontMesh);
  scene.add(group); */
});

const row = 2;
const column = 4;

let index = 0;
// Position in grid
for (let i = 0; i < row; i++) {
  for (let j = 0; j < column; j++) {
    console.log(i, j, cardsMesh);
    console.log(cardsMesh[index]);
    cardsMesh[index].mesh.position.x = j - 1 + index * 0.5;
    cardsMesh[index].mesh.position.y = i + 0.5;

    index++;
  }
}

//const cardFront = gui.addFolder("Front Card");
//cardFront.add(cardFrontMesh.material, "metalness", 0, 1, 0.01);
//cardFront.add(cardFrontMesh.material, "roughness", 0, 1, 0.01);
//cardFront.add(cardFrontMesh.material, "aoMapIntensity", 0, 5, 0.01);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

/* const controls = new OrbitControls(camera, canvas);
controls.enableDamping =  true;*/

// Render
function animate() {
  //controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();
