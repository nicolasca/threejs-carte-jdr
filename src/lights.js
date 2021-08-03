import * as THREE from "three";

export class Lights {
  constructor() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    this.directionalLight.position.x = 0;
    this.directionalLight.position.y = 0;
    this.directionalLight.position.z = 3;
  }

  getAll() {
    return [this.ambientLight, this.directionalLight];
  }
}
