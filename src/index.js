import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import { Lights } from "./lights";
import { Mesh, TextureLoader } from "three";
import { Card } from "./card";
import { heightMap, aoMap, textureLoader } from "./textures";
import BluskImg from "./images/cards/blusk.jpg";
import DjekalImg from "./images/cards/djekal.jpg";
import EelmImg from "./images/cards/eelm.jpg";
import HarmonyImg from "./images/cards/harmony.jpg";
import HeddaImg from "./images/cards/hedda.jpg";
import IvalImg from "./images/cards/ival.jpg";
import KarleImg from "./images/cards/karle.jpg";
import KrielImg from "./images/cards/kriel.jpg";
import MagdaskImg from "./images/cards/magdask.jpg";
import NedracImg from "./images/cards/nedrac.jpg";
import SiblineImg from "./images/cards/sibline.jpg";
import SvenImg from "./images/cards/sven.jpg";
import TheodranImg from "./images/cards/theodran.jpg";

const cardsToLoad = [
  BluskImg,
  DjekalImg,
  EelmImg,
  HarmonyImg,
  HeddaImg,
  KarleImg,
  KrielImg,
  IvalImg,
  MagdaskImg,
  NedracImg,
  SvenImg,
  SiblineImg,
  TheodranImg,
];

const CAMERA_Z = 4;

const gui = new GUI();

const scene = new THREE.Scene();

const zoomMesh = new Mesh();

const canvas = document.querySelector("canvas.webgl");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = CAMERA_Z;

const lights = new Lights();
scene.add(lights.ambientLight);
scene.add(lights.directionalLight);

/**
 * Objects
 */

const cardsMesh = [];
cardsToLoad.forEach((cardPath) => {
  //const cardBackMesh = createBackMesh();

  const texture = textureLoader.load(cardPath);
  const meshCard = new Card(texture, heightMap, aoMap);
  cardsMesh.push(meshCard);
  scene.add(meshCard.mesh);
  // Add onclick event to display the card as zoom
  meshCard.mesh.callback = () => {
    console.log("I clicked");
  };

  /*   const group = new THREE.Group();
  group.add(cardBackMesh, cardFrontMesh);
  scene.add(group); */
});

const row = 3;
const column = 5;

let index = 0;
// Position in grid
for (let i = 0; i < row; i++) {
  for (let j = 0; j < column; j++) {
    if (cardsMesh[index]) {
      cardsMesh[index].mesh.position.x =
        j - CAMERA_Z + -1 + (index % column) * 0.5;
      cardsMesh[index].mesh.position.y = -i * 1.5 + CAMERA_Z / 2;

      index++;
    }
  }
}

/**
 * Zoom card on right
 */
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 5),
  new THREE.MeshBasicMaterial(0xffffff)
);
plane.position.x = CAMERA_Z;
scene.add(plane);

scene.add(zoomMesh);

/**
 * Event listeners
 */
const zoomCardGeometry = new THREE.PlaneGeometry(2.5, 2.5 * 1.39);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.addEventListener(
  "click",
  (event) => {
    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const copy = intersects[0].object.clone();
      zoomMesh.position.x = 4;
      zoomMesh.position.y = 0;
      zoomMesh.position.z = 0.1;
      zoomMesh.material = copy.material;
      zoomMesh.geometry = zoomCardGeometry;

      scene.add(zoomMesh);
    }
  },
  false
);

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  },
  false
);

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
