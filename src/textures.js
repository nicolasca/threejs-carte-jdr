import * as THREE from "three";

/**
 * Textures loader
 */
export const textureLoader = new THREE.TextureLoader();

// options
export const heightMap = textureLoader.load("src/images/height.jpg");
export const aoMap = textureLoader.load("src/images/ao.jpg");
const backCard = textureLoader.load("src/images/back-card-white.jpg");
const backCardHeight = textureLoader.load("src/images/height-back.jpg");
