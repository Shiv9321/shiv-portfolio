import { Injectable } from '@angular/core';
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

@Injectable({
  providedIn: 'root'
})
export class CharacterControllerService {

  private character?: THREE.Object3D;
  private characterBody!: RAPIER.RigidBody;

  private keys: { [key: string]: boolean } = {};
  private moveSpeed = 10;

  // camera
  private cameraAngle = 0;
  private isDragging = false;
  private previousMouseX = 0;

  init(renderer: THREE.WebGLRenderer) {
    this.setupKeyboard();
    this.setupMouseControls(renderer);
  }

  setCharacter(object: THREE.Object3D, world: RAPIER.World) {

    this.character = object;

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(object.position.x, object.position.y, object.position.z)
      .lockRotations()
      .setLinearDamping(6)
      .setAngularDamping(5);

    this.characterBody = world.createRigidBody(bodyDesc);

    const collider = RAPIER.ColliderDesc.capsule(0.4, 0.3)
      .setDensity(5)
      .setFriction(2.0)
      .setRestitution(0);

    world.createCollider(collider, this.characterBody);
  }

  update(camera: THREE.PerspectiveCamera) {

    if (!this.character) return;

    let moveX = 0;
    let moveZ = 0;

    if (this.keys['w'] || this.keys['arrowup']) moveZ -= 1;
    if (this.keys['s'] || this.keys['arrowdown']) moveZ += 1;
    if (this.keys['a'] || this.keys['arrowleft']) moveX -= 1;
    if (this.keys['d'] || this.keys['arrowright']) moveX += 1;

    this.characterBody.setLinvel({
      x: moveX * this.moveSpeed,
      y: -3,
      z: moveZ * this.moveSpeed
    }, true);

    const pos = this.characterBody.translation();

    this.character.position.set(pos.x, pos.y - 0.7, pos.z);

    if (moveX !== 0 || moveZ !== 0) {
      const angle = Math.atan2(moveX, moveZ);
      this.character.rotation.y = angle;
    }

    this.updateCamera(camera);
  }

  private updateCamera(camera: THREE.PerspectiveCamera) {

    if (!this.character) return;

    const radius = 6;
    const height = 3;

    const camX =
      this.character.position.x +
      Math.sin(this.cameraAngle) * radius;

    const camZ =
      this.character.position.z +
      Math.cos(this.cameraAngle) * radius;

    camera.position.set(camX, height, camZ);
    camera.lookAt(this.character.position);
  }

  private setupKeyboard() {

    window.addEventListener('keydown', e =>
      this.keys[e.key.toLowerCase()] = true
    );

    window.addEventListener('keyup', e =>
      this.keys[e.key.toLowerCase()] = false
    );
  }

  getCharacterPosition(): THREE.Vector3 | null {

  if (!this.character) return null;

  return this.character.position;
}


isKeyPressed(key: string): boolean {

  return this.keys[key.toLowerCase()];
}

resetKey(key: string) {

  this.keys[key.toLowerCase()] = false;
}

  private setupMouseControls(renderer: THREE.WebGLRenderer) {

    renderer.domElement.addEventListener('mousedown', (event) => {
      this.isDragging = true;
      this.previousMouseX = event.clientX;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (event) => {

      if (!this.isDragging) return;

      const deltaX = event.clientX - this.previousMouseX;
      this.previousMouseX = event.clientX;

      this.cameraAngle -= deltaX * 0.005;
    });
  }

}
