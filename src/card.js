import * as THREE from "three";

export class Card {
  constructor(textureMap, heightMap, aoMap) {
    const material = new THREE.MeshStandardMaterial({
      map: textureMap,
      //displacementMap: heightMap,
      metalness: 0.25,
      roughness: 0.5
    });

    const planeGeometry = new THREE.PlaneGeometry(1, 1.39, 156, 156);
    const cardFrontMesh = new THREE.Mesh(planeGeometry, material);
    /*  cardFrontMesh.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(cardFrontMesh.geometry.attributes.uv.array, 2)
    );
    cardFrontMesh.material.ao = aoMap;
    cardFrontMesh.material.aoMapIntensity = 1; */
    this.mesh = cardFrontMesh;
  }
}

/* 
function createBackMesh() {
  const cardBackMesh = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshStandardMaterial({
      map: backCard,
      displacementMap: backCardHeight,
      displacementScale: 0.02
    })
  );
  cardBackMesh.rotation.y = Math.PI;
  return cardBackMesh;
} */
